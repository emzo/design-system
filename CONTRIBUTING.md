# Contributing

## Getting set up

```bash
yarn install
yarn storybook      # component workshop at http://localhost:6006
yarn tina:dev       # Storybook + the CMS editor for guidance pages
```

## The two kinds of change

**Design guidance** (the "why / when") lives in `content/guidance/*.mdx` and is
owned by the UI/UX team. The easiest way to edit it is through the CMS
(`yarn tina:dev`, then the admin at `/admin`), which writes the file for you — no
JSX or imports. You can also edit the Markdown directly.

**Components** (the "what / how") live in `src/components/`. Each component is a
folder with the implementation, its stories, and a barrel `index.ts`.

## Editing design tokens

Colour, spacing, radius and typography are defined once in `/tokens` (JSON). After
changing them, regenerate the artifacts and commit them:

```bash
yarn tokens:build   # -> src/theme/tokens.ts + styles/tokens.css
```

CI fails if the committed generated files are stale. The MUI theme, CSS variables,
component styling and the Storybook **Foundations** pages all read from these
tokens, so a value only ever needs changing in one place.

## Adding a component

1. Create `src/components/<Name>/` with `<Name>.tsx`, `<Name>.stories.ts`, and an
   `index.ts` that re-exports the public API.
2. Add an entry for it in `tsup.config.ts` so it becomes its own importable module.
3. Add a matching subpath to the `exports` map **and** the `typesVersions` map in
   `package.json`.
4. Export it from `src/index.ts` if it should also be reachable from the barrel.

## Before you open a PR

```bash
yarn lint            # oxlint
yarn typecheck       # tsc --noEmit
yarn format          # prettier --write (or check with format:check)
yarn build:lib       # produces dist/
yarn check:package   # publint + are-the-types-wrong
yarn test-storybook  # accessibility (axe) — needs a running/built Storybook
```

CI runs all of these on every PR (in the `check` and `a11y` jobs), and `main` is
protected — a PR must pass checks and be approved before it can merge. A live
Storybook preview is posted as a comment on each PR.

If your change affects the **published library**, add a changeset:

```bash
yarn changeset
```

Choose the bump type and write a one-line summary; commit the generated file with
your PR.

## Review & ownership

`.github/CODEOWNERS` routes reviews automatically: guidance changes go to the
design team, component changes to the dev team.

## Releases

Releases are automated with Changesets. When PRs carrying changesets land on
`main`, the release workflow opens a "Version Packages" PR. Merging that PR bumps
the version, updates `CHANGELOG.md`, and publishes to GitHub Packages.
