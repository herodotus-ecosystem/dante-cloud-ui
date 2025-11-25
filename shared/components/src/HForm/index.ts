import type { App } from 'vue';

import HIconSelect from './HIconSelect.vue';
import HSelect from './HSelect.vue';
import HSwitch from './HSwitch.vue';
import HFieldLabel from './HFieldLabel.vue';
import HTextField from './HTextField.vue';
import HTreeField from './HTreeField.vue';
import HLabel from './HLabel.vue';
import HCenterLabel from './HCenterLabel.vue';

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

HFieldLabel.install = (app: App): void => {
  app.component(HFieldLabel.name as string, HFieldLabel);
};

HTreeField.install = (app: App): void => {
  app.component(HTreeField.name as string, HTreeField);
};

HLabel.install = (app: App): void => {
  app.component(HLabel.name as string, HLabel);
};

HCenterLabel.install = (app: App): void => {
  app.component(HCenterLabel.name as string, HCenterLabel);
};

export { HSwitch, HTextField, HIconSelect, HSelect, HFieldLabel, HTreeField, HLabel, HCenterLabel };
