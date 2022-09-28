import type { App } from 'vue';

import HColumn from './HColumn.vue';
import HContainer from './HContainer.vue';
import HRow from './HRow.vue';

HColumn.install = (app: App): void => {
  app.component(HColumn.name, HColumn);
};

HContainer.install = (app: App): void => {
  app.component(HContainer.name, HContainer);
};

HRow.install = (app: App): void => {
  app.component(HRow.name, HRow);
};

export { HColumn, HContainer, HRow };
