# Changesets

This folder holds [changesets](https://github.com/changesets/changesets) — small
files describing changes that should go into the next release.

When you make a change that affects the published library, run:

```bash
yarn changeset
```

Pick the bump type (patch / minor / major) and write a short summary. Commit the
generated file with your PR. On merge to `main`, the release workflow opens a
"Version Packages" PR that bumps the version and updates the changelog; merging
that PR publishes to GitHub Packages.
