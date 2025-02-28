# UI Toolkit Component Compatibility Assessment

**Date:** February 26, 2024  
**Author:** Governance UI Team  
**Status:** In Progress

## Overview

This document provides a comprehensive assessment of the compatibility between local components in the Governance UI and their counterparts in the `@mento-protocol/ui-toolkit` package. It analyzes each component's compatibility with Next.js React Server Components (RSC) architecture and provides recommendations for migration.

## React Server Components Compatibility Issues

During our testing and assessment, we identified key compatibility issues with certain UI toolkit components:

1. **Context API Usage**: Components using React Context are incompatible with Next.js Server Components
2. **React Hooks**: Components using hooks like useState, useEffect, useContext, etc., require client components
3. **Event Handlers**: Components with complex event handling typically require client components
4. **Dynamic State**: Any component that maintains state through React mechanisms is incompatible with RSC
5. **Third-party Libraries**: Components using libraries that depend on browser APIs or React context

Even with the `"use client"` directive, if a UI toolkit component is rendered directly by a server component, compatibility issues can arise, particularly with context-based components.

## Component Compatibility Matrix

### Core Layout Components

| Component | Local Location | UI Toolkit Available | RSC Compatible | Recommendation | Priority |
|-----------|---------------|---------------------|----------------|----------------|----------|
| MaxWidthWrapper | src/components/_shared/max-width-wrapper.tsx | ✅ Available | ❌ Incompatible | Keep Local | High |
| Header | src/components/_shared/header | ✅ Available (Commented) | ❌ Incompatible | Keep Local | High |
| Footer | src/components/_shared/footer | ✅ Available (Commented) | ❌ Incompatible | Keep Local | High |

### Basic UI Components

| Component | Local Location | UI Toolkit Available | RSC Compatible | Recommendation | Priority |
|-----------|---------------|---------------------|----------------|----------------|----------|
| Avatar | src/components/_shared/avatar | ✅ Available | ✅ Likely Compatible | Replace with Toolkit | Medium |
| Badge | src/components/badges | ✅ Available | ✅ Likely Compatible | Replace with Toolkit | Medium |
| Button | (UI Toolkit Import) | ✅ Available | ✅ Likely Compatible | Replace with Toolkit | High |
| Card | (Not Implemented) | ✅ Available | ✅ Likely Compatible | Adopt from Toolkit | High |
| Divider | src/components/_shared/divider | ✅ Available | ✅ Likely Compatible | Replace with Toolkit | Low |
| Input | src/components/_shared/input | ✅ Available | ✅ Likely Compatible | Replace with Toolkit | High |
| Label | (Not Implemented) | ✅ Available | ✅ Likely Compatible | Adopt from Toolkit | Medium |
| Spacer | src/components/_shared/spacer | ✅ Available | ✅ Likely Compatible | Replace with Toolkit | Low |
| Status | src/components/_shared/status | ✅ Available | ✅ Likely Compatible | Replace with Toolkit | Medium |
| TableDivider | src/components/_shared/table-divider.component.tsx | ✅ Available | ✅ Likely Compatible | Replace with Toolkit | Low |
| Textarea | src/components/_shared/textarea | ✅ Available | ✅ Likely Compatible | Replace with Toolkit | Medium |
| ValueLoaderSkeleton | src/components/_shared/value-loader-skeleton | ✅ Available | ✅ Likely Compatible | Replace with Toolkit | Medium |

### Interactive Components

| Component | Local Location | UI Toolkit Available | RSC Compatible | Recommendation | Priority |
|-----------|---------------|---------------------|----------------|----------------|----------|
| Accordion | (Not Implemented) | ✅ Available | ⚠️ Needs Client | Adopt in Client Component | Medium |
| Breadcrumbs | src/components/_shared/breadcrumbs | ✅ Available | ⚠️ Needs Client | Client Wrapper | Medium |
| Calendar | src/components/_shared/calendar | ✅ Available (Commented) | ❌ Incompatible | Keep Local | Low |
| ConnectButton | src/components/_shared/connect-button | ✅ Available | ⚠️ Needs Client | Client Wrapper | High |
| CurrencyInput | src/components/_shared/currency-input | ✅ Available | ⚠️ Needs Client | Client Wrapper | Medium |
| DatePicker | src/components/_shared/date-picker | ✅ Available (Commented) | ❌ Incompatible | Keep Local | Low |
| DisconnectButton | src/components/_shared/disconnect-button.tsx | ✅ Available | ⚠️ Needs Client | Client Wrapper | Medium |
| DropdownButton | src/components/_shared/dropdown-button | ✅ Available | ⚠️ Needs Client | Client Wrapper | Medium |
| Expandable | src/components/_shared/expandable | ✅ Available | ⚠️ Needs Client | Client Wrapper | Medium |
| LearnMore | src/components/_shared/learn-more | ✅ Available | ✅ Likely Compatible | Replace with Toolkit | Medium |
| Loader | (Not Implemented) | ✅ Available | ✅ Likely Compatible | Adopt from Toolkit | Medium |
| LoadingCircle | (Not Implemented) | ✅ Available | ✅ Likely Compatible | Adopt from Toolkit | Medium |
| MobileAccordionMenu | src/components/_shared/mobile-accordion-menu.tsx | ✅ Available | ⚠️ Needs Client | Client Wrapper | Medium |
| Modal | src/components/_shared/modal | ✅ Available | ⚠️ Needs Client | Client Wrapper | High |
| Progress/ProgressBar | src/components/_shared/progress-bar | ✅ Available | ✅ Likely Compatible | Replace with Toolkit | Medium |
| ScrollArea | src/components/_shared/scroll-area | ✅ Available | ⚠️ Needs Client | Client Wrapper | Medium |
| SeeAll | src/components/_shared/see-all | ✅ Available | ⚠️ Needs Client | Client Wrapper | Low |
| Sheet | src/components/_shared/sheet | ✅ Available | ⚠️ Needs Client | Client Wrapper | Medium |
| Slider | src/components/_shared/slider | ✅ Available | ⚠️ Needs Client | Client Wrapper | Medium |
| StepCounter | src/components/_shared/step-counter | ✅ Available | ⚠️ Needs Client | Client Wrapper | Low |
| Tabs | src/components/_shared/tabs | ✅ Available | ⚠️ Needs Client | Client Wrapper | Medium |
| TextWithCopy | (Not Implemented) | ✅ Available | ✅ Likely Compatible | Adopt from Toolkit | Medium |
| ThemeSwitch | src/components/_shared/theme-switch | ✅ Available | ⚠️ Needs Client | Client Wrapper | Medium |
| Toaster | src/components/_shared/toaster | ✅ Available | ⚠️ Needs Client | Client Wrapper | Medium |
| Tooltip | src/components/_shared/tooltip | ✅ Available | ⚠️ Needs Client | Client Wrapper | Medium |
| TxModal | src/components/_shared/tx-modal | ✅ Available | ⚠️ Needs Client | Client Wrapper | High |

