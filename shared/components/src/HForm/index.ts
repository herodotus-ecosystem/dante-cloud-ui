import type { App } from 'vue';

import HSwitch from './HSwitch.vue';
import HTextField from './HTextField.vue';

HSwitch.install = (app: App): void => {
  app.component(HSwitch.name, HSwitch);
};

HTextField.install = (app: App): void => {
  app.component(HTextField.name, HTextField);
};

export { HSwitch, HTextField };
