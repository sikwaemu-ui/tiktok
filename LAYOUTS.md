# Layout Architecture Documentation

## Overview

This application uses **route-based layout composition** with Next.js App Router to manage two distinct layout structures:

1. **AppLayout** - For authenticated app routes with navigation
2. **AuthLayout** - For authentication pages without navigation

## Route Structure

```
app/
├── layout.tsx                 # Root layout (HTML, body, globals)
├── (app)/                     # App route group
│   ├── layout.tsx            # Uses AppLayout
│   ├── dashboard/page.tsx
│   ├── explore/page.tsx
│   ├── profile/page.tsx
│   └── ...other routes
└── (auth)/                    # Auth route group
    ├── layout.tsx            # Uses AuthLayout
    ├── login/page.tsx
    └── signup/page.tsx
```

## Layout Components

### AppLayout (`components/layouts/AppLayout.tsx`)

Renders the main application interface with:
- **Fixed Sidebar** - Left navigation panel (sticky, always visible)
- **Sticky TopNav** - Top navigation bar (sticks while scrolling)
- **Main Content Area** - Scrollable content region for page content

```tsx
<AppLayout>
  <YourPage />
</AppLayout>
```

**Features:**
- Responsive flex layout
- Persistent navigation components
- Proper z-index layering for overlays
- Optimized scrolling with fixed sidebar offset

### AuthLayout (`components/layouts/AuthLayout.tsx`)

Renders a minimal centered layout for authentication pages:
- Gradient background
- Centered content container
- No navigation elements

```tsx
<AuthLayout>
  <LoginForm />
</AuthLayout>
```

**Features:**
- Clean, minimal design
- Centered content
- Full-height centered layout
- Optimized for form content

## How It Works

### Route Group Architecture

Next.js **route groups** (folders in parentheses) allow you to:
- Organize routes without affecting URL structure
- Apply different layouts to route segments
- Keep related pages together logically

### Layout Composition Flow

```
1. User visits /app/dashboard
   ↓
2. Matches app/(app)/ route group
   ↓
3. Renders app/(app)/layout.tsx
   ↓
4. Imports and renders <AppLayout>
   ↓
5. <AppLayout> renders Sidebar, TopNav, and children
   ↓
6. dashboard/page.tsx renders inside content area
```

```
1. User visits /login
   ↓
2. Matches app/(auth)/ route group
   ↓
3. Renders app/(auth)/layout.tsx
   ↓
4. Imports and renders <AuthLayout>
   ↓
5. <AuthLayout> renders centered form area
   ↓
6. login/page.tsx renders inside AuthLayout
```

## Adding New Routes

### Adding to App Routes (with navigation)

Create files under `app/(app)/`:
```
app/(app)/
├── my-new-page/
│   └── page.tsx      # Automatically wrapped with AppLayout
```

### Adding to Auth Routes (without navigation)

Create files under `app/(auth)/`:
```
app/(auth)/
├── forgot-password/
│   └── page.tsx      # Automatically wrapped with AuthLayout
```

## Styling and Responsiveness

### AppLayout Classes
- `flex h-screen bg-gray-50` - Flex container, full height, gray background
- `fixed inset-y-0 left-0 z-40` - Fixed sidebar positioning
- `sticky top-0 z-30` - Sticky top navigation
- `flex-1 overflow-y-auto` - Main content scrolls

### AuthLayout Classes
- `min-h-screen bg-gradient-to-br` - Full height with gradient
- `max-w-md px-4` - Centered, max-width constraint
- `flex items-center justify-center` - Perfect centering

## Best Practices Implemented

✅ **Route-based composition** - No conditional pathname checks  
✅ **Reusable layout components** - Centralized in components/layouts/  
✅ **Barrel exports** - Easy imports via index.ts  
✅ **TypeScript interfaces** - Type-safe props  
✅ **Metadata** - SEO optimization per layout  
✅ **Z-index management** - Proper layering for fixed/sticky elements  
✅ **Responsive design** - Tailwind utility classes  
✅ **Separation of concerns** - Layout logic isolated from routes  

## Customization

### Modifying AppLayout

Edit `components/layouts/AppLayout.tsx` to:
- Change sidebar width: Update `w-64` and `ml-64` values
- Adjust spacing: Modify `px-4 sm:px-6 lg:px-8 py-8`
- Change colors: Update `bg-white`, `border-gray-200`, etc.

### Modifying AuthLayout

Edit `components/layouts/AuthLayout.tsx` to:
- Change background: Update gradient classes
- Adjust form width: Modify `max-w-md`
- Customize styling per your brand

## File Tree

```
components/
├── layouts/
│   ├── AppLayout.tsx       # Main app layout (Sidebar + TopNav)
│   ├── AuthLayout.tsx      # Auth layout (minimal)
│   └── index.ts            # Barrel export
├── Sidebar.tsx             # Navigation sidebar
└── TopNav.tsx              # Top navigation

app/
├── layout.tsx              # Root layout
├── (app)/
│   └── layout.tsx          # App route layout
└── (auth)/
    └── layout.tsx          # Auth route layout
```

## No Pathname Checks

This implementation **avoids conditional rendering based on pathname**, instead using:
- Next.js route groups `(app)` and `(auth)`
- Route-specific layout files
- Automatic layout wrapping based on route location
- Clean separation without runtime checks

This approach is:
- **More maintainable** - Layouts are defined near their routes
- **More performant** - No conditional logic in components
- **More scalable** - Easy to add new layout variations
- **More type-safe** - Clear component boundaries
