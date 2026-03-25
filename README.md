# Squish UI

`squish-ui` is a component documentation repository for **web (React)** and **mobile (React Native)** UI patterns.

The project focuses on:

- Reusable, copy-paste friendly component implementations
- Side-by-side platform documentation (web and mobile)
- Story-based previews and embedded test results in docs pages

## Platform model

- **Web components** live under `components/web/*` and are styled with **Tailwind CSS v4**.
- **Mobile components** live under `components/mobile/*` and are styled with **React Native StyleSheet**.
- Documentation routes are split by platform:
  - `/docs/components/web/[slug]`
  - `/docs/components/mobile/[slug]`

## Architecture

This repository follows an atomic UI structure for docs rendering:

- `ui/atoms`
- `ui/molecules`
- `ui/organisms`
- `ui/templates`

Docs navigation is centralised in `app/docs/navigation.ts` and shared between desktop and mobile navigation UIs.

## Testing model

- Web component tests use **Vitest**
- Mobile component tests use **Jest**
- Build-time test results are embedded into docs pages from:
  - `test-results.json`
  - `test-results-mobile.json`

In production, docs show embedded build results rather than executing tests at runtime.