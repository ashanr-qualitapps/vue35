This repository is a small Vue 3 (v3.5) single-page app scaffolded for Vite and Vuetify. The goal of this guidance is to help AI coding agents make safe, effective edits with awareness of the project's structure, conventions, and developer workflows.

High-level architecture
- Frontend-only SPA using Vue 3 + Vue Router + Vuetify. Entry point: `src/main.js` (instantiates Vue, router, Vuetify).
- Routes are defined in `src/router/index.js` (uses `createWebHistory`). Add new pages there and keep import paths relative to `src/views`.
- Layouts: `src/components/layouts/DefaultLayout.vue` composes `src/components/common/Header.vue` and `Footer.vue` and exposes a default slot for page content.
- Components are organized under `src/components` with subfolders `common`, `icons`, and `layouts`. Use `@/` alias or relative imports (vite alias configured in `vite.config.js`).

Build & development workflows
- Install dependencies: `pnpm install` (project uses pnpm in README and lockfile).
- Run dev server: `pnpm dev` (runs `vite`). If the dev server fails, check Node engine defined in `package.json` (`node >=20.19.0 || >=22.12.0`).
- Build for production: `pnpm build` (runs `vite build`). Preview the production build: `pnpm preview`.

Project-specific conventions and patterns
- File alias: `@` -> `src` is configured in `vite.config.js`. Prefer `@/` for imports inside `src`.
- Single-file components (SFCs) are used throughout. Keep script blocks in standard `<script>` (no TypeScript present).
- Vuetify is registered globally in `src/main.js` using `createVuetify()`; components rely on Vuetify classes and the global `v-app` wrapper. When updating layout or global styles, check `src/assets/main.css`, `src/assets/base.css`, and `src/assets/main.css`.
- Scoped styles are used liberally; deep selectors use `:deep(...)` to adjust Vuetify internals (see `DefaultLayout.vue`). Respect existing CSS scoping—avoid removing `scoped` unless making a deliberate global change.

Code patterns & examples agents should follow
- Routing: Add new route objects to `src/router/index.js` and add the corresponding view in `src/views`. Example:

  {
    path: '/example',
    name: 'Example',
    component: () => import('@/views/Example.vue')
  }

- Layout usage: Pages wrap content with layout components via slots. Example (from `src/views/Home.vue`): ` <DefaultLayout> ... </DefaultLayout>`
- Component imports: Use the alias import `@/components/layouts/DefaultLayout.vue` in views or `../` relative imports inside the component tree.

Tests & CI
- There are currently no test scripts or CI workflow files in the repository. Do not add test infra without prior approval—prefer small, incremental additions.

Dependency & integration notes
- Core dependencies: `vue`, `vue-router`, `vuetify` (see `package.json`). Dev tooling: `vite`, `@vitejs/plugin-vue`, `vite-plugin-vuetify`.
- Devtools plugin `vite-plugin-vue-devtools` is enabled in `vite.config.js`—useful for local debugging only. Avoid enabling devtools in production code paths.

Safe edit rules for AI agents (project-specific)
- Don't change `package.json` engines or dependency versions without a clear reason and a corresponding test or explanation in the commit message.
- When adding imports inside `src`, prefer `@/` alias for clarity. Keep relative imports within a folder (e.g., `import NavBar from './NavBar.vue'`) when editing sibling components.
- Preserve `scoped` style blocks unless doing a global styling change; use `:deep()` to target Vuetify internals.
- When modifying layout structure, ensure `v-app` wraps the application root (see `DefaultLayout.vue`) so Vuetify theme and layout behaviors remain intact.
- If adding new routes, use dynamic imports for views to keep initial bundle size small (see code example above).

Files to inspect for context when making changes
- `src/main.js` — app bootstrap (router + vuetify registration)
- `vite.config.js` — alias and plugins
- `src/router/index.js` — routing structure
- `src/components/layouts/DefaultLayout.vue` — layout conventions and `:deep()` examples
- `src/components/common/Header.vue`, `Footer.vue`, `NavBar.vue` — common component import patterns
- `README.md` — developer commands and recommended environment (pnpm, Node engines)

When in doubt
- Run `pnpm dev` locally and reproduce the issue before making large changes. Keep changes minimal and targeted.
- Ask for clarification on adding tests, CI, TypeScript, or large dependency upgrades.

If you have feedback on missing details or want more examples (e.g., adding a new Vuetify component, or code-splitting routes), tell me what you'd like clarified.
