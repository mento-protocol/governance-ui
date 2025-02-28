# Mento Governance UI

## Description

This is the UI repository for Mento Governance, a decentralized governance platform for the Mento Protocol. The UI allows users to view, create, and vote on governance proposals.

**Important Documentation:**
- [UI Toolkit Component Compatibility](./docs/ui-toolkit-component-compatibility.md) - Assessment of component compatibility with React Server Components
- [UI Toolkit Migration Plan](./docs/ui-toolkit-migration-plan.md) - Long-term plan for migrating to shared UI components

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Architecture](#architecture)
- [Constraints](#constraints)
- [Troubleshooting](#troubleshooting)
- [Project Spec](#project-spec)

## Prerequisites

- [Node.js](https://nodejs.org/en) >= 20.11.0
- [pnpm](https://pnpm.io/) >= 8.15.0
- [Git](https://git-scm.com/) for version control
- Modern web browser (Chrome, Firefox, Edge, or Safari)

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/mento-protocol/governance-ui.git
cd governance-ui
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

```bash
cp .env .env.local
```

4. **Configure environment variables**

Edit `.env.local` and set the appropriate values for your development environment.

## Development

### Start the development server

```bash
pnpm dev
```

This will start the Next.js development server at [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
pnpm build
```

### Start the production server

```bash
pnpm start
```

### Run tests

```bash
pnpm test
```

## Architecture

This project is built with:

- [Next.js](https://nextjs.org/) - React framework with server-side rendering
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) - For server-side rendering of components

### Component Organization

- `/src/components/_shared` - Shared UI components specific to this project
- `/src/components/ui-toolkit-wrappers` - Client component wrappers for @mento-protocol/ui-toolkit components

## Constraints

### React Server Components Compatibility

This project uses Next.js App Router with React Server Components (RSC). There are several important constraints to be aware of:

1. **Server Components Limitations**:
   - Cannot use React hooks (useState, useEffect, useContext, etc.)
   - Cannot use browser-only APIs
   - Cannot use React Context directly

2. **UI Toolkit Compatibility**:
   - Some components from `@mento-protocol/ui-toolkit` are incompatible with RSC
   - Components that use React Context require client component wrappers
   - See [UI Toolkit Component Compatibility](./docs/ui-toolkit-component-compatibility.md) for detailed guidance

3. **Client Components**:
   - Use the "use client" directive at the top of files for client components
   - Client components can use all React features but lose some RSC benefits
   - When using UI Toolkit components that require state or context, always wrap them in client components

## VS Code recommendations

We recommend installing the following extensions:

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Code formatting
- [Tailwind CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Auto-completion for Tailwind
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Linting

For Tailwind intellisense, add the following to your `settings.json`:

```json
"tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
]
```

## Project spec

Please refer to our [documentation](./docs) for project specifications and architecture details.

## Troubleshooting

### No item imported in barrel file optimization

This is due to the optimizer caching results. To fix:

1. Delete the `.next` folder:
```bash
rm -rf .next
```

2. Restart your development server:
```bash
pnpm dev
```

3. If the issue persists, try cleaning node_modules and reinstalling dependencies:
```bash
rm -rf node_modules
pnpm install
pnpm dev
```

### React Server Components Errors

If you encounter errors related to "cannot use hooks in server components" or similar:

1. Check if you're using UI toolkit components directly in server components
2. Wrap UI toolkit components with client components using the "use client" directive
3. Reference the [UI Toolkit Component Compatibility](./docs/ui-toolkit-component-compatibility.md) document
