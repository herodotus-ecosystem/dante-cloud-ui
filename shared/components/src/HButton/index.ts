import type { App } from 'vue';

import HButton from './HButton.vue';
import HIconButton from './HIconButton.vue';
import HVisibilityButton from './HVisibilityButton.vue';

HButton.install = (app: App): void => {
  app.component(HButton.name, HButton);
};

HIconButton.install = (app: App): void => {
  app.component(HIconButton.name, HIconButton);
};

HVisibilityButton.install = (app: App): void => {
  app.component(HVisibilityButton.name, HVisibilityButton);
};

export { HButton, HIconButton, HVisibilityButton };
