import type { App } from 'vue';

import HColumn from './HColumn.vue';
import HContainer from './HContainer.vue';
import HRow from './HRow.vue';

HColumn.install = (app: App): void => {
  app.component(HColumn.name as string, HColumn);
};

HContainer.install = (app: App): void => {
  app.component(HContainer.name as string, HContainer);
};

HRow.install = (app: App): void => {
  app.component(HRow.name as string, HRow);
};

export { HColumn, HContainer, HRow };
