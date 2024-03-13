import type { App } from 'vue';

import HButton from './HButton.vue';
import HIconButton from './HIconButton.vue';
import HVisibilityButton from './HVisibilityButton.vue';

HButton.install = (app: App): void => {
  app.component(HButton.name as string, HButton);
};

HIconButton.install = (app: App): void => {
  app.component(HIconButton.name as string, HIconButton);
};

HVisibilityButton.install = (app: App): void => {
  app.component(HVisibilityButton.name as string, HVisibilityButton);
};

export { HButton, HIconButton, HVisibilityButton };
