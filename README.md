# Design System — Storybook prototype

A working prototype of a single-source-of-truth design system where **design
intent** and **implementation** both live in one repo and are published from one
Storybook, with:

- **GitHub Pages** hosting the built Storybook, deployed automatically on merge to `main`.
- **Protected `main`** — every change goes through a pull request.
- **Per-PR previews** — each PR publishes its own Storybook to a subpath so
  reviewers (including designers) can see the change rendered before it merges.
- **TinaCMS** — a friendly, MDX-native editor so the UI/UX team can write and edit
  design guidance without a developer's toolchain, with every edit becoming a
  commit / pull request.
- **Publishable component library** — the same components are built into an
  installable package on **GitHub Packages**, with per-component imports so apps
  only pull what they use.

The sample component (`Button`) is built on **Material UI v5** to mirror the real
component stack.

---

## The core idea: two kinds of MDX, kept apart

Storybook uses MDX for two very different things, and this repo keeps them
separate on purpose:

|          | Design intent (the "why / when")                      | Implementation (the "what / how")   |
| -------- | ----------------------------------------------------- | ----------------------------------- |
| Lives in | `content/guidance/*.mdx`                              | `src/components/*.stories.ts(x)`    |
| Owned by | UI/UX team (via the CMS)                              | Developers                          |
| Contains | Purpose, when to use / not use, do & don't, behaviour | Live component, variants, props/API |
| Sidebar  | **Design Guidance**                                   | **Components**                      |

`content/guidance/*.mdx` files are deliberately **clean**: no `import` statements,
no `<Meta>` — just prose and guidance blocks. That is what makes them safe and
comfortable for a CMS to edit. Thin developer-owned wrappers in
`src/design-docs/*.mdx` add the Storybook `<Meta>` (sidebar placement) and inject
the guidance components, then render the content file:

```
content/guidance/button.mdx           <- designers edit this (clean MDX)
        │  rendered by
        ▼
src/design-docs/Button.guidance.mdx   <- developer wrapper (<Meta/> + component injection)
```

This is why a CMS can own the guidance without ever touching Storybook's
scaffolding or the component code.

---

## Repo structure

```
.github/
  workflows/
    ci.yml              # lint/typecheck/format/build/package + a11y jobs (PR gate)
    deploy.yml          # build + publish Storybook to gh-pages on push to main
    preview.yml         # build + publish per-PR preview, clean up on close
    release.yml         # Changesets: version PR + publish to GitHub Packages
  CODEOWNERS            # routes review: design team vs dev team
  dependabot.yml        # weekly npm + github-actions updates (grouped)
  pull_request_template.md
.changeset/             # Changesets config + pending release notes
tokens/                 # design token SOURCES (color, size, typography) — edit here
scripts/build-tokens.mjs # Style Dictionary build (tokens -> tokens.ts + tokens.css)
styles/tokens.css        # GENERATED CSS custom properties (published)
content/guidance/       # CMS-editable design guidance (clean MDX) — designers edit here
  button.mdx
  introduction.mdx
src/
  index.ts              # library entry (barrel) — the public API
  components/           # component implementation (developer-owned) + co-located stories
    Button/
      Button.tsx        # sample component, built on Material UI v5
      Button.stories.ts
      index.ts          # per-component entry -> @emzo/design-system/Button
  theme/
    index.ts            # MUI theme built from tokens -> @emzo/design-system/theme
    tokens.ts           # GENERATED typed token object (consumed by the theme)
  foundations/          # tokens rendered as living docs (Colours/Spacing/Radius/Typography)
  design-docs/          # developer-owned wrappers + guidance block components
    Button.guidance.mdx
    Introduction.mdx
    blocks/Guidance.tsx # <WhenToUse>, <WhenNotToUse>, <DoDont>, <Do>, <Dont>, <Note>
.storybook/             # Storybook config (theme provider, theme toggle, a11y test-runner)
tina/config.ts          # TinaCMS schema (guidance collection + block templates)
tsup.config.ts          # library build (per-component entry points)
CONTRIBUTING.md         # how to add a component, the PR flow, releases
```

---

## Requirements & platform setup

The stack is standard Node tooling, so it runs on macOS, Linux and Windows. Only
the local dev machine differs — **CI, Pages, previews and releases all run on
GitHub's Linux runners**, so the automation is identical for everyone.

**Common to every OS**