### Project-Specific Components

| Component | Local Location | UI Toolkit Available | RSC Compatible | Recommendation | Priority |
|-----------|---------------|---------------------|----------------|----------------|----------|
| markdown-editor | src/components/_shared/markdown-editor | ❌ Not Available | N/A | Keep Local | N/A |
| markdown-view | src/components/_shared/markdown-view | ❌ Not Available | N/A | Keep Local | N/A |
| mento-lock | src/components/_shared/mento-lock | ❌ Not Available | N/A | Keep Local | N/A |
| execution-code-view | src/components/_shared/execution-code-view | ❌ Not Available | N/A | Keep Local | N/A |
| wallet-address-with-copy | src/components/_shared/wallet-address-with-copy | ❌ Not Available | N/A | Keep Local | N/A |

## Component Analysis Details

### Core Layout Components

#### MaxWidthWrapper
- **UI Toolkit Implementation**: Has "use client" directive, fairly simple, but can have issues when containing other complex components
- **Local Implementation**: Simple wrapper with a fixed max-width and padding
- **Recommendation**: Keep using the local implementation as it's simpler and avoids potential RSC issues

#### Header
- **UI Toolkit Implementation**: Uses React Context for state management and is explicitly commented out in the UI toolkit exports
- **Local Implementation**: Similar structure but simplified for our needs
- **Recommendation**: Continue using local implementation due to known RSC compatibility issues

#### Footer
- **UI Toolkit Implementation**: Uses Context API and is commented out in the UI toolkit exports
- **Local Implementation**: Similar structure but adapted for our specific needs
- **Recommendation**: Continue using local implementation due to known RSC compatibility issues

### Simple UI Components (Safe to Replace)

These components are generally static or have minimal state management, making them relatively safe to replace with UI toolkit versions:

- **Avatar**: Simple display component likely compatible with RSC
- **Badge**: Static display component likely compatible with RSC
- **Button**: Fundamental UI element with good RSC compatibility
- **Card**: Container component likely compatible with RSC
- **Divider**: Static display component with high RSC compatibility
- **Input**: Form element that's likely RSC compatible as long as it's wrapped in a client component form
- **Spacer**: Simple spacing component with high RSC compatibility
- **Status**: Status indicator likely compatible with RSC
- **TableDivider**: Simple divider component likely compatible with RSC
- **Textarea**: Form element that's likely RSC compatible if wrapped in a client component
- **ValueLoaderSkeleton**: Loading state visualization likely RSC compatible

### Interactive Components (Require Client Wrappers)

These components likely use React hooks, context, or browser-specific APIs and would need client component wrappers:

- **ConnectButton**: Uses wallet connection functionality that requires client components
- **DropdownButton**: Uses state for open/close functionality
- **Modal**: Uses state and portals that require client components
- **ThemeSwitch**: Manages theme state which requires client components
- **Tooltip**: Uses state for show/hide behavior
- **TxModal**: Manages transaction state requiring client components

## Migration Strategy

### Phase 1: Simple Component Migration
1. Start by replacing simple, static components from the UI toolkit
2. Focus on components with minimal or no state management
3. Test each component thoroughly for RSC compatibility

### Phase 2: Client Component Wrappers
1. Create client component wrappers for more complex UI toolkit components
2. Ensure "use client" directive is properly applied
3. Test each wrapped component for proper functionality

### Phase 3: Documentation and Knowledge Base
1. Document each component's compatibility status
2. Create usage examples for properly implementing UI toolkit components
3. Share learnings with the UI toolkit team for potential improvements

## Implementation Guidelines

### Client Component Wrapper Example

```tsx
// Example client wrapper for a UI toolkit component
"use client";

import { SomeComponent } from "@mento-protocol/ui-toolkit";
import type { SomeComponentProps } from "@mento-protocol/ui-toolkit";

export function SomeComponentWrapper(props: SomeComponentProps) {
  return <SomeComponent {...props} />;
}
```

### Local Component Retention Guidelines

When keeping a local component instead of using the UI toolkit version:
1. Document why the component is being kept locally
2. Ensure the local component follows design system guidelines
3. Consider implementing a future migration path if UI toolkit compatibility improves

## Conclusion

Based on our assessment, we should:
1. Keep core layout components (MaxWidthWrapper, Header, Footer) as local implementations
2. Replace simple UI components with UI toolkit versions when possible
3. Use client component wrappers for interactive UI toolkit components
4. Maintain project-specific components locally

This approach balances the benefits of the shared UI toolkit with the requirements of Next.js React Server Components architecture. 