import type { TestRunnerConfig } from '@storybook/test-runner';
import { getStoryContext } from '@storybook/test-runner';
import { checkA11y, configureAxe, injectAxe } from 'axe-playwright';

/**
 * Accessibility enforcement for `yarn test-storybook`.
 *
 * Every story is rendered in a real browser and scanned with axe. Stories that
 * set `parameters.a11y.test = 'off'` (or `disable`) are skipped. Violations fail
 * the run — combined with `a11y.test: 'error'` in preview.tsx, accessibility is a
 * hard gate rather than an advisory panel.
 */
const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page, context) {
    const storyContext = await getStoryContext(page, context);
    const a11y = storyContext.parameters?.a11y;
    if (a11y?.disable || a11y?.test === 'off') return;

    await configureAxe(page, { rules: a11y?.config?.rules });
    await checkA11y(page, '#storybook-root', { detailedReport: true });
  },
};

export default config;
