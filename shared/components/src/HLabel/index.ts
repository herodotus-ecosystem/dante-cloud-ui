import type { App } from 'vue';

import HLabel from './HLabel.vue';
import HCenterLabel from './HCenterLabel.vue';

HLabel.install = (app: App): void => {
  app.component(HLabel.name as string, HLabel);
};

HCenterLabel.install = (app: App): void => {
  app.component(HCenterLabel.name as string, HCenterLabel);
};

export { HLabel, HCenterLabel };
