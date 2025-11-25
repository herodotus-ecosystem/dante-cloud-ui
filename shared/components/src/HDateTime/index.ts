import type { App } from 'vue';

import HDateTime from './HDateTime.vue';
import HDuration from './HDuration.vue';

HDateTime.install = (app: App): void => {
  app.component(HDateTime.name as string, HDateTime);
};

HDuration.install = (app: App): void => {
  app.component(HDuration.name as string, HDuration);
};

export { HDateTime, HDuration };
