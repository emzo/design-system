import { defineConfig } from 'tinacms';

/**
 * TinaCMS configuration.
 *
 * This models the CMS-editable guidance content that lives in `content/guidance`.
 * Designers edit these files through the Tina admin UI; every change becomes a
 * commit (and, via TinaCloud, a pull request) against the repo — so the repo
 * stays the single source of truth.
 *
 * The custom guidance blocks (WhenToUse, DoDont, etc.) are registered below as
 * rich-text *templates*. Tina resolves them from this schema, so editors never
 * write JSX or import statements — they insert a block from a menu and fill in
 * its content. Those same component names are rendered in Storybook by the thin
 * wrappers in src/design-docs (see Button.guidance.mdx).
 *
 * Local mode (`npm run tina:dev`) needs no credentials. The clientId/token below
 * are only used once you connect the repo to TinaCloud for the hosted,
 * designer-facing editor — see README.
 */

// Reusable "Do" / "Don't" blocks, also nestable inside a DoDont comparison.
const doTemplate = {
  name: 'Do',
  label: 'Do',
  fields: [{ name: 'children', label: 'Content', type: 'rich-text' as const }],
};

const dontTemplate = {
  name: 'Dont',
  label: "Don't",
  fields: [{ name: 'children', label: 'Content', type: 'rich-text' as const }],
};

export default defineConfig({
  // The branch Tina reads/writes. Locally this is ignored; on TinaCloud it is
  // the branch that edits are committed to.
  branch: process.env.TINA_BRANCH || process.env.GITHUB_BRANCH || 'main',

  // Populated from TinaCloud once you connect the repo (safe to leave blank for
  // local mode).
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,

  build: {
    outputFolder: 'admin', // -> public/admin, served by Storybook's staticDirs
    publicFolder: 'public',
  },

  media: {
    tina: {
      mediaRoot: 'uploads',
      publicFolder: 'public',
    },
  },

  schema: {
    collections: [
      {
        name: 'guidance',
        label: 'Design Guidance',
        path: 'content/guidance',
        format: 'mdx',
        fields: [
          {
            type: 'rich-text',
            name: 'body',
            label: 'Guidance',
            isBody: true,
            // The blocks designers can insert. Names must match the components
            // rendered in Storybook (src/design-docs/blocks/Guidance.tsx).
            templates: [
              {
                name: 'WhenToUse',
                label: 'When to use',
                fields: [{ name: 'children', label: 'Content', type: 'rich-text' }],
              },
              {
                name: 'WhenNotToUse',
                label: 'When not to use',
                fields: [{ name: 'children', label: 'Content', type: 'rich-text' }],
              },
              {
                name: 'DoDont',
                label: "Do / Don't comparison",
                fields: [
                  {
                    name: 'children',
                    label: 'Columns',
                    type: 'rich-text',
                    templates: [doTemplate, dontTemplate],
                  },
                ],
              },
              doTemplate,
              dontTemplate,
              {
                name: 'Note',
                label: 'Note / callout',
                fields: [
                  { name: 'title', label: 'Title', type: 'string' },
                  { name: 'children', label: 'Content', type: 'rich-text' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
