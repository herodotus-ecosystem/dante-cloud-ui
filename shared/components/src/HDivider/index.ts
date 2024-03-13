import type { App } from 'vue';

import HDivider from './HDivider.vue';

HDivider.install = (app: App): void => {
  app.component(HDivider.name as string, HDivider);
};

export { HDivider };
