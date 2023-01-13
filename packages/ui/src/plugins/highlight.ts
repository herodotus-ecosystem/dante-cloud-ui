import type { App } from 'vue';

import 'highlight.js/styles/stackoverflow-dark.css';
import 'highlight.js/lib/common';
import HighlightJsVuePlugin from '@highlightjs/vue-plugin';

export const setupHighlight = (app: App<Element>) => {
  app.use(HighlightJsVuePlugin);
};
