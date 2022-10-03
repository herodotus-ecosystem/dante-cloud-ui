import type { App } from 'vue';

import HIconSelect from './HIconSelect.vue';
import HSelect from './HSelect.vue';

HIconSelect.install = (app: App): void => {
  app.component(HIconSelect.name, HIconSelect);
};

HSelect.install = (app: App): void => {
  app.component(HSelect.name, HSelect);
};

export { HIconSelect, HSelect };
