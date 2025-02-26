# UI Toolkit Migration Plan

**Date:** July 25, 2023  
**Author:** Governance UI Team  
**Status:** Proposed

## Overview

This document outlines the comprehensive plan for migrating components from our codebase into the shared UI library `@mento-protocol/ui-toolkit`. The migration aims to reduce code duplication, improve consistency, and establish a single source of truth for UI components across Mento projects.

## Component Inventory & Analysis

### Components to Remove (Already in UI Toolkit)

We've identified **33 components** that exist in both places and should be removed from our project:

| Component | Status | Priority | Location |
|-----------|--------|----------| -------- |
| Avatar | Duplicate | High | src/components/_shared/avatar |
| Badge | Duplicate | High | src/components/badges |
| BlockExplorerLink | Duplicate | Medium | src/components/_shared/block-explorer-link |
| Breadcrumbs | Duplicate | Medium | src/components/_shared/breadcrumbs |
| Button | Duplicate | High | UI Toolkit Import |
| ConnectButton | Duplicate | High | src/components/_shared/connect-button |
| CurrencyInput | Duplicate | Medium | src/components/_shared/currency-input |
| DisconnectButton | Duplicate | Medium | src/components/_shared/disconnect-button.tsx |
| Divider | Duplicate | Low | src/components/_shared/divider |
| DropdownButton | Duplicate | Medium | src/components/_shared/dropdown-button |
| Expandable | Duplicate | Medium | src/components/_shared/expandable |
| Footer | Duplicate | High | src/components/_shared/footer |
| Header | Duplicate | High | src/components/_shared/header |
| Input | Duplicate | High | src/components/_shared/input |
| LearnMore | Duplicate | Medium | src/components/_shared/learn-more |
| MaxWidthWrapper | Duplicate | High | src/components/_shared/max-width-wrapper.tsx |
| MobileAccordionMenu | Duplicate | Medium | src/components/_shared/mobile-accordion-menu.tsx |
| Modal | Duplicate | High | src/components/_shared/modal |
| ProgressBar | Duplicate | Medium | src/components/_shared/progress-bar |
| ScrollArea | Duplicate | Medium | src/components/_shared/scroll-area |
| SeeAll | Duplicate | Low | src/components/_shared/see-all |
| Sheet | Duplicate | Medium | src/components/_shared/sheet |
| Slider | Duplicate | Medium | src/components/_shared/slider |
| Spacer | Duplicate | Low | src/components/_shared/spacer |
| Status | Duplicate | Medium | src/components/_shared/status |
| StepCounter | Duplicate | Low | src/components/_shared/step-counter |
| TableDivider | Duplicate | Low | src/components/_shared/table-divider.component.tsx |
| Tabs | Duplicate | Medium | src/components/_shared/tabs |
| Textarea | Duplicate | Medium | src/components/_shared/textarea |
| ThemeSwitch | Duplicate | Medium | src/components/_shared/theme-switch |
| Toaster | Duplicate | Medium | src/components/_shared/toaster |
| Tooltip | Duplicate | Medium | src/components/_shared/tooltip |
| TxModal | Duplicate | High | src/components/_shared/tx-modal |
| ValueLoaderSkeleton | Duplicate | Medium | src/components/_shared/value-loader-skeleton |

### Components to Adopt (Available in UI Toolkit)

There are **10 components** in the UI toolkit that could be adopted in our project:

| Component | Status | Priority | Notes |
|-----------|--------|----------| ----- |
| Accordion | New | Medium | Enhances expandable content sections |
| Calendar | New | Low | For date selection interfaces |
| Card | New | High | Foundation for content containers |
| DatePicker | New | Low | Enhanced date selection with Calendar |
| Form | New | High | Structured form handling with validation |
| Label | New | Medium | Accessibility-enhanced form labels |
| Loader | New | Medium | Loading state indicators |
| LoadingCircle | New | Medium | Alternative loading visualization |
| Progress | New | Medium | Progress indicators beyond ProgressBar |
| TextWithCopy | New | Medium | Text with copy-to-clipboard functionality |

### Project-Specific Components (Keep in Project)

These **5 components** appear to be specific to the governance UI and should remain in our project:

| Component | Status | Notes |
|-----------|--------|-------|
| markdown-editor | Keep | Specialized for governance proposal editing |
| markdown-view | Keep | Governance proposal rendering |
| mento-lock | Keep | Specific to governance token locking |
| execution-code-view | Keep | For governance execution code display |
| wallet-address-with-copy | Keep | Could potentially be generalized later |

## Migration Approach

### Phase 1: Foundation Components (Weeks 1-2)

1. **Setup & Preparation**
   [ ] Update Tailwind configuration to ensure proper integration with the UI toolkit
   [ ] Add necessary exports in index files
   [ ] Create migration documentation

2. **Remove Core Duplicate Components**
   [ ] Button
   [ ] Input
   [ ] Avatar
   [ ] Badge
   [ ] MaxWidthWrapper
   [ ] Header
   [ ] Footer

