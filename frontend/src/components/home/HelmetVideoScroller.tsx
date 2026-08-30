import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 1155;

export function HelmetVideoScroller() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const lastRenderedFrameRef = useRef<number>(-1);
  const rafId = useRef<number | null>(null);

  const getFramePath = (index: number) => {
    const frameNumber = (index + 1).toString().padStart(4, '0');
    return `/frames/frame_${frameNumber}.webp`;
  };

  // Renderiza instantaneamente o frame no Canvas com alta performance
  const renderFrame = useCallback((frameIndex: number) => {
    if (frameIndex === lastRenderedFrameRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const canvasAspect = canvasWidth / canvasHeight;
    const imgAspect = imgWidth / imgHeight;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    // Cobertura proporcional completa em tela cheia (full-bleed) em todos os dispositivos
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
  }, []);

  // Loop contínuo com física de inércia fluida e controlada (LERP 0.065)
  const updateLoop = useCallback(() => {
    const diff = targetFrameRef.current - currentFrameRef.current;
    if (Math.abs(diff) > 0.0001) {
      // 0.065 mantém inércia elástica e fluidez contínua no espaço de 250vh
      currentFrameRef.current += diff * 0.065;
      const frameToRender = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );
      renderFrame(frameToRender);
    }
    rafId.current = requestAnimationFrame(updateLoop);
  }, [renderFrame]);

  useEffect(() => {
    // 1. Pré-carregamento imediato do Frame 0 para exibição instantânea
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const firstImg = new Image();
    firstImg.src = getFramePath(0);
    const onFirstLoad = () => {
      images[0] = firstImg;
      renderFrame(0);
    };

    if (firstImg.complete) {
      onFirstLoad();
    } else {
      firstImg.onload = onFirstLoad;
    }

    // Carregamento progressivo em background para manter 100% da fluidez
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      images[i] = img;
    }
    imagesRef.current = images;

    // 2. Redimensionamento adaptativo com suporte a telas Retina (High-DPI)
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      lastRenderedFrameRef.current = -1;
      const curr = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );
      renderFrame(curr);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // 3. GSAP ScrollTrigger sincronizado para durar por todo o trajeto até a seção de vídeo
    const trigger = ScrollTrigger.create({
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
      scrub: 1.0,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        targetFrameRef.current = self.progress * (TOTAL_FRAMES - 1);
      }
    });

    // 4. Inicia o loop de animação contínua
    rafId.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('resize', handleResize);
      trigger.kill();
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [renderFrame, updateLoop]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden bg-white">
      {/* Canvas 2D de Alta Performance */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block bg-transparent"
        style={{ width: '100vw', height: '100vh' }}
      />
      {/* Camada Esbranquiçada de Alto Contraste para Tipografia e Elementos da Interface */}
      <div className="absolute inset-0 bg-white/45 pointer-events-none" />
    </div>
  );
}
