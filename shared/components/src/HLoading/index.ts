import type { App } from 'vue';

import HLoading from './HLoading.vue';

HLoading.install = (app: App): void => {
  app.component(HLoading.name, HLoading);
};

export { HLoading };
