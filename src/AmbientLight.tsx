import React, { useRef, useEffect, memo } from 'react';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Props para el componente AmbientLight
 */
export interface AmbientLightProps {
  /** URL de la imagen o video */
  src: string;
  /** Tipo de contenido: 'image' o 'video' (default: 'image') */
  type?: 'image' | 'video';
  /** Intensidad del desenfoque del brillo (default: 40) */
  blur?: number;
  /** Qué tanto se expande el brillo (default: 1.1) */
  scale?: number;
  /** Transparencia del brillo, de 0 a 1 (default: 0.6) */
  opacity?: number;
  /** Clase CSS personalizada para el contenedor */
  className?: string;
  /** Estilos CSS personalizados para el contenedor */
  style?: CSSProperties;
  /** Contenido opcional encima del componente (título, botones, etc.) */
  children?: ReactNode;
  /** Reproducción automática para videos (default: true) */
  videoAutoPlay?: boolean;
  /** Mostrar controles de video (default: false) */
  videoControls?: boolean;
  /** Hacer el video en bucle (default: true) */
  videoLoop?: boolean;
  /** Silenciar el video (default: true cuando autoPlay está activo) */
  videoMuted?: boolean;
  /** Texto alternativo para la imagen */
  alt?: string;
  /** Callback cuando la imagen o video carga */
  onLoad?: () => void;
  /** Callback cuando hay un error al cargar */
  onError?: () => void;
}

/**
 * Componente AmbientLight - Crea efectos de luz ambiental para imágenes y videos
 */
export const AmbientLight: React.FC<AmbientLightProps> = memo(
  ({
    src,
    type = 'image',
    blur = 40,
    scale = 1.1,
    opacity = 0.6,
    className = '',
    style = {},
    children,
    videoAutoPlay = true,
    videoControls = false,
    videoLoop = true,
    videoMuted,
    alt = 'Content',
    onLoad,
    onError,
  }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const glowVideoRef = useRef<HTMLVideoElement>(null);

    // Si autoPlay está activo, muted debe ser true por defecto
    const finalVideoMuted = videoMuted ?? videoAutoPlay;

    // Sincronizar videos si es necesario
    useEffect(() => {
      if (type !== 'video' || !videoRef.current || !glowVideoRef.current) {
        return;
      }

      const main = videoRef.current;
      const glow = glowVideoRef.current;

      // Cuando el principal se reproduce, el brillo también
      const onPlay = () => {
        glow.play().catch(() => {
          // Ignorar errores de reproducción del glow
        });
      };
      const onPause = () => glow.pause();
      const onSeek = () => {
        glow.currentTime = main.currentTime;
      };

      main.addEventListener('play', onPlay);
      main.addEventListener('pause', onPause);
      main.addEventListener('seeking', onSeek);

      return () => {
        main.removeEventListener('play', onPlay);
        main.removeEventListener('pause', onPause);
        main.removeEventListener('seeking', onSeek);
      };
    }, [type]);

    const containerStyle: CSSProperties = {
      position: 'relative',
      width: '100%',
      height: 'fit-content',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...style,
    };

    const glowStyle: CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      filter: `blur(${blur}px) saturate(1.5)`, // Saturate para colores más vivos
      transform: `scale(${scale})`,
      opacity: opacity,
      zIndex: 0,
      pointerEvents: 'none', // El brillo no debe interferir con clicks
      objectFit: 'cover',
      borderRadius: 'inherit',
    };

    const contentStyle: CSSProperties = {
      position: 'relative',
      zIndex: 1,
      width: '100%',
      height: 'auto',
      borderRadius: 'inherit',
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)', // Sombra sutil para separar
    };

    return (
      <div className={`react-ambient-glow ${className}`} style={containerStyle}>
        {/* Capa de Brillo (Glow Layer) */}
        {type === 'video' ? (
          <video
            ref={glowVideoRef}
            src={src}
            style={glowStyle}
            muted
            loop={videoLoop}
            playsInline
            aria-hidden="true"
            tabIndex={-1}
          />
        ) : (
          <img src={src} alt="" style={glowStyle} aria-hidden="true" />
        )}

        {/* Capa Principal */}
        {type === 'video' ? (
          <video
            ref={videoRef}
            src={src}
            style={contentStyle}
            controls={videoControls}
            autoPlay={videoAutoPlay}
            muted={finalVideoMuted}
            loop={videoLoop}
            playsInline
            onLoadedData={onLoad}
            onError={onError}
          />
        ) : (
          <img
            src={src}
            alt={alt}
            style={contentStyle}
            loading="lazy"
            onLoad={onLoad}
            onError={onError}
          />
        )}

        {/* Capa de Contenido (Hijos) */}
        {children && (
          <div style={{ position: 'absolute', zIndex: 2, width: '100%', height: '100%' }}>
            {children}
          </div>
        )}
      </div>
    );
  }
);

AmbientLight.displayName = 'AmbientLight';
