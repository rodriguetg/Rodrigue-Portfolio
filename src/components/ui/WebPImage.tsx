import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WebPImageProps {
  src: string;
  webpSrc?: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
  quality?: number;
}

export const WebPImage: React.FC<WebPImageProps> = ({
  src,
  webpSrc,
  alt,
  className = '',
  placeholder,
  onLoad,
  onError,
  sizes = '100vw',
  quality = 80
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [supportsWebP, setSupportsWebP] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Détecter le support WebP
  useEffect(() => {
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const dataURL = canvas.toDataURL('image/webp');
        setSupportsWebP(dataURL.indexOf('data:image/webp') === 0);
      }
    };
    checkWebPSupport();
  }, []);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // Intersection Observer pour le lazy loading
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '100px 0px',
        threshold: 0.1
      }
    );

    observerRef.current.observe(img);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Générer les sources optimisées
  const generateOptimizedSrc = (originalSrc: string, format: 'webp' | 'original') => {
    if (format === 'webp' && webpSrc) {
      return webpSrc;
    }
    
    // Si pas de webpSrc fourni, on peut essayer de générer une URL optimisée
    // (cela nécessiterait un service d'optimisation d'images)
    return originalSrc;
  };

  const finalSrc = supportsWebP && webpSrc ? webpSrc : src;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder animé */}
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Optimisation...</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image optimisée */}
      {isInView && !hasError && (
        <picture>
          {/* Source WebP pour les navigateurs qui le supportent */}
          {supportsWebP && webpSrc && (
            <source srcSet={webpSrc} type="image/webp" />
          )}
          
          {/* Image de fallback */}
          <motion.img
            ref={imgRef}
            src={finalSrc}
            alt={alt}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
            sizes={sizes}
            style={{
              imageRendering: '-webkit-optimize-contrast',
            }}
          />
        </picture>
      )}

      {/* Fallback en cas d'erreur */}
      {hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-2 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Image non disponible</div>
          </div>
        </motion.div>
      )}

      {/* Indicateur de format */}
      {supportsWebP && webpSrc && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full opacity-75">
          WebP
        </div>
      )}
    </div>
  );
}; 