<p align="center">
  <a href="https://aokaze.vercel.app/">
    <img width="20%" src=".github/assets/isotipo.png" alt="aokaze-logo" />
    <h1 align="center">react-ambient-light</h1>
  </a>
</p>
<p align="center">
  A React component that creates beautiful ambient light effects for images and videos with customizable glow, blur, and scale options.<br><br>
</p>



## Installation

```bash
npm install react-ambient-light
```

```bash
pnpm add react-ambient-light
```

```bash
yarn add react-ambient-light
```

## Features

- Ambient light effect for images and videos
- Customizable blur, scale, and opacity
- Video synchronization support
- TypeScript support with full type definitions
- Lightweight and performant
- SSR compatible
- Accessibility features built-in

## Usage

### Basic Image Example

```tsx
import { AmbientLight } from 'react-ambient-light';

function App() {
  return (
    <AmbientLight
      src="https://example.com/image.jpg"
      type="image"
      blur={40}
      scale={1.1}
      opacity={0.6}
    />
  );
}
```

### Basic Video Example

```tsx
import { AmbientLight } from 'react-ambient-light';

function App() {
  return (
    <AmbientLight
      src="https://example.com/video.mp4"
      type="video"
      videoAutoPlay={true}
      videoLoop={true}
      videoMuted={true}
    />
  );
}
```

### Advanced Example with Children

```tsx
import { AmbientLight } from 'react-ambient-light';

function App() {
  return (
    <AmbientLight
      src="https://example.com/video.mp4"
      type="video"
      blur={50}
      scale={1.2}
      opacity={0.7}
      className="my-ambient-light"
      style={{ borderRadius: '16px' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '2rem',
        }}
      >
        <h1>Overlay Content</h1>
      </div>
    </AmbientLight>
  );
}
```

### Using the useDominantColor Hook

Extract the dominant color from an image:

```tsx
import { useDominantColor } from 'react-ambient-light';

function ColorDisplay() {
  const color = useDominantColor('https://example.com/image.jpg');

  return (
    <div style={{ backgroundColor: color, padding: '20px' }}>
      Dominant color: {color}
    </div>
  );
}
```

## API Reference

### AmbientLight Component

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **required** | URL of the image or video |
| `type` | `'image' \| 'video'` | `'image'` | Type of content |
| `blur` | `number` | `40` | Blur intensity of the glow (in pixels) |
| `scale` | `number` | `1.1` | Scale factor for the glow expansion |
| `opacity` | `number` | `0.6` | Opacity of the glow (0 to 1) |
| `className` | `string` | `''` | Custom CSS class for the container |
| `style` | `CSSProperties` | `{}` | Custom inline styles for the container |
| `children` | `ReactNode` | `undefined` | Optional content to overlay on top |
| `alt` | `string` | `'Content'` | Alternative text for the image |
| `onLoad` | `() => void` | `undefined` | Callback when the image/video loads |
| `onError` | `() => void` | `undefined` | Callback when there's an error loading |

#### Video-specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `videoAutoPlay` | `boolean` | `true` | Enable autoplay for videos |
| `videoControls` | `boolean` | `false` | Show video controls |
| `videoLoop` | `boolean` | `true` | Loop the video |
| `videoMuted` | `boolean` | `true` (when autoPlay is true) | Mute the video |

### useDominantColor Hook

Extract the dominant color from an image.

```tsx
const color = useDominantColor(imageSrc: string): string
```

**Parameters:**
- `imageSrc` (string): URL of the image

**Returns:**
- `string`: RGB color value (e.g., `'rgb(255, 128, 64)'`)

## Examples

### Responsive Image with Custom Styling

```tsx
<AmbientLight
  src="image.jpg"
  blur={60}
  opacity={0.8}
  style={{
    maxWidth: '600px',
    margin: '0 auto',
    borderRadius: '20px',
  }}
  alt="Beautiful landscape"
/>
```

### Video Player with Controls

```tsx
<AmbientLight
  src="video.mp4"
  type="video"
  videoControls={true}
  videoAutoPlay={false}
  videoMuted={false}
  blur={30}
  scale={1.15}
/>
```

### Image Gallery Card

```tsx
<AmbientLight
  src="artwork.jpg"
  blur={45}
  scale={1.2}
  opacity={0.5}
  className="gallery-card"
>
  <div className="card-overlay">
    <h3>Artwork Title</h3>
    <p>Artist Name</p>
  </div>
</AmbientLight>
```

### Error Handling

```tsx
<AmbientLight
  src="image.jpg"
  onLoad={() => console.log('Image loaded successfully')}
  onError={() => console.error('Failed to load image')}
/>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## TypeScript

This package is written in TypeScript and includes type definitions out of the box.

```tsx
import type { AmbientLightProps } from 'react-ambient-light';

const props: AmbientLightProps = {
  src: 'image.jpg',
  type: 'image',
  blur: 40,
};
```

## Performance Considerations

- The component uses `React.memo` to prevent unnecessary re-renders
- Images use lazy loading by default
- Videos are synchronized efficiently using refs
- The glow layer has `pointer-events: none` to avoid interfering with interactions

## Accessibility

- Images include proper `alt` attributes
- Glow layers are hidden from screen readers with `aria-hidden="true"`
- Videos include `playsInline` for mobile compatibility
- Decorative glow videos have `tabIndex={-1}` to prevent focus

## Contributing

Contributions are always welcome!

Please follow our [contributing guidelines](./CONTRIBUTING.md).

Please adhere to this project's [CODE_OF_CONDUCT](./CODE_OF_CONDUCT.md).

## Issues

Report issues at [Issues](https://github.com/AokazeDev/react-ambient-light/issues).

## License

Licensed under the MIT License.

See [LICENSE](./LICENSE.md) for more information.