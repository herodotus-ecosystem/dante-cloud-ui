import type { App } from 'vue';

import HDynamicForms from './HDynamicForms.vue';

HDynamicForms.install = (app: App): void => {
  app.component(HDynamicForms.name as string, HDynamicForms);
};

export { HDynamicForms };
