import type { App } from 'vue';

import HDateTime from './HDateTime.vue';
import HDuration from './HDuration.vue';
import HIconSelect from './HIconSelect.vue';
import HSelect from './HSelect.vue';
import HSwitch from './HSwitch.vue';
import HTextField from './HTextField.vue';

HDateTime.install = (app: App): void => {
  app.component(HDateTime.name as string, HDateTime);
};

HDuration.install = (app: App): void => {
  app.component(HDuration.name as string, HDuration);
};

HIconSelect.install = (app: App): void => {
  app.component(HIconSelect.name as string, HIconSelect);
};

HSelect.install = (app: App): void => {
  app.component(HSelect.name as string, HSelect);
};

HSwitch.install = (app: App): void => {
  app.component(HSwitch.name as string, HSwitch);
};

HTextField.install = (app: App): void => {
  app.component(HTextField.name as string, HTextField);
};

export { HDateTime, HDuration, HSwitch, HTextField, HIconSelect, HSelect };
