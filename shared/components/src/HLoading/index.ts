import type { App } from 'vue';

import HLoading from './HLoading.vue';

HLoading.install = (app: App): void => {
  app.component(HLoading.name as string, HLoading);
};

export { HLoading };
