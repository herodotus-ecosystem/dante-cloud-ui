import type { App } from 'vue';

import { HSignInBackground } from './HBackground';

const components = [HSignInBackground];

const install = (app: App) => {
  components.map(component => app.component(component.name, component));
};

export { HSignInBackground };

export default {
  install
};
