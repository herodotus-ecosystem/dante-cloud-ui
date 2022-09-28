import type { App } from 'vue';

import HDivider from './HDivider.vue';

HDivider.install = (app: App): void => {
  app.component(HDivider.name, HDivider);
};

export { HDivider };
