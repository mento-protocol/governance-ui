# UI Toolkit Dependency Alignment

## Overview

The `@mento-protocol/ui-toolkit` package has been updated to use peer dependencies for date handling libraries to prevent version conflicts and ensure consistent behavior across projects.

## Changes

The UI toolkit has made the following changes:
- Moved `react-day-picker` from regular dependencies to peer dependencies (^8.9.1)
- Added `date-fns` as a peer dependency with version ^2.30.0 (matching governance-ui)

## Integration Details

The governance-ui project already has the correct versions of these dependencies:
- `date-fns`: ^2.30.0 (direct dependency)
- `react-day-picker`: ^8.9.1 (direct dependency, resolves to 8.10.1)

This alignment ensures that:
1. Only one version of each library is used throughout the application
2. No duplicate installations occur
3. Date handling is consistent between custom components and UI toolkit components

## Affected Components

The following components use date-related functionality from the UI toolkit:
- `LockingDayPicker` in `src/components/_shared/mento-lock/components/locking-day-picker.tsx`
- `DatePicker` and `Calendar` in `src/components/lock-manage-lock/manage-lock-button/manage-lock-button.component.tsx`

## Validation

When upgrading the UI toolkit:
1. Verify that calendar components render properly
2. Test date selection functionality 
3. Check for any console warnings related to react-day-picker or date-fns
4. Ensure date handling is consistent throughout the application

## Last Updated

Updated on: May 19, 2024 