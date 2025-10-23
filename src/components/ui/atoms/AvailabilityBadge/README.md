# AvailabilityBadge Component

A reusable atomic component for displaying availability status with colored indicators.

## Usage

```tsx
import { AvailabilityBadge } from '@/components/ui';

// Basic usage
<AvailabilityBadge availability="available" />

// With custom styling
<AvailabilityBadge
  availability="open"
  className="mb-4"
/>
```

## Props

| Prop           | Type                                     | Required | Description                        |
| -------------- | ---------------------------------------- | -------- | ---------------------------------- |
| `availability` | `'available' \| 'open' \| 'unavailable'` | No       | The availability status to display |
| `className`    | `string`                                 | No       | Additional CSS classes             |

## Availability Types and Colors

| Status        | Color | Text                    |
| ------------- | ----- | ----------------------- |
| `available`   | Green | "Available"             |
| `open`        | Blue  | "Open to Opportunities" |
| `unavailable` | Gray  | "Unavailable"           |
| `undefined`   | Green | "Available" (default)   |

## Features

- **Automatic Color Coding**: Each availability status has a distinct color
- **Fallback Handling**: Defaults to "Available" (green) when no status is provided
- **Customizable Styling**: Accepts additional CSS classes via `className` prop
- **Consistent Design**: Uses the same styling pattern across the application
- **TypeScript Support**: Fully typed with Apollo GraphQL types

## Styling

The component uses the following Tailwind CSS classes:

- `bg-gray-100` - Light gray background
- `border border-gray-200` - Subtle border
- `rounded-full` - Fully rounded pill shape
- `text-gray-700` - Dark gray text
- `text-sm font-medium` - Small, medium-weight text
- Dynamic dot colors based on availability status

## Example Use Cases

- Profile headers
- User status indicators
- Availability displays in dashboards
- Contact information sections
- Professional profile components
