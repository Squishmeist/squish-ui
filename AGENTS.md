# Agent guidelines

## Next.js version

This project uses Next.js 16. This version has breaking changes — APIs, conventions, and file structure may differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Architecture

**Atomic design** — UI is split into layers. Do not flatten this structure:

```
ui/
  atoms/       # Primitive elements: no internal dependencies (copy-button, nav-link, theme-toggle)
  molecules/   # Composed from atoms (code-tabs, test-runner, table-of-contents)
  organisms/   # Full sections composed from molecules/atoms (sidebar, mobile-nav)
  templates/   # Page-level layouts (component-doc)
components/
  web/         # Web react components (React + Tailwind CSS)
  native/      # Mobile react native components (React Native + NativeWind) - future
app/           # Next.js App Router pages and API routes
```

## Routing

```
/                        → landing page (no sidebar, app/page.tsx)
/docs                    → intro page (sidebar, app/docs/page.tsx)
/docs/installation       → installation guide (sidebar, app/docs/installation/page.tsx)
/docs/components/web/[slug]  → web component doc page (sidebar, app/docs/components/web/[slug]/page.tsx)
/docs/components/mobile/[slug] → mobile component doc page (sidebar, app/docs/components/mobile/[slug]/page.tsx) - future
```

The sidebar layout lives in `app/docs/layout.tsx` — it does not apply to `/`.

## Navigation

Navigation links are centralized in `app/docs/navigation.ts`. This config is used by both `Sidebar` and `MobileNav` components. Update this file when adding new pages:

```typescript
export const navigation: NavSection[] = [
  { items: [{ title: "Introduction", href: "/docs" }] },
  {
    title: "Web Components",
    items: [{ title: "Button", href: "/docs/components/web/button" }],
  },
  {
    title: "Mobile Components",
    items: [{ title: "Button", href: "/docs/components/mobile/button" }],
  },
];
```

## Package Structure

Component packages use a `src/` directory for clean exports:

```
packages/web/
  src/
    button/
      button.tsx        # Component
      button.stories.tsx # Stories
      button.test.tsx   # Tests
    input/
      ...
  package.json  # exports: { "./button": "./src/button/button.tsx", ... }

packages/mobile/
  src/
    button/
      ...
```

**Clean imports** are configured via `"exports"` field in package.json:
```typescript
// Import cleanly without src/ or file extensions
import { Button } from "@squishui/web/button";
import * as Stories from "@squishui/web/button";
import { Button as MobileButton } from "@squishui/mobile/button";
```

## Platform Support

**Web Components** (React + Tailwind CSS v4)

- Location: `packages/web/src/[slug]/`
- Testing: Vitest + Testing Library
- Stories: Component Story Format (CSF)
- Route: `/docs/components/web/[slug]`
- Documentation: `apps/docs/app/docs/components/web/[slug]/page.tsx`

**Mobile Components** (React Native + NativeWind)

- Location: `packages/mobile/src/[slug]/`
- Testing: Jest + Testing Library
- Stories: Component Story Format (CSF)
- Route: `/docs/components/mobile/[slug]`
- Documentation: `apps/docs/app/docs/components/mobile/[slug]/page.tsx`

## Adding a new web component

1. Create `packages/web/src/[slug]/[slug].tsx` — the component
2. Create `packages/web/src/[slug]/[slug].stories.tsx` — named exports with `args`, no Storybook dependency
3. Create `packages/web/src/[slug]/[slug].test.tsx` — Vitest + Testing Library tests
4. Add export to `packages/web/package.json`: `"./[slug]": "./src/[slug]/[slug].tsx"`
5. Run CLI sync: `pnpm run -w web:sync` (updates `packages/cli/web/`)
6. Create `apps/docs/app/docs/components/web/[slug]/page.tsx` — import and render `ComponentDoc` template with `name`, `description`, `package: "web"`, `slug: "[slug]"`
7. Add entry to `apps/docs/app/docs/navigation.ts` in the "Web Components" section

