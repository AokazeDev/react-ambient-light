import { useState, useEffect } from 'react';

/**
 * Hook personalizado para extraer el color dominante de una imagen
 * @param imageSrc - URL de la imagen
 * @returns Color dominante en formato RGB
 *
 * @example
 * ```tsx
 * const color = useDominantColor('https://example.com/image.jpg');
 * // color = 'rgb(255, 128, 64)'
 * ```
 */
export const useDominantColor = (imageSrc: string): string => {
  const [color, setColor] = useState<string>(() => {
    return imageSrc ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0)';
  });

  useEffect(() => {
    if (!imageSrc) {
      return;
    }

    let isCancelled = false;
    const img = new Image();
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      if (isCancelled) return;

      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: false });

        if (!ctx) {
          console.warn('No se pudo obtener el contexto del canvas');
          return;
        }

        // Reducir a 1x1 pixel para obtener el color promedio
        canvas.width = 1;
        canvas.height = 1;

        // Dibujar la imagen comprimida en 1 pixel
        ctx.drawImage(img, 0, 0, 1, 1);
        const imageData = ctx.getImageData(0, 0, 1, 1).data;
        const [r, g, b] = imageData;

        setColor(`rgb(${r},${g},${b})`);
      } catch (error) {
        console.error('Error al extraer el color dominante:', error);
        setColor('rgba(0,0,0,0)');
      }
    };

    img.onerror = () => {
      if (!isCancelled) {
        console.error('Error al cargar la imagen para extraer el color');
        setColor('rgba(0,0,0,0)');
      }
    };

    img.src = imageSrc;

    return () => {
      isCancelled = true;
    };
  }, [imageSrc]);

  return color;
};
