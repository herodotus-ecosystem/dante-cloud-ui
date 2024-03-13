import type { App } from 'vue';

import HSignInBackground from './HSignInBackground.vue';

HSignInBackground.install = (app: App): void => {
  app.component(HSignInBackground.name as string, HSignInBackground);
};

export { HSignInBackground };
