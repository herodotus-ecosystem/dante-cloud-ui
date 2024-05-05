import type { App } from 'vue';

import HParticles from './HParticles.vue';

HParticles.install = (app: App): void => {
  app.component(HParticles.name as string, HParticles);
};

export { HParticles };
