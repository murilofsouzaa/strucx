import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 1155;
const PRIMARY_STEP = 2; // Carrega 1 a cada 2 frames na Fase 1 para fluidez absoluta (60fps contínuo)
const BATCH_SIZE = 12;

function getFramePath(index: number, isMobile: boolean): string {
  const padIndex = String(index + 1).padStart(4, '0');
  const baseDir = isMobile ? '/frames-mobile' : '/frames';
  return `${baseDir}/frame_${padIndex}.webp`;
}

export function HelmetVideoScroller() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const lastRenderedFrameRef = useRef<number>(-1);
  const rafId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Array de referências de imagens pré-carregadas pelo browser
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));

  // Busca o frame mais próximo já carregado na memória (busca local ultra-rápida sem delay)
  const getNearestLoadedImage = useCallback((target: number): HTMLImageElement | null => {
    const images = imagesRef.current;
    const direct = images[target];
    if (direct && direct.complete && direct.naturalWidth > 0) {
      return direct;
    }

    // Procura o vizinho mais próximo (+1, -1, +2, -2...)
    for (let offset = 1; offset < 30; offset++) {
      const up = target + offset;
      if (up < TOTAL_FRAMES) {
        const imgUp = images[up];
        if (imgUp && imgUp.complete && imgUp.naturalWidth > 0) return imgUp;
      }
      const down = target - offset;
      if (down >= 0) {
        const imgDown = images[down];
        if (imgDown && imgDown.complete && imgDown.naturalWidth > 0) return imgDown;
      }
    }

    // Retorna o frame 0 como fallback de segurança
    const first = images[0];
    return first && first.complete ? first : null;
  }, []);

  // Renderiza no Canvas 2D com alta performance e sem repaints redundantes
  const renderFrame = useCallback((frameIndex: number) => {
    if (!isVisibleRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = getNearestLoadedImage(frameIndex);
    if (!img) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    if (!imgWidth || !imgHeight) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const canvasAspect = canvasWidth / canvasHeight;
    const imgAspect = imgWidth / imgHeight;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    // Cobertura total proporcional (full-bleed)
    if (canvasAspect > imgAspect) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgAspect;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgAspect;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    lastRenderedFrameRef.current = frameIndex;
  }, [getNearestLoadedImage]);

  // Loop contínuo com física de inércia elástica LERP (0.085) para fluidez suave
  const updateLoop = useCallback(() => {
    if (!isVisibleRef.current) {
      rafId.current = null;
      return;
    }

    const diff = targetFrameRef.current - currentFrameRef.current;
    if (Math.abs(diff) > 0.0001) {
      currentFrameRef.current += diff * 0.085;
      const frameToRender = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      if (frameToRender !== lastRenderedFrameRef.current) {
        renderFrame(frameToRender);
      }
      rafId.current = requestAnimationFrame(updateLoop);
    } else {
      rafId.current = null;
    }
  }, [renderFrame]);

  useEffect(() => {
    let isCancelled = false;

    // 1. Detecção Inteligente de Resolução (Mobile vs Desktop)
    const isMobile = window.innerWidth <= 768 || (window.innerWidth <= 1024 && window.devicePixelRatio < 2);

    // 2. Redimensionamento adaptativo
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      lastRenderedFrameRef.current = -1;
      const curr = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );
      renderFrame(curr);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // Função de carregamento de imagem individual
    const loadImage = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        if (isCancelled) return reject();
        const img = new Image();
        img.src = getFramePath(index, isMobile);
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current[index] = img;
            resolve(img);
          } else {
            reject();
          }
        };
        img.onerror = () => reject();
      });
    };

    // 3. Pré-carregamento Progressivo Otimizado para Fluidez Instantânea
    const startPreload = async () => {
      try {
        // Passo 1: Frame 0 Imediato
        const first = await loadImage(0);
        if (!isCancelled) {
          imagesRef.current[0] = first;
          renderFrame(0);
        }

        // Passo 2: Frames Principais (Passo 2: 0, 2, 4, 6... ~570 frames)
        const primaryIndices: number[] = [];
        for (let i = PRIMARY_STEP; i < TOTAL_FRAMES; i += PRIMARY_STEP) {
          primaryIndices.push(i);
        }

        for (let i = 0; i < primaryIndices.length; i += BATCH_SIZE) {
          if (isCancelled) return;
          const chunk = primaryIndices.slice(i, i + BATCH_SIZE);
          await Promise.allSettled(chunk.map((idx) => loadImage(idx)));
          
          // Re-renderiza para garantir nitidez se o usuário estiver parado
          if (i === 0 && !isCancelled) {
            renderFrame(Math.round(currentFrameRef.current));
          }
        }

        // Passo 3: Frames Intermediários Ímpares (1, 3, 5, 7...) em background
        const secondaryIndices: number[] = [];
        for (let i = 1; i < TOTAL_FRAMES; i += PRIMARY_STEP) {
          secondaryIndices.push(i);
        }

        for (let i = 0; i < secondaryIndices.length; i += BATCH_SIZE) {
          if (isCancelled) return;
          const chunk = secondaryIndices.slice(i, i + BATCH_SIZE);
          await Promise.allSettled(chunk.map((idx) => loadImage(idx)));
        }
      } catch {
        // Ignora erros de cancelamento
      }
    };

    startPreload();

    // 4. GSAP ScrollTrigger com transição fluida
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top',
        end: () => {
          const videoEl = document.getElementById('cinematic-video-section');
          if (videoEl) {
            const rect = videoEl.getBoundingClientRect();
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            return `+=${Math.max(window.innerHeight * 3, rect.top + scrollTop)}`;
          }
          return `+=${window.innerHeight * 4.5}`;
        },
        scrub: 0.9,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          targetFrameRef.current = self.progress * (TOTAL_FRAMES - 1);
          if (rafId.current === null && isVisibleRef.current) {
            rafId.current = requestAnimationFrame(updateLoop);
          }
        }
      });

      // Fade out do canvas para branco puro ao alcançar a seção de vídeo
      if (wrapperRef.current) {
        gsap.to(wrapperRef.current, {
          opacity: 0,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: '#cinematic-video-section',
            start: 'top 50%',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
            onToggle: (self) => {
              isVisibleRef.current = !self.isActive || self.progress < 0.95;
            }
          }
        });
      }
    });

    rafId.current = requestAnimationFrame(updateLoop);

    // 5. Cleanup
    return () => {
      isCancelled = true;
      window.removeEventListener('resize', handleResize);
      ctx.revert();

      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }

      // Cancela downloads pendentes
      imagesRef.current.forEach((img) => {
        if (img) {
          img.onload = null;
          img.onerror = null;
          img.src = '';
        }
      });
      imagesRef.current = new Array(TOTAL_FRAMES).fill(null);
    };
  }, [renderFrame, updateLoop]);

  return (
    <div 
      ref={wrapperRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden bg-white will-change-transform"
      style={{ willChange: 'transform' }}
    >
      {/* Canvas 2D Suave e de Alto Desempenho */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block bg-transparent pointer-events-none"
        style={{ width: '100vw', height: '100vh' }}
      />
      {/* Camada Esbranquiçada de Alto Contraste */}
      <div className="absolute inset-0 bg-white/45 pointer-events-none" />
    </div>
  );
}
