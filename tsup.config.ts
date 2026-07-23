import { defineConfig } from 'tsup';

/**
 * Library build.
 *
 * Each entry becomes its own importable module, so a consuming app can pull a
 * single component without the rest of the library:
 *
 *   dist/index.*   ->  @emzo/design-system
 *   dist/Button.*  ->  @emzo/design-system/Button
 *   dist/theme.*   ->  @emzo/design-system/theme
 *
 * Add a new component by adding its entry here and a matching subpath in the
 * package.json "exports" map.
 *
 * React, MUI and Emotion are marked external so they are NOT bundled — the
 * consuming app provides a single shared copy (see peerDependencies).
 */
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    Button: 'src/components/Button/index.ts',
    theme: 'src/theme/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: { tsconfig: 'tsconfig.build.json' },
  tsconfig: 'tsconfig.build.json',
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: true,
  external: ['react', 'react-dom', /^react\//, /^@mui\//, /^@emotion\//],
});
