import { render, screen, waitFor } from '@testing-library/react';
import { AmbientLight } from '../src/AmbientLight';
import { describe, it, expect, vi } from 'vitest';

describe('AmbientLight', () => {
  describe('Imagen', () => {
    it('renderiza correctamente una imagen', () => {
      render(<AmbientLight src="test.jpg" type="image" />);
      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThan(0);
    });

    it('aplica el blur correcto', () => {
      const { container } = render(<AmbientLight src="test.jpg" blur={50} />);
      expect(container.innerHTML).toContain('blur(50px)');
    });

    it('aplica el scale correcto', () => {
      const { container } = render(<AmbientLight src="test.jpg" scale={1.5} />);
      expect(container.innerHTML).toContain('scale(1.5)');
    });

    it('aplica la opacidad correcta', () => {
      const { container } = render(<AmbientLight src="test.jpg" opacity={0.8} />);
      expect(container.innerHTML).toContain('opacity: 0.8');
    });

    it('aplica className personalizada', () => {
      const { container } = render(<AmbientLight src="test.jpg" className="custom-class" />);
      expect(container.querySelector('.custom-class')).toBeTruthy();
    });

    it('renderiza children correctamente', () => {
      render(
        <AmbientLight src="test.jpg">
          <div data-testid="child">Child content</div>
        </AmbientLight>
      );
      expect(screen.getByTestId('child')).toBeTruthy();
    });

    it('usa el alt text proporcionado', () => {
      render(<AmbientLight src="test.jpg" alt="Test Image" />);
      const img = screen.getByAltText('Test Image');
      expect(img).toBeTruthy();
    });

    it('llama onLoad cuando la imagen carga', async () => {
      const onLoad = vi.fn();
      const { container } = render(<AmbientLight src="test.jpg" onLoad={onLoad} />);
      const images = container.querySelectorAll('img');
      const mainImage = Array.from(images).find(img => img.getAttribute('alt') === 'Content');

      if (mainImage) {
        mainImage.dispatchEvent(new Event('load'));
        await waitFor(() => expect(onLoad).toHaveBeenCalled());
      }
    });

    it('llama onError cuando falla la carga', async () => {
      const onError = vi.fn();
      const { container } = render(<AmbientLight src="invalid.jpg" onError={onError} />);
      const images = container.querySelectorAll('img');
      const mainImage = Array.from(images).find(img => img.getAttribute('alt') === 'Content');

      if (mainImage) {
        mainImage.dispatchEvent(new Event('error'));
        await waitFor(() => expect(onError).toHaveBeenCalled());
      }
    });
  });

  describe('Video', () => {
    it('renderiza correctamente un video', () => {
      const { container } = render(<AmbientLight src="test.mp4" type="video" />);
      const videos = container.querySelectorAll('video');
      expect(videos.length).toBe(2); // Video principal y video de brillo
    });

    it('aplica autoPlay correctamente', () => {
      const { container } = render(
        <AmbientLight src="test.mp4" type="video" videoAutoPlay={true} />
      );
      const videos = container.querySelectorAll('video');
      const mainVideo = videos[1]; // El segundo es el principal
      expect(mainVideo.hasAttribute('autoplay')).toBeTruthy();
    });

    it('aplica controls correctamente', () => {
      const { container } = render(
        <AmbientLight src="test.mp4" type="video" videoControls={true} />
      );
      const videos = container.querySelectorAll('video');
      const mainVideo = videos[1];
      expect(mainVideo.hasAttribute('controls')).toBeTruthy();
    });

    it('aplica loop correctamente', () => {
      const { container } = render(<AmbientLight src="test.mp4" type="video" videoLoop={false} />);
      const videos = container.querySelectorAll('video');
      const mainVideo = videos[1];
      expect(mainVideo.hasAttribute('loop')).toBeFalsy();
    });

    it('muted es true cuando autoPlay está activo', () => {
      const { container } = render(
        <AmbientLight src="test.mp4" type="video" videoAutoPlay={true} />
      );
      const videos = container.querySelectorAll('video');
      const mainVideo = videos[1] as HTMLVideoElement;
      // Verifica que la propiedad muted está establecida
      expect(mainVideo.muted).toBe(true);
    });

    it('puede sobrescribir muted incluso con autoPlay', () => {
      const { container } = render(
        <AmbientLight src="test.mp4" type="video" videoAutoPlay={true} videoMuted={false} />
      );
      const videos = container.querySelectorAll('video');
      const mainVideo = videos[1] as HTMLVideoElement;
      expect(mainVideo.muted).toBe(false);
    });
  });

  describe('Estilos', () => {
    it('aplica estilos personalizados al contenedor', () => {
      const { container } = render(
        <AmbientLight src="test.jpg" style={{ backgroundColor: 'red' }} />
      );
      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv.style.backgroundColor).toBe('red');
    });

    it('mantiene los valores por defecto de blur, scale y opacity', () => {
      const { container } = render(<AmbientLight src="test.jpg" />);
      const html = container.innerHTML;
      expect(html).toContain('blur(40px)');
      expect(html).toContain('scale(1.1)');
      expect(html).toContain('opacity: 0.6');
    });
  });

  describe('Accesibilidad', () => {
    it('el glow tiene aria-hidden', () => {
      const { container } = render(<AmbientLight src="test.jpg" />);
      const images = container.querySelectorAll('img');
      const glowImage = images[0]; // El primero es el glow
      expect(glowImage.getAttribute('aria-hidden')).toBe('true');
    });

    it('el video glow tiene tabIndex -1', () => {
      const { container } = render(<AmbientLight src="test.mp4" type="video" />);
      const videos = container.querySelectorAll('video');
      const glowVideo = videos[0];
      expect(glowVideo.getAttribute('tabindex')).toBe('-1');
    });
  });
});
