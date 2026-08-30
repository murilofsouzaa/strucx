import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 1155;
// Limite estrito de memória: máx 16 frames na VRAM (~58MB Desktop 720p / ~18MB Mobile)
const MAX_CACHE_SIZE = 16;
// Âncoras globais para scroll rápido (apenas 24 frames distribuídos)
const ANCHOR_STEP = 48;

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
    const handleAbort = () => {
      img.src = '';
      reject(new DOMException('Aborted', 'AbortError'));
    };
    if (signal) {
      if (signal.aborted) return handleAbort();
      signal.addEventListener('abort', handleAbort);
    }
    img.src = url;
    img.onload = () => {
      if (signal) signal.removeEventListener('abort', handleAbort);
      resolve(img);
    };
    img.onerror = (err) => {
      if (signal) signal.removeEventListener('abort', handleAbort);
      reject(err);
    };
  });
}

export function HelmetVideoScroller() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const lastRenderedFrameRef = useRef<number>(-1);
  const rafId = useRef<number | null>(null);

  // Cache em memória estritamente limitado (máx 16 frames)
  const imageCache = useRef<Map<number, ImageBitmap | HTMLImageElement>>(new Map());
  const pendingFetches = useRef<Set<number>>(new Set());
  const loadedIndices = useRef<number[]>([]);
  const isMobileRef = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(true);

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
    if (!isVisibleRef.current) return;
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

  // Loop contínuo com física de inércia elástica (LERP 0.075) e desacoplado do scroll
  const updateLoop = useCallback(() => {
    if (!isVisibleRef.current) {
      rafId.current = null;
      return;
    }

    const diff = targetFrameRef.current - currentFrameRef.current;
    if (Math.abs(diff) > 0.0001) {
      currentFrameRef.current += diff * 0.075;
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
    const abortController = new AbortController();
    const { signal } = abortController;

    // 1. Detecção Inteligente de Resolução (Mobile vs Desktop)
    const isMobile = window.innerWidth <= 768 || (window.innerWidth <= 1024 && window.devicePixelRatio < 2);
    isMobileRef.current = isMobile;

    // 2. Redimensionamento otimizado (DPR calibrado em 1.25 para economizar buffer de GPU)
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
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

    // Função de inserção com política LRU rígida (Max 16 frames ativos na VRAM)
    const insertInCache = (idx: number, bitmap: ImageBitmap | HTMLImageElement) => {
      if (signal.aborted) {
        if (bitmap && 'close' in bitmap && typeof (bitmap as any).close === 'function') {
          (bitmap as any).close();
        }
        return;
      }

      imageCache.current.set(idx, bitmap);
      pendingFetches.current.delete(idx);

      const arr = loadedIndices.current;
      let pos = 0;
      while (pos < arr.length && arr[pos] < idx) pos++;
      arr.splice(pos, 0, idx);

      // Desalojamento imediato da VRAM para frames fora do raio ativo
      while (imageCache.current.size > MAX_CACHE_SIZE) {
        const target = targetFrameRef.current;
        let furthestIdx = -1;
        let maxDist = -1;

        for (const key of imageCache.current.keys()) {
          const dist = Math.abs(key - target);
          if (dist > maxDist) {
            maxDist = dist;
            furthestIdx = key;
          }
        }

        if (furthestIdx !== -1) {
          const item = imageCache.current.get(furthestIdx);
          if (item && 'close' in item && typeof (item as any).close === 'function') {
            (item as any).close(); // Libera buffer na GPU imediatamente
          }
          imageCache.current.delete(furthestIdx);

          const idxInArr = loadedIndices.current.indexOf(furthestIdx);
          if (idxInArr > -1) {
            loadedIndices.current.splice(idxInArr, 1);
          }
        } else {
          break;
        }
      }
    };

    // Prefetch sob demanda em janela móvel ao redor do scroll [target - 4, target + 8]
    const prefetchWindow = (centerFrame: number) => {
      if (signal.aborted) return;
      const rounded = Math.round(centerFrame);
      const start = Math.max(0, rounded - 4);
      const end = Math.min(TOTAL_FRAMES - 1, rounded + 8);

      for (let i = start; i <= end; i++) {
        if (!imageCache.current.has(i) && !pendingFetches.current.has(i)) {
          pendingFetches.current.add(i);
          fetchAndDecodeFrame(i, isMobile, signal)
            .then((bm) => {
              insertInCache(i, bm);
              // Se o frame atual ainda não foi desenhado, acorda o render
              const curr = Math.round(currentFrameRef.current);
              if (Math.abs(curr - i) <= 1) {
                renderFrame(curr);
              }
            })
            .catch(() => {
              pendingFetches.current.delete(i);
            });
        }
      }
    };

    // 3. Carga Inicial Leve: Apenas Frame 0 + 24 Âncoras Globais (< 1MB RAM inicial)
    const initLightweight = async () => {
      try {
        const first = await fetchAndDecodeFrame(0, isMobile, signal);
        insertInCache(0, first);
        renderFrame(0);

        // Preenche a janela inicial
        prefetchWindow(0);

        // Âncoras distribuídas para scroll rápido
        const anchors: number[] = [];
        for (let i = ANCHOR_STEP; i < TOTAL_FRAMES; i += ANCHOR_STEP) {
          anchors.push(i);
        }

        for (const idx of anchors) {
          if (signal.aborted) return;
          try {
            const bm = await fetchAndDecodeFrame(idx, isMobile, signal);
            insertInCache(idx, bm);
          } catch {
            // Ignora cancelamentos
          }
        }
      } catch {
        // Ignora aborts
      }
    };

    initLightweight();

    // 4. GSAP ScrollTrigger com Prefetch sob Demanda
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
          const newTarget = self.progress * (TOTAL_FRAMES - 1);
          targetFrameRef.current = newTarget;

          // Dispara prefetch da janela sob demanda
          prefetchWindow(newTarget);

          if (rafId.current === null && isVisibleRef.current) {
            rafId.current = requestAnimationFrame(updateLoop);
          }
        }
      });

      // Fade out e pausa do canvas ao passar da seção de vídeo
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

    // 5. Limpeza Rigorosa de Memória e VRAM
    return () => {
      abortController.abort();
      window.removeEventListener('resize', handleResize);
      ctx.revert();

      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }

      // Libera explicitamente toda a VRAM fechando os ImageBitmaps
      imageCache.current.forEach((item) => {
        if (item && 'close' in item && typeof (item as any).close === 'function') {
          (item as any).close();
        }
      });
      imageCache.current.clear();
      pendingFetches.current.clear();
      loadedIndices.current = [];
    };
  }, [renderFrame, updateLoop]);

  return (
    <div 
      ref={wrapperRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden bg-white will-change-transform"
      style={{ willChange: 'transform' }}
    >
      {/* Canvas 2D de Alta Performance com Buffer Reduzido */}
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
