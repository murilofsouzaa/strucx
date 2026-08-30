import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 1155;
const KEYFRAME_STEP = 4; // Fase 1: Carrega 1 a cada 4 frames para resposta imediata
const CONCURRENT_BATCH_SIZE = 8; // Lote de conexões paralelas controladas

function getFramePath(index: number, isMobile: boolean): string {
  const padIndex = String(index + 1).padStart(4, '0');
  const baseDir = isMobile ? '/frames-mobile' : '/frames';
  return `${baseDir}/frame_${padIndex}.webp`;
}

// Busca e decodifica a imagem em thread secundária (Off-Thread) sem bloquear a UI
async function fetchAndDecodeFrame(
  index: number,
  isMobile: boolean,
  signal?: AbortSignal
): Promise<ImageBitmap | HTMLImageElement> {
  const url = getFramePath(index, isMobile);

  if (typeof window !== 'undefined' && 'createImageBitmap' in window) {
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    return await createImageBitmap(blob);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

export function HelmetVideoScroller() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const lastRenderedFrameRef = useRef<number>(-1);
  const rafId = useRef<number | null>(null);

  // Cache em memória de alta performance com ImageBitmaps decodificados
  const imageCache = useRef<Map<number, ImageBitmap | HTMLImageElement>>(new Map());
  // Lista ordenada de índices carregados para fallback instantâneo
  const loadedIndices = useRef<number[]>([]);
  const isMobileRef = useRef<boolean>(false);

  // Busca o frame mais próximo já carregado no cache (Zero frames pretos/vazios)
  const getNearestLoadedFrame = useCallback((target: number): number | null => {
    const cache = imageCache.current;
    if (cache.has(target)) return target;

    const indices = loadedIndices.current;
    if (indices.length === 0) return null;

    // Busca binária pelo frame carregado mais próximo
    let low = 0;
    let high = indices.length - 1;
    let best = indices[0];
    let minDiff = Math.abs(best - target);

    while (low <= high) {
      const mid = (low + high) >> 1;
      const val = indices[mid];
      const diff = Math.abs(val - target);

      if (diff < minDiff) {
        minDiff = diff;
        best = val;
      }

      if (val < target) {
        low = mid + 1;
      } else if (val > target) {
        high = mid - 1;
      } else {
        return val;
      }
    }

    return best;
  }, []);

  // Renderiza no Canvas 2D sem repaints redundantes
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const frameToUse = getNearestLoadedFrame(frameIndex);
    if (frameToUse === null) return;
    if (frameToUse === lastRenderedFrameRef.current) return;

    const imageSource = imageCache.current.get(frameToUse);
    if (!imageSource) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = 'width' in imageSource ? imageSource.width : (imageSource as any).naturalWidth;
    const imgHeight = 'height' in imageSource ? imageSource.height : (imageSource as any).naturalHeight;

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

    ctx.drawImage(imageSource, offsetX, offsetY, drawWidth, drawHeight);
    lastRenderedFrameRef.current = frameToUse;
  }, [getNearestLoadedFrame]);

  // Loop contínuo com física de inércia elástica (LERP 0.070) e desacoplado do evento de scroll
  const updateLoop = useCallback(() => {
    const diff = targetFrameRef.current - currentFrameRef.current;
    if (Math.abs(diff) > 0.0001) {
      currentFrameRef.current += diff * 0.070;
      const frameToRender = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      // Elimina repaints desnecessários: só desenha se o frame arredondado mudou
      if (frameToRender !== lastRenderedFrameRef.current) {
        renderFrame(frameToRender);
      }
    }
    rafId.current = requestAnimationFrame(updateLoop);
  }, [renderFrame]);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    // 1. Detecção Inteligente de Resolução (Mobile vs Desktop)
    const isMobile = window.innerWidth <= 768 || (window.innerWidth <= 1024 && window.devicePixelRatio < 2);
    isMobileRef.current = isMobile;

    // 2. Redimensionamento adaptativo com suporte a Retina
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

    // Função de inserção ordenada no cache
    const insertInCache = (idx: number, bitmap: ImageBitmap | HTMLImageElement) => {
      imageCache.current.set(idx, bitmap);
      // Mantém lista ordenada de índices carregados para busca binária
      const arr = loadedIndices.current;
      let pos = 0;
      while (pos < arr.length && arr[pos] < idx) pos++;
      arr.splice(pos, 0, idx);
    };

    // 3. Pré-carregamento Progressivo em 2 Fases (Smart Progressive Loading)
    const loadPipeline = async () => {
      try {
        // Passo 1: Frame 0 Imediato
        const firstFrame = await fetchAndDecodeFrame(0, isMobile, signal);
        insertInCache(0, firstFrame);
        renderFrame(0);

        // Passo 2: Frames-Chave Prioritários (0, 4, 8, 12... total ~288 frames)
        const keyframes: number[] = [];
        for (let i = 0; i < TOTAL_FRAMES; i += KEYFRAME_STEP) {
          if (i !== 0) keyframes.push(i);
        }

        for (let i = 0; i < keyframes.length; i += CONCURRENT_BATCH_SIZE) {
          if (signal.aborted) return;
          const chunk = keyframes.slice(i, i + CONCURRENT_BATCH_SIZE);
          await Promise.all(
            chunk.map(async (idx) => {
              try {
                const bm = await fetchAndDecodeFrame(idx, isMobile, signal);
                insertInCache(idx, bm);
              } catch {
                // Ignore frame aborts
              }
            })
          );
        }

        // Passo 3: Hidratação em Background dos frames intermediários restantes (Fase 2)
        const remainingFrames: number[] = [];
        for (let i = 0; i < TOTAL_FRAMES; i++) {
          if (i % KEYFRAME_STEP !== 0) {
            remainingFrames.push(i);
          }
        }

        // Processa frames restantes em lotes leves durante momentos ociosos
        const processRemaining = async (startIndex: number) => {
          if (signal.aborted || startIndex >= remainingFrames.length) return;
          const chunk = remainingFrames.slice(startIndex, startIndex + 6);

          await Promise.all(
            chunk.map(async (idx) => {
              try {
                const bm = await fetchAndDecodeFrame(idx, isMobile, signal);
                insertInCache(idx, bm);
              } catch {
                // Ignore frame aborts
              }
            })
          );

          if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
            (window as any).requestIdleCallback(() => processRemaining(startIndex + 6), { timeout: 200 });
          } else {
            setTimeout(() => processRemaining(startIndex + 6), 25);
          }
        };

        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
          (window as any).requestIdleCallback(() => processRemaining(0), { timeout: 500 });
        } else {
          setTimeout(() => processRemaining(0), 100);
        }
      } catch (err) {
        // Pipeline cancelado ou erro silencioso
      }
    };

    loadPipeline();

    // 4. GSAP ScrollTrigger desacoplado: scroll apenas atualiza a variável targetFrame
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
        scrub: 1.0,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Desacoplamento estrito: apenas atualiza o número do target frame
          targetFrameRef.current = self.progress * (TOTAL_FRAMES - 1);
        }
      });

      // Fade out do canvas para branco ao alcançar a seção de vídeo
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
          }
        });
      }
    });

    // 5. Inicia o loop contínuo de renderização
    rafId.current = requestAnimationFrame(updateLoop);

    // 6. Limpeza Total de Memory Leaks e Descarte de VRAM
    return () => {
      abortController.abort();
      window.removeEventListener('resize', handleResize);
      ctx.revert();

      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }

      // Libera explicitamente memória da GPU fechando todos os ImageBitmaps
      imageCache.current.forEach((item) => {
        if (item && 'close' in item && typeof item.close === 'function') {
          item.close();
        }
      });
      imageCache.current.clear();
      loadedIndices.current = [];
    };
  }, [renderFrame, updateLoop]);

  return (
    <div 
      ref={wrapperRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden bg-white will-change-transform"
      style={{ willChange: 'transform' }}
    >
      {/* Canvas 2D de Alta Performance */}
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
