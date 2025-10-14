# ThemedButton Component

A reusable button component that automatically adapts to the current theme (light/dark mode).

## Features

- **Theme-aware styling**: Automatically switches between light and dark mode colors
- **Consistent design**: Maintains the same styling pattern across the entire application
- **Multiple sizes**: Small, medium, and large button sizes
- **Icon support**: Perfect for icon-only buttons
- **Link support**: Can be used as a link with href prop
- **Smooth animations**: Built-in hover and tap animations

## Usage

### Basic Icon Button
```jsx
import ThemedButton from './components/ThemedButton';
import { Github } from 'lucide-react';

<ThemedButton onClick={handleClick}>
  <Github className="w-6 h-6" />
</ThemedButton>
```

### Link Button
```jsx
<ThemedButton 
  href="https://github.com/username"
  target="_blank"
  rel="noopener noreferrer"
>
  <Github className="w-6 h-6" />
</ThemedButton>
```

### Different Sizes
```jsx
<ThemedButton size="small">
  <Icon className="w-4 h-4" />
</ThemedButton>

<ThemedButton size="medium">
  <Icon className="w-6 h-6" />
</ThemedButton>

<ThemedButton size="large">
  <Icon className="w-8 h-8" />
</ThemedButton>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | Icon or content to display inside the button |
| `onClick` | Function | - | Click handler for button |
| `href` | String | - | URL for link button |
| `target` | String | - | Target attribute for links |
| `rel` | String | - | Rel attribute for links |
| `className` | String | "" | Additional CSS classes |
| `size` | String | "medium" | Button size: "small", "medium", "large" |
| `variant` | String | "icon" | Button variant (currently only "icon") |

## Theme Colors

### Dark Mode
- Background: White
- Border: Black
- Icon: Black

### Light Mode
- Background: Black
- Border: White
- Icon: White

## Size Specifications

- **Small**: 40px × 40px (w-10 h-10)
- **Medium**: 48px × 48px (w-12 h-12)
- **Large**: 56px × 56px (w-14 h-14)

## Examples in Use

- Social media icons in hero section
- Theme toggle button in navbar
- Mobile menu button in navbar
- Any icon button that needs theme-aware styling