- **Node.js ≥ 22** (an `.nvmrc` pins 22 — `nvm install 22 && nvm use` picks it up)
- **Yarn** (Classic 1.x or Berry 3/4 — see the Berry note under Local development)
- **Git**, and a **GitHub account** for the repo
- A **C/C++ build toolchain**, because TinaCMS compiles a native module
  (`better-sqlite3`) on install. Per-OS instructions below.

**macOS**

```bash
xcode-select --install   # C++ toolchain (Python 3 is already present)
```

Install Node via `nvm` or `brew install node@22`.

**Linux (Debian/Ubuntu)**

```bash
sudo apt update && sudo apt install -y build-essential python3
```

This is the same environment CI uses, so it's the smoothest path. (Other distros:
install the equivalent gcc/g++/make + Python 3 packages.)

**Windows**

The recommended path is **WSL2 (Ubuntu)** — then follow the Linux instructions
above and everything behaves exactly as it does in CI. It sidesteps the three
things that make native Windows fiddlier:

1. **Native builds** need the Visual Studio **Build Tools** ("Desktop development
   with C++" workload) plus Python 3.
2. **Line endings** — Git for Windows tends to check out CRLF, which fails
   Prettier's `format:check`. The committed `.gitattributes` forces LF, but also
   run `git config core.autocrlf false` to be safe.
3. **Shell** — use **Git Bash** (or WSL); the `&&` chains and `sed` commands in
   this README assume a Unix shell, not `cmd.exe`/PowerShell.

The `package.json` scripts themselves are all Node-based (no `rm`/`cp` shelling
out), so once the environment is set up the tooling is fully cross-platform.

---

## Local development

This project uses **Yarn**. Your first `yarn install` generates `yarn.lock` —
commit it (the setup step below picks it up).

```bash
yarn install           # first run builds a native module for TinaCMS; needs a
                       # normal dev machine with build tools + network access
yarn storybook         # Storybook only, at http://localhost:6006
yarn tina:dev          # Storybook + TinaCMS local editor (no credentials needed)
```

With `yarn tina:dev`, the Tina admin is served at
**http://localhost:6006/admin/index.html**. Editing a guidance page there writes
straight to the `content/guidance/*.mdx` file on disk — the same experience a
designer gets, minus the login. This is the quickest way to see the CMS working.

> **Yarn Berry (v3/v4)?** Add a `.yarnrc.yml` with `nodeLinker: node-modules`
> before installing. The default Plug'n'Play mode doesn't play nicely with
> Storybook and the native TinaCMS dependency, so the node-modules linker avoids a
> class of install/runtime errors. Yarn Classic (1.x) needs nothing extra.

---

## One-time setup on GitHub

### 1. Create the repo and push

```bash
git init
git add .
git commit -m "Design system Storybook prototype"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

### 2. Allow Actions to publish

Settings → **Actions** → **General** → _Workflow permissions_ → enable
**Read and write permissions**. (The workflows also request this per-run, but the
repo-level switch avoids surprises.)

The first push to `main` runs **deploy.yml**, which builds Storybook and creates
the `gh-pages` branch.

### 3. Turn on GitHub Pages

Settings → **Pages** → _Build and deployment_ → Source: **Deploy from a branch** →
Branch: **`gh-pages`** / **`/ (root)`** → Save.

Your Storybook will be live at `https://<you>.github.io/<repo>/`.

> Note: on any plan below GitHub Enterprise Cloud this site is **public**, even
> though the repo can be private. That's fine for this prototype — just don't put
> anything confidential in it.

### 4. Protect `main`

Settings → **Branches** → _Add branch ruleset_ (or classic _Branch protection
rule_) targeting `main`:

- Require a pull request before merging
- Require approvals (1) — optional, see note below
- Require review from Code Owners — activates `.github/CODEOWNERS`
- Require status checks to pass — add the CI jobs **`check`** and **`a11y`** so
  lint, typecheck, format, package validation and accessibility must pass before
  merge

> Solo-repo caveat: GitHub won't let you approve your own pull request. To exercise
> the _approval_ step, either add a second account as a collaborator/reviewer, or
> set required approvals to 0 for the prototype (the PR-before-merge rule still
> forces the PR workflow).

---

## How PR previews work

`preview.yml` runs on every PR. It builds Storybook and uses
[`rossjrw/pr-preview-action`](https://github.com/rossjrw/pr-preview-action) to
publish that build to a subpath of the Pages site:

```
https://<you>.github.io/<repo>/pr-preview/pr-<number>/
```

The action posts (and keeps updated) a comment on the PR with the preview link,
and removes the preview when the PR is closed. The production deploy
(`deploy.yml`) uses `clean-exclude: pr-preview` so publishing `main` never wipes
open previews. Both workflows publish to the **same `gh-pages` branch** — that's
required for the two to coexist.

The designer workflow end to end: edit a guidance page in Tina → Tina opens a PR →
preview builds → they open the preview link and check it reads correctly → a
developer reviews and merges → the live Storybook updates.

---

## TinaCMS: from local mode to the designer-facing editor

**Local mode** (`yarn tina:dev`) needs no accounts and edits files directly —
use it to demo the editing experience.

**Hosted, designer-facing editing** uses TinaCloud (free tier) to handle login and
to turn edits into commits/PRs. You have to do this part because it connects to
your GitHub account:

1. Sign in at [app.tina.io](https://app.tina.io) and create a project pointing at
   this GitHub repo.
2. Copy the **Client ID** and a **read/write token** into repo secrets / a local
   `.env`:
   ```
   NEXT_PUBLIC_TINA_CLIENT_ID=...
   TINA_TOKEN=...
   ```
   `tina/config.ts` already reads these.
3. Build the admin (`yarn tina:build`) and publish it with Storybook (it lands
   in `public/admin`, which Storybook already serves). Designers then visit
   `…github.io/<repo>/admin/`, log in, edit a guidance page, and Tina raises a PR.

The guidance blocks (`WhenToUse`, `WhenNotToUse`, `DoDont`, `Do`, `Dont`, `Note`)
are registered as Tina **templates** in `tina/config.ts`, so editors insert them
from a menu and fill in the content — no JSX, no imports.

---

## Using the components in your apps (the library)

Storybook documents the components; it doesn't ship them. The same source is built
into an installable package and published to **GitHub Packages**, so apps consume
the components with a normal `import`.

### How it's built

`tsup` (see `tsup.config.ts`) builds each component as its **own entry point**, so
consumers can import a single component without pulling the whole library:

```
src/index.ts                 ->  @emzo/design-system          (whole library, tree-shaken)
src/components/Button/       ->  @emzo/design-system/Button    (just the Button)
src/theme/                   ->  @emzo/design-system/theme     (the MUI theme)
```

React, MUI and Emotion are **peer dependencies** — they're marked external and not
bundled, so the app provides one shared copy (this is what keeps MUI theming and
Emotion styling working correctly).

Add a new component in three steps: create it under `src/components/<Name>/` with
an `index.ts`, add an entry in `tsup.config.ts`, and add a matching subpath to the
`exports` map in `package.json`.

### Consuming an individual component

```ts
// Pulls only the Button (and its MUI Button dependency) — not the rest of the library
import { Button } from '@emzo/design-system/Button';
import { theme } from '@emzo/design-system/theme';

// Or from the barrel; a modern bundler tree-shakes the unused parts:
import { Button } from '@emzo/design-system';
```

**TypeScript support:** modern TS (5.x, `moduleResolution: "bundler"` or `"node16"`)
resolves the subpath types via the `exports` map. For older consumers on TS < 5.0
using classic `"node"` resolution (which ignores `exports` for types), a
`typesVersions` map in `package.json` redirects the subpaths so the types still
resolve — no change needed in the consuming app. Runtime resolution (Rspack,
webpack, Vite) is unaffected either way.

Consuming apps need a one-line `.npmrc` so the scope resolves to GitHub Packages,
plus a token with `read:packages`:

```
@emzo:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then `yarn add @emzo/design-system` and wrap the app in the shared theme:

```tsx
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@emzo/design-system/theme';

<ThemeProvider theme={theme}>{/* app */}</ThemeProvider>;
```

### Publishing (Changesets → GitHub Packages)

Releases are automated with [Changesets](https://github.com/changesets/changesets),
so versioning and the changelog follow the same reviewed-PR flow as everything else:

1. In a PR that changes the library, run `yarn changeset`, pick the bump type
   (patch/minor/major) and write a one-line summary; commit the generated file.
2. When that PR merges to `main`, `.github/workflows/release.yml` opens a
   **"Version Packages"** PR that bumps the version and updates `CHANGELOG.md`.
3. Merging the Version Packages PR publishes to GitHub Packages using the repo's
   built-in `GITHUB_TOKEN` — no extra secrets.

> Replace **`@emzo`** everywhere (`package.json` name + `publishConfig`,
> `.npmrc`, the `scope` in `release.yml`, and the team handles in `CODEOWNERS`)
> with your GitHub org/username in lowercase — GitHub Packages requires the scope
> to match the repo owner.

To build the library locally: `yarn build:lib` (output in `dist/`). To validate the
package before publishing: `yarn check:package` (publint + are-the-types-wrong).

---

## Design tokens

Design tokens are the single source of truth for colour, spacing, radius and
typography. They live as JSON in **`/tokens`**, and
[Style Dictionary](https://styledictionary.com) (`yarn tokens:build`) generates two
artifacts from them:

- **`src/theme/tokens.ts`** — a typed nested object that the MUI theme is built
  from (`src/theme/index.ts`). Also exported as `tokens` from
  `@emzo/design-system/theme` and `@emzo/design-system`.
- **`styles/tokens.css`** — CSS custom properties (`--color-primary-main`, …) for
  any consumer that wants the raw values without MUI, via
  `import '@emzo/design-system/tokens.css'`.

So a colour is defined once and flows into the theme, the CSS variables, the
component styling, and the Storybook **Foundations** pages. To change a value, edit
the JSON in `/tokens`, run `yarn tokens:build`, and commit the regenerated files —
CI fails if they're stale. The generated files are Prettier-ignored (Style
Dictionary owns their format).

Storybook renders every story inside the generated theme (via a `ThemeProvider`
decorator in `.storybook/preview.tsx`) with a **Light/Dark toolbar toggle**, so the
workshop shows components exactly as consuming apps will.

---

## Automation & quality checks

Every pull request runs the **CI** workflow (`.github/workflows/ci.yml`), which is
the gate that keeps `main` healthy. The **`check`** job runs:

| Step             | Command              | What it checks                                                                        |
| ---------------- | -------------------- | ------------------------------------------------------------------------------------- |
| Tokens fresh     | `yarn tokens:build`  | the committed `tokens.ts`/`tokens.css` match the token sources (fails if stale)       |
| Lint             | `yarn lint`          | oxlint rules                                                                          |
| Format           | `yarn format:check`  | Prettier formatting (config in `.prettierrc`)                                         |
| Typecheck        | `yarn typecheck`     | `tsc --noEmit` — real type errors, which the bundler skips                            |
| Build            | `yarn build:lib`     | the library compiles                                                                  |
| Validate package | `yarn check:package` | `publint` + `are-the-types-wrong` — exports/types correct across all resolution modes |

A second **`a11y`** job builds Storybook and runs `@storybook/test-runner` with axe
(`.storybook/test-runner.ts`) against every story in a real browser. With
`a11y.test: 'error'` set in `preview.tsx`, accessibility violations **fail the
build** — a11y is a hard gate, not just an advisory panel. (This job installs a
Playwright browser, so it's a little heavier than `check`.)

Add both jobs (`check` and `a11y`) as **required status checks** on `main` so a
failing PR can't merge. Combined with **CODEOWNERS** (`.github/CODEOWNERS`, which
routes review to the design vs dev team) and "Require review from Code Owners",
this is the full merge gate.

**Dependabot** (`.github/dependabot.yml`) opens weekly update PRs for two
ecosystems — your npm dependencies and the GitHub Actions used in the workflows.
Minor and patch bumps are grouped into a single PR to limit noise, and the shared
peer majors (MUI, React, Emotion) are deliberately **ignored** so they're only ever
upgraded in lockstep with the app (see the upgrade notes below). Each Dependabot PR
flows through CI and gets its own Storybook preview, so you can see whether a bump
breaks anything before merging.

**Releases** are automated with Changesets — see
[Publishing](#publishing-changesets--github-packages) above. Contributor-facing
docs (adding a component, the PR flow, releases) live in `CONTRIBUTING.md`.

---

## Upgrading dependencies in 345-CMS (VQ) — and what it means here

The design system shares React, MUI, Emotion and the TypeScript toolchain with the
consuming app (they're peer dependencies), so a few upgrades on the 345-CMS side are
worth planning. For each, "In 345-CMS" is the app-side change; "In this project" is
what — if anything — the design system needs.

### TypeScript (currently 4.6.4 → 5.x)

345-CMS is on TS 4.6, which only has classic `"node"` module resolution — it can't
read the package `exports` map for types, which is why this library ships a
`typesVersions` shim so the per-component subpath imports still resolve.

- **In 345-CMS:** bump `typescript` to `^5.x` and set
  `compilerOptions.moduleResolution` to `"bundler"` (the natural choice with
  Rsbuild) or `"node16"`. Expect to fix some new type errors — TS majors tighten
  inference and update `lib` typings — but nothing design-system-specific.
- **In this project:** nothing required. Once 345-CMS is on TS 5.x it resolves the
  subpath types directly via the `exports` map; the `typesVersions` shim simply
  becomes redundant _for that app_. Leave it in place — it's harmless to modern TS
  and still helps any other consumer stuck on an older toolchain.

### @types/react and @types/react-dom (currently v17 → v18)

The app runs React 18 but still has the v17 type packages — a latent mismatch,
independent of the design system.

- **In 345-CMS:** set both `@types/react` and `@types/react-dom` to `^18` to match
  the React 18 runtime. Watch for the usual v18-types fallout — `children` is no
  longer implicit on `React.FC`, and a few event/ref types tightened — but these
  are app-side.
- **In this project:** nothing required. The library's declarations import from
  `react` and resolve against whatever `@types/react` the app provides; v18 is
  clean, and the `react: >=18` peer range already expects it.

### MUI (currently pinned to 5.0.6)

MUI is a **shared singleton peer dependency** — the design-system components render
against the app's installed MUI, not the version this repo was built with. So the
app is effectively the source of truth for the MUI version, and the two must stay
on a compatible major.

- **Bumping within MUI 5.x** (5.0.6 → latest 5.x):
  - **In 345-CMS:** bump `@mui/material`, `@mui/system`, `@mui/icons-material`,
    `@mui/lab` and `@mui/x-date-pickers` together, and remove the stale
    `resolutions` entry `"@mui/core": "5.0.0-alpha.53"` — it pins an ancient
    pre-split package and shouldn't survive an upgrade.
  - **In this project:** no change needed — `peerDependencies` already allows
    `^5`. The upside is that design-system components can then safely use MUI APIs
    added after 5.0.6.
- **Bumping to a MUI major (v6/v7):**
  - **In 345-CMS:** follow MUI's migration guide / codemods; the peer stays on
    Emotion (MUI still uses Emotion by default — Pigment CSS is opt-in).
  - **In this project:** widen `peerDependencies["@mui/material"]` (e.g.
    `"^5 || ^6"`), bump this repo's own dev `@mui/material` to match, re-test and
    rebuild the components against any breaking API changes, then republish. Do
    this in lockstep with the app so the shared MUI major never diverges.

> Rule of thumb: patch/minor MUI bumps are transparent to the design system; a MUI
> **major** bump is a coordinated change across both repos, because they share one
> MUI instance at runtime.

---

## What was verified vs. what needs your machine

Built and verified in a sandbox:

- Storybook builds cleanly (`yarn build-storybook`), including the MUI Button,
  the guidance blocks, and the content-injection wrappers.
- The library build (`yarn build:lib`) produces per-component ESM + CJS bundles
  and type declarations (`dist/Button.*`, `dist/theme.*`, `dist/index.*`), with
  MUI/React correctly externalised rather than bundled.
- Tokens generate (`yarn tokens:build`) into `src/theme/tokens.ts` and
  `styles/tokens.css`, the theme builds from them, and the Foundations stories and
  themed decorator render in the Storybook build.
- The quality gates all pass: `yarn lint` (oxlint), `yarn typecheck`,
  `yarn format:check` (Prettier), and `yarn check:package` — publint reports
  "All good!" and are-the-types-wrong is 🟢 across every resolution mode
  (node10, node16 CJS/ESM, bundler) for the barrel and both subpaths.
- All workflow YAML files are valid; deploy and preview share `gh-pages` correctly.

Needs your environment to complete (couldn't run in the sandbox):

- `yarn install` of TinaCMS — it compiles a native module (`better-sqlite3`) that
  needs Node build headers the sandbox couldn't download. It installs normally on a
  dev machine and on GitHub's runners.
- The live TinaCloud connection (step above) — needs your GitHub login.
- The **`a11y`** CI job — it drives a real Playwright browser, which the sandbox
  couldn't download. It's wired per the standard test-runner + axe recipe and runs
  on GitHub's runners (and locally with `yarn test-storybook`).