## Adding a new mobile component

1. Create `packages/mobile/src/[slug]/[slug].tsx` — the component
2. Create `packages/mobile/src/[slug]/[slug].stories.tsx` — named exports with `args`
3. Create `packages/mobile/src/[slug]/[slug].test.tsx` — Jest + Testing Library tests
4. Add export to `packages/mobile/package.json`: `"./[slug]": "./src/[slug]/[slug].tsx"`
5. Run CLI sync: `pnpm run -w mobile:sync` (updates `packages/cli/mobile/`)
6. Create `apps/docs/app/docs/components/mobile/[slug]/page.tsx` — import and render `ComponentMobileDoc` template
7. Add entry to `apps/docs/app/docs/navigation.ts` in the "Mobile Components" section

**Template system:** Both `ComponentDoc` (web) and `ComponentMobileDoc` (mobile) use reusable sub-components:
- `ComponentPageLayout` — shared header, TOC, footer
- `PreviewSection` — 3-column preview grid
- `CodeSection` — code tabs wrapper
- `TestResults` — static test results with color coding (green: pass, red: fail)
- `lib.ts` — shared utilities (`readComponentFile`, `readTestResult`, `TOC_SECTIONS`)

## Styling

- Tailwind CSS v4 — use `@import "tailwindcss"` syntax, not `@tailwind` directives
- Dark mode via `.dark` class on `<html>` — defined with `@custom-variant dark (&:where(.dark, .dark *))`
- Do not use hardcoded hex color values. Use Tailwind zinc/indigo palette tokens consistently
- The preview section, code tabs, and test runner all use the same zinc palette — keep them coherent

## Theme

- An inline `<script>` in `app/layout.tsx` applies the correct `.dark` class before React hydrates (prevents flash)
- `ThemeToggle` reads the class the script already set — do not re-read `localStorage` in `useEffect`
- Dark mode state lives only in `ThemeToggle`. There is no React context for theme

## Testing

- Framework: Vitest + `@testing-library/react` + jsdom for web components
- Framework: Jest + `@testing-library/react-native` for mobile components
- Run all tests: `pnpm test`
- **Build-time test results**: The `prebuild` script runs tests and outputs JSON reports:
  - `apps/docs/test-results-web.json` (Vitest output)
  - `apps/docs/test-results-mobile.json` (Jest output)
- **Static rendering**: Component docs render test results from JSON at build time (no dynamic test running)
- **In production**: Test results are embedded in HTML, `/api/run-tests` returns 404
- **In development**: Test results auto-update from JSON on page reload

**Test result display**:
- Green checkmark (✓) for passed tests
- Red X (✗) for failed tests with error messages
- Execution time in milliseconds
- Pass/fail summary at bottom

## Code style

- Server Components by default. Add `"use client"` only when needed (event handlers, hooks, browser APIs)
- No unnecessary `useEffect` — prefer deriving state or using server-side data
- Do not add comments unless the logic is genuinely non-obvious
- Prefer editing existing files over creating new ones
- Keep atomic design boundaries — atoms must not import from molecules or above
- Reusable template components live in `apps/docs/ui/templates/` (not atoms/molecules) since they're documentation-specific

## Build & CLI

- **Monorepo tool**: `pnpm` (not npm/yarn). Use `pnpm run -w` for workspace commands
- **Build system**: Turbo with caching
- **CLI sync scripts**: 
  - `packages/cli/scripts/sync-web-components.mjs` reads from `packages/web/src/`
  - `packages/cli/scripts/sync-mobile-components.mjs` reads from `packages/mobile/src/`
  - These are run before CLI build to copy component files into the CLI package
- **Turbopack note**: The build produces a non-fatal warning about dynamic fs operations in the docs. This is a known Turbopack limitation and does not affect functionality. The build completes successfully.
