# ProfileHeaderBadge Component

A reusable atomic component for displaying contact information badges in profile headers.

## Usage

```tsx
import { Mail, Phone, Linkedin, Globe } from 'lucide-react';
import { ProfileHeaderBadge } from '@/components/ui';

// Basic usage
<ProfileHeaderBadge
  icon={Mail}
  label="john.doe@example.com"
  href="mailto:john.doe@example.com"
/>

// Phone badge
<ProfileHeaderBadge
  icon={Phone}
  label="+1 (555) 123-4567"
  href="tel:+15551234567"
/>

// LinkedIn badge
<ProfileHeaderBadge
  icon={Linkedin}
  label="LinkedIn"
  href="https://linkedin.com/in/johndoe"
/>

// Portfolio badge
<ProfileHeaderBadge
  icon={Globe}
  label="Portfolio"
  href="https://johndoe.dev"
/>
```

## Props

| Prop        | Type         | Required | Description                                                 |
| ----------- | ------------ | -------- | ----------------------------------------------------------- |
| `icon`      | `LucideIcon` | Yes      | The icon component to display                               |
| `label`     | `string`     | Yes      | The text label to display                                   |
| `href`      | `string`     | No       | Optional link URL. If provided, the badge becomes clickable |
| `className` | `string`     | No       | Additional CSS classes                                      |

## Features

- **Responsive Design**: Adapts to different screen sizes
- **Clickable Links**: Automatically becomes a link when `href` is provided
- **Icon Support**: Uses Lucide React icons
- **Consistent Styling**: Clean, modern design with subtle borders
- **Accessibility**: Proper link attributes and hover states
- **Truncation**: Handles long text gracefully

## Styling

The component uses the following Tailwind CSS classes:

- `bg-gray-50` - Light gray background
- `border border-gray-100` - Subtle border
- `rounded-lg` - Rounded corners
- `hover:opacity-80` - Hover effect for clickable badges
- `transition-opacity` - Smooth opacity transitions
