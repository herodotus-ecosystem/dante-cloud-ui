import type { App } from 'vue';

import HDateTime from './HDateTime.vue';
import HDuration from './HDuration.vue';
import HIconSelect from './HIconSelect.vue';
import HSelect from './HSelect.vue';
import HSwitch from './HSwitch.vue';
import HTextField from './HTextField.vue';

HDateTime.install = (app: App): void => {
  app.component(HDateTime.name, HDateTime);
};

HDuration.install = (app: App): void => {
  app.component(HDuration.name, HDuration);
};

HIconSelect.install = (app: App): void => {
  app.component(HIconSelect.name, HIconSelect);
};

HSelect.install = (app: App): void => {
  app.component(HSelect.name, HSelect);
};

HSwitch.install = (app: App): void => {
  app.component(HSwitch.name, HSwitch);
};

HTextField.install = (app: App): void => {
  app.component(HTextField.name, HTextField);
};

export { HDateTime, HDuration, HSwitch, HTextField, HIconSelect, HSelect };
