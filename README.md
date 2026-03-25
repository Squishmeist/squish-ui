# Squish UI

`squish-ui` is a component documentation repository for **web (React)** and **mobile (React Native)** UI patterns.

The project focuses on:

- Reusable, copy-paste friendly component implementations
- Side-by-side platform documentation (web and mobile)
- Story-based previews and embedded test results in docs pages

## Monorepo layout

```txt
apps/
  docs/         # Next.js docs app

packages/
  cli/          # published squishui CLI
  web/          # web components
  mobile/       # mobile components
```

## Platform model

- **Web components** live under `packages/web/*` and are styled with **Tailwind CSS v4**.
- **Mobile components** live under `packages/mobile/*` and are styled with **React Native StyleSheet**.
- Documentation routes are split by platform:
  - `/docs/components/web/[slug]`
  - `/docs/components/mobile/[slug]`

## Architecture

This repository follows an atomic UI structure for docs rendering:

- `apps/docs/ui/atoms`
- `apps/docs/ui/molecules`
- `apps/docs/ui/organisms`
- `apps/docs/ui/templates`

Docs navigation is centralized in `apps/docs/app/docs/navigation.ts` and shared between desktop and mobile navigation UIs.

## Testing model

- Web component tests use **Vitest**
- Mobile component tests use **Jest**
- Build-time test results are embedded into docs pages from:
  - `apps/docs/test-results.json`
  - `apps/docs/test-results-mobile.json`

In production, docs show embedded build results rather than executing tests at runtime.

## CLI

This repository publishes a CLI that can copy component files into another project.

```bash
npx squishui@latest add button
```

By default, it copies from the published CLI package’s bundled web components into your current project:

- `ui/button/button.tsx`
- `ui/button/button.test.tsx`

Add Storybook stories too:

```bash
npx squishui@latest add button --storybook
```

Optional flags:

- `--storybook` (or `-s`) include `button.stories.tsx`
- `--force` (or `-f`) overwrite existing files

### Local CLI smoke test

From this repository, you can test the command without publishing:

```bash
mkdir -p /tmp/squishui-test && cd /tmp/squishui-test
node /Users/ainsley/Documents/squish-ui/packages/cli/index.mjs add button
ls -la ui/button
```

Expected files:

- `ui/button/button.tsx`
- `ui/button/button.test.tsx`

### Publish checklist

```bash
cd /Users/ainsley/Documents/squish-ui/packages/cli
npm whoami
npm pack --dry-run
npm version patch --workspaces=false
npm publish --access public --workspaces=false
```

Use `--workspaces=false` so npm publishes only the CLI package instead of traversing the monorepo workspace graph.

## Monorepo scripts

- `npm run dev` → runs docs app (`apps/docs`) through Turbo
- `npm run build` → runs build pipeline across workspaces
- `npm run lint` → runs lint tasks across workspaces
- `npm run test:mobile` → runs mobile Jest tests in docs workspace

## Package manager

This monorepo is configured for pnpm workspaces (`workspace:*` package links).  
Use:

```bash
pnpm install
pnpm -w build
```
