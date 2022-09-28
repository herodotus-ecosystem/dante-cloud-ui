import type { App } from 'vue';

import HLabel from './HLabel.vue';

HLabel.install = (app: App): void => {
  app.component(HLabel.name, HLabel);
};

export { HLabel };
