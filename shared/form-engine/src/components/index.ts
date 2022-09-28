import type { App } from 'vue';

import HRendererForm from './HRendererForm.vue';
import HRendererEngine from './HRendererEngine.vue';

HRendererForm.install = (app: App): void => {
  app.component(HRendererForm.name, HRendererForm);
};

HRendererEngine.install = (app: App): void => {
  app.component(HRendererEngine.name, HRendererEngine);
};

export { HRendererEngine, HRendererForm };
