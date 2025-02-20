# Add Tailwind Safelist for Arbitrary Values

## Issue
Components from `@mento-protocol/ui-toolkit` using arbitrary Tailwind values (e.g., `w-[22px]`, `text-[16px]`) are not being properly included in the consuming application's CSS output. This affects components like `Status`, `Button`, and others that use precise measurements and positioning.

## Root Cause
The toolkit's Tailwind configuration doesn't explicitly safelist arbitrary value patterns, causing the JIT compiler to potentially miss these classes when scanning the built files in consuming applications.

## Solution
Added comprehensive safelist patterns to `configs/tailwind.config.ts` that capture all arbitrary value use cases in our components:

- General arbitrary values with pseudo-class variants
- Width/height measurements
- Padding/margin spacing
- Text sizes and line heights
- Positioning values
- Pseudo-element styles

## Testing Steps
1. Build the UI toolkit with updated config
2. In consuming app:
   ```bash
   rm -rf node_modules/.cache
   DEBUG=tailwindcss:* pnpm dev
   ```
3. Verify arbitrary values appear in output CSS
4. Check component styling, particularly:
   - Status component heights and text sizes
   - Button padding and pseudo-element positioning
   - Dropdown positioning and transitions

## Consumer Usage
No changes required in consuming applications if they're already using the toolkit's preset:

```typescript
// tailwind.config.ts
export default {
  presets: [require("@mento-protocol/ui-toolkit/configs/tailwind.config")],
  content: [
    // ... existing paths ...
    "./node_modules/@mento-protocol/ui-toolkit/dist/**/*.{js,ts,jsx,tsx}",
  ],
}
```

## Related
- Fixes issue with component styles not being included in production builds
- Improves consistency between development and production environments
- Reduces need for manual class inclusion in consuming apps

## Changes Made
```diff
// configs/tailwind.config.ts
  plugins: [typography, animate],
+ safelist: [
+   {
+     pattern: /^\[.*\]$/, // Match all arbitrary values
+     variants: ['hover', 'focus', 'active', 'before', 'after'],
+   },
+   {
+     // Match specific arbitrary value patterns commonly used in components
+     pattern: /^(w|h)-\[.*\]$/,
+     variants: ['hover', 'focus', 'active', 'before', 'after'],
+   },
+   {
+     pattern: /^(p|m)[xy]?-\[.*\]$/,
+     variants: ['hover', 'focus', 'active', 'before', 'after'],
+   },
+   {
+     pattern: /^text-\[.*\]$/,
+     variants: ['hover', 'focus', 'active', 'before', 'after'],
+   },
+   {
+     pattern: /^(top|left|right|bottom)-\[.*\]$/,
+     variants: ['hover', 'focus', 'active', 'before', 'after'],
+   },
+   {
+     pattern: /^before:.*\[.*\]$/,
+     variants: ['hover', 'focus', 'active'],
+   },
+   {
+     pattern: /^after:.*\[.*\]$/,
+     variants: ['hover', 'focus', 'active'],
+   }
+ ],
``` 