### Phase 2: Interactive Components (Weeks 3-4)

1. **Remove Duplicate Interactive Components**
   [ ] Modal
   [ ] Tooltip
   [ ] TxModal
   [ ] ConnectButton
   [ ] DisconnectButton
   [ ] Toaster
   [ ] ScrollArea
   [ ] Sheet

2. **Adopt New Components**
   [ ] Card
   [ ] Form
   [ ] Label
   [ ] TextWithCopy

### Phase 3: Specialized Components (Weeks 5-6)

1. **Remove Remaining Duplicate Components**
   [ ] All remaining components from the "Components to Remove" list

2. **Adopt Remaining Components**
   [ ] All remaining components from the "Components to Adopt" list

3. **Evaluate Project-Specific Components**
   [ ] Determine if any project-specific components should be generalized and moved to the UI toolkit

## Implementation Strategy

### For Each Component:

1. **Analysis**
   [ ] Compare implementation details between project and UI toolkit versions
   [ ] Identify customizations and props differences
   [ ] Document any breaking changes

2. **Migration**
   [ ] Update imports to use UI toolkit component
   [ ] Adjust props and usages as needed
   [ ] Remove duplicate component from project

3. **Testing**
   [ ] Visual regression testing
   [ ] Functionality testing
   [ ] Accessibility testing
   [ ] Performance testing

4. **Documentation**
   [ ] Update component usage examples
   [ ] Document any changes in behavior or props

## Testing Strategy

1. **Unit Tests**
   [ ] Test each component in isolation
   [ ] Verify props and functionality
   [ ] Test edge cases

2. **Integration Tests**
   [ ] Test components in the context of the application
   [ ] Verify interactions between components

3. **Visual Regression Testing**
   [ ] Capture screenshots before and after migration
   [ ] Compare for visual differences

4. **Accessibility Testing**
   [ ] Verify ARIA attributes
   [ ] Test keyboard navigation
   [ ] Test screen reader compatibility

5. **Performance Testing**
   [ ] Measure bundle size impact
   [ ] Test rendering performance

## Tools & Resources

1. **Migration Tracker**
   [ ] Create a spreadsheet or Jira board to track progress
   [ ] Include component status, dependencies, and testing results

2. **Component Explorer**
   [ ] Create a Storybook or similar tool to showcase UI toolkit components
   [ ] Include usage examples and props documentation

3. **Automated Testing**
   [ ] Use Jest for unit tests
   [ ] Use Cypress for integration tests
   [ ] Use Storybook for visual regression tests

## Risk Mitigation

1. **Incremental Approach**
   [ ] Migrate one component at a time
   [ ] Test thoroughly before moving to the next component

2. **Rollback Plan**
   [ ] Maintain the ability to revert to the previous implementation
   [ ] Create feature flags to toggle between implementations

3. **Parallel Development**
   [ ] Develop against both implementations during transition
   [ ] Gradually shift to UI toolkit components

## Documentation Requirements

1. **Migration Guide**
   [ ] Document the migration process for each component
   [ ] Include before/after examples

2. **UI Toolkit Usage Guide**
   [ ] Document how to use UI toolkit components
   [ ] Include props, examples, and best practices

3. **Component Inventory**
   [ ] Maintain an up-to-date inventory of components
   [ ] Include status, dependencies, and migration dates

## Dependencies and Prerequisites

1. **UI Toolkit Version**
   [ ] Ensure we're using the latest stable version
   [ ] Document any version-specific considerations

2. **Tailwind Configuration**
   [ ] Proper integration with the UI toolkit's Tailwind preset
   [ ] Handling of custom styles and utilities

3. **Build Configuration**
   [ ] Transpilation of UI toolkit components
   [ ] Bundle size optimization

## Post-Migration Maintenance

1. **Version Management**
   [ ] Strategy for updating UI toolkit versions
   [ ] Impact assessment for breaking changes

2. **Feedback Loop**
   [ ] Process for reporting issues with UI toolkit components
   [ ] Mechanism for suggesting improvements

3. **Contribution Guidelines**
   [ ] Process for contributing back to the UI toolkit
   [ ] Standards for component development

## Changelog

| Date | Version | Changes |
|------|---------|---------|
| 2023-07-25 | 1.0 | Initial migration plan |

## Appendix

### Component Mapping Reference
```typescript
// Example of migrating from local component to UI toolkit
// Before:
import { Button } from '@/components/_shared/button';

// After:
import { Button } from '@mento-protocol/ui-toolkit';
```

### Tailwind Configuration Reference

```typescript
// Proper Tailwind configuration for UI toolkit integration
import type { Config } from "tailwindcss";
import { tailwindPreset } from "@mento-protocol/ui-toolkit";

const config = {
  presets: [tailwindPreset],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@mento-protocol/ui-toolkit/dist/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Custom theme extensions
  theme: {
    extend: {
      // Project-specific extensions
    },
  },
} satisfies Config;

export default config;
``` 

