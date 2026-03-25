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

## Platform Support

**Web Components** (React + Tailwind CSS v4)

- Location: `components/web/[slug]/`
- Testing: Vitest + Testing Library
- Stories: Component Story Format (CSF)
- Route: `/docs/components/[slug]`

**Native Components** (React Native + NativeWind) - Future

- Location: `components/mobile/[slug]/`
- Testing: Jest + Testing Library
- Stories: Component Story Format (CSF)
- Route: `/docs/native/[slug]`

## Adding a new web component

1. Create `components/web/[slug]/[slug].tsx` — the component
2. Create `components/web/[slug]/[slug].stories.tsx` — named exports with `args`, no Storybook dependency
3. Create `components/web/[slug]/[slug].test.tsx` — Vitest + Testing Library tests
4. Create `app/docs/components/web/[slug]/page.tsx` — import `ComponentDoc` from `@/ui/templates/component-doc`
5. Add entry to `app/docs/navigation.ts` in the "Web Components" section

## Adding a new mobile component

1. Create `components/mobile/[slug]/[slug].tsx` — the component
2. Create `components/mobile/[slug]/[slug].stories.tsx` — named exports with `args`
3. Create `components/mobile/[slug]/[slug].test.tsx` — Jest + Testing Library tests
4. Create `app/docs/components/mobile/[slug]/page.tsx` — custom page layout for native components
5. Add entry to `app/docs/navigation.ts` in the "Mobile Components" section

The `ComponentDoc` template reads source files from disk at build time via `fs.readFileSync`. No manual code strings.

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

- Framework: Vitest + `@testing-library/react` + jsdom
- Run all tests: `npm test`
- The `prebuild` script runs `vitest run --reporter=json --outputFile=test-results.json` before `next build`
- Test results are embedded statically at build time. The `/api/run-tests` route returns 404 in production
- In development, the test runner UI calls `/api/run-tests?slug=[slug]` to run per-component tests interactively

## Code style

- Server Components by default. Add `"use client"` only when needed (event handlers, hooks, browser APIs)
- No unnecessary `useEffect` — prefer deriving state or using server-side data
- Do not add comments unless the logic is genuinely non-obvious
- Prefer editing existing files over creating new ones
- Keep atomic design boundaries — atoms must not import from molecules or above
