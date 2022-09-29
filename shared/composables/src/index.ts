import { HSignInBackground } from './HBackground';

import type { App } from 'vue';

const components = [HSignInBackground];

const install = (app: App) => {
  components.map(component => app.component(component.name, component));
};

export { HSignInBackground };

export default {
  install
};
