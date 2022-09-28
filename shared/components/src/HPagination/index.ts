import type { App } from 'vue';

import HPagination from './HPagination.vue';

HPagination.install = (app: App): void => {
  app.component(HPagination.name, HPagination);
};

export { HPagination };
