# Course Popup Dialog Documentation

## Overview

The Course Popup Dialog is a homepage feature that displays a large promotional popup for the course on first landing, with automatic dismissal after 6 seconds.

## Features

### 🎯 **Core Functionality**

- **First Visit Only**: Shows only on first homepage visit (stored in localStorage)
- **6-Second Timer**: Automatically closes after 6 seconds
- **Manual Close**: Users can close manually with X button
- **Large CTA Button**: Prominent call-to-action button on bottom left
- **Course Poster**: Displays course promotional image

### 🎨 **Design Elements**

- **Large Dialog**: Max-width 4xl with responsive design
- **Course Image**: Uses `/img/guillermo.jpg` as course poster
- **Gradient Overlay**: Ensures text readability over image
- **Timer Display**: Shows countdown in top-left corner
- **Course Badge**: "NUEVO CURSO" badge in top-right
- **Close Button**: X button in top-right corner

### 📊 **Analytics Tracking**

- **Popup Displayed**: Tracks when popup is shown
- **Popup Closed**: Tracks when user closes popup
- **CTA Clicked**: Tracks when user clicks the course button

### 🔧 **Technical Implementation**

#### Component Location

```
src/components/course-popup-dialog.tsx
```

#### Integration

- Added to main layout (`src/app/layout.tsx`)
- Appears on all pages but only shows on first visit
- Uses ShadCN Dialog component for proper z-index and accessibility

#### LocalStorage Key

```
course-popup-seen: "true"
```

#### Timer Logic

- 6-second countdown with 1-second intervals
- Updates every second until reaches 0
- Auto-closes when timer expires

#### Dialog Implementation

- Uses ShadCN Dialog component with proper z-50 z-index
- Includes built-in backdrop and close functionality
- Responsive design with proper accessibility features

## Usage

### For Users

1. Visit homepage for first time
2. Popup appears automatically
3. Click "¡Descubre el Curso!" button to go to course page
4. Or wait 6 seconds for auto-close
5. Or click X to close manually

### For Testing

To reset popup state for testing, uncomment this line in the component:

```typescript
localStorage.removeItem("course-popup-seen");
```

### For Development

- Popup respects user preferences and doesn't interfere with cookie banner
- Uses existing design system components (Button, icons)
- Fully responsive design
- Analytics integration with existing tracking system

## Customization

### Change Timer Duration

```typescript
const [timeLeft, setTimeLeft] = useState(6); // Change 6 to desired seconds
```

### Change Course Image

```typescript
src = "/img/guillermo.jpg"; // Change to desired image path
```

### Modify CTA Button Text

```typescript
<Link href="/course">
  ¡Descubre el Curso! // Change button text here
</Link>
```

### Update Course Title

```typescript
<h2 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
  Curso de Inversión Inmobiliaria // Change title here
</h2>
```

## Analytics Events

| Event               | Category     | Label          | Description                 |
| ------------------- | ------------ | -------------- | --------------------------- |
| `popup_displayed`   | `engagement` | `course_popup` | When popup is first shown   |
| `popup_closed`      | `engagement` | `course_popup` | When user closes popup      |
| `popup_cta_clicked` | `conversion` | `course_popup` | When user clicks CTA button |

## Browser Compatibility

- ✅ Modern browsers with localStorage support
- ✅ Responsive design for mobile and desktop
- ✅ Graceful fallback if localStorage unavailable
- ✅ Works with existing analytics system
