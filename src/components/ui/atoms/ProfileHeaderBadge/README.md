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

| Prop        | Type                                         | Required | Description                                           |
| ----------- | -------------------------------------------- | -------- | ----------------------------------------------------- |
| `icon`      | `LucideIcon`                                 | Yes      | The icon component to display                         |
| `label`     | `string`                                     | Yes      | The text label to display                             |
| `type`      | `'email' \| 'phone' \| 'link' \| 'linkedin'` | Yes      | Determines the badge behavior and click action        |
| `href`      | `string`                                     | No       | Optional link URL for external links or email address |
| `className` | `string`                                     | No       | Additional CSS classes                                |

## Types and Behavior

| Type       | Behavior                                                                      |
| ---------- | ----------------------------------------------------------------------------- |
| `email`    | Opens email application with `mailto:` link                                   |
| `phone`    | No click action - display only                                                |
| `linkedin` | Opens LinkedIn profile in new tab (formats URL as linkedin.com/in/[username]) |
| `link`     | Opens external link in new tab                                                |

**Note**: For LinkedIn badges, the component automatically formats URLs:

- Removes leading slashes (e.g., `/johnsmith` → `johnsmith`)
- Extracts usernames from full URLs (e.g., `https://www.linkedin.com/in/user-test-a41100167/` → `user-test-a41100167`)
- Always creates the proper format: `https://www.linkedin.com/in/[username]`

**Tooltip Behavior**: The component always shows a shadcn tooltip on hover, which is perfect for truncated text. For short text that isn't truncated, the tooltip still provides a nice user experience showing the full content.

## Features

- **Responsive Design**: Adapts to different screen sizes
- **React Router Integration**: Uses `Link` component for all navigation
- **Smart Behavior**: Automatically handles different types with appropriate actions
- **Icon Support**: Uses Lucide React icons
- **Consistent Styling**: Clean, modern design with subtle borders
- **Accessibility**: Proper link attributes and hover states
- **Smart Truncation**: Automatically truncates long text with ellipsis
- **Always Available Tooltips**: Shows shadcn tooltip on hover for all text, providing consistent user experience
- **Smart Cursor Behavior**: Shows pointer cursor for clickable badges, default cursor for non-clickable ones

## Styling

The component uses the following Tailwind CSS classes:

- `bg-gray-50` - Light gray background
- `border border-gray-100` - Subtle border
- `rounded-lg` - Rounded corners
- `hover:opacity-80` - Hover effect for clickable badges
- `transition-opacity` - Smooth opacity transitions
