import type { App } from 'vue';

import HRendererForm from './HRendererForm.vue';
import HRendererEngine from './HRendererEngine.vue';

HRendererForm.install = (app: App): void => {
  app.component(HRendererForm.name as string, HRendererForm);
};

HRendererEngine.install = (app: App): void => {
  app.component(HRendererEngine.name as string, HRendererEngine);
};

export { HRendererEngine, HRendererForm };
