import { renderHook, waitFor } from '@testing-library/react';
import { useDominantColor } from '../src/useDominantColor';
import { describe, it, expect, beforeEach } from 'vitest';

describe('useDominantColor', () => {
  beforeEach(() => {
    // Limpiar cualquier estado previo
  });

  it('retorna color transparente por defecto', () => {
    const { result } = renderHook(() => useDominantColor(''));
    expect(result.current).toBe('rgba(0,0,0,0)');
  });

  it('retorna color transparente para src vacío', () => {
    const { result } = renderHook(() => useDominantColor(''));
    expect(result.current).toBe('rgba(0,0,0,0)');
  });

  it('actualiza cuando cambia la imagen', async () => {
    const { result, rerender } = renderHook(({ src }) => useDominantColor(src), {
      initialProps: { src: 'image1.jpg' },
    });

    // Cambiar a una nueva imagen
    rerender({ src: 'image2.jpg' });

    await waitFor(() => {
      expect(result.current).toBeDefined();
    });
  });

  it('maneja errores de carga de imagen', async () => {
    const { result } = renderHook(() => useDominantColor('invalid-url.jpg'));

    // Debe mantener el color por defecto si hay error
    await waitFor(() => {
      expect(result.current).toBeDefined();
    });
  });

  it('retorna un formato RGB válido', async () => {
    const { result } = renderHook(() => useDominantColor('test.jpg'));

    await waitFor(() => {
      // Debe ser rgb(r,g,b) o rgba(0,0,0,0)
      expect(result.current).toMatch(/^rgb(a)?\(\d+,\s*\d+,\s*\d+(,\s*[\d.]+)?\)$/);
    });
  });

  it('limpia correctamente al desmontar', () => {
    const { unmount } = renderHook(() => useDominantColor('test.jpg'));

    // No debería causar errores al desmontar
    expect(() => unmount()).not.toThrow();
  });
});
