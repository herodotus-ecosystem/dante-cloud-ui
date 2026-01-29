import { createApp } from 'vue';
import App from './App.vue';

import 'virtual:uno.css';

import 'animate.css/animate.min.css';

import './static/styles/index.scss';

import '@herodotus-cloud/components/style.css';
import '@herodotus-cloud/bpmn-designer/style.css';
import '@herodotus-cloud/form-designer/style.css';

import HerodotusBpmnDesigner from '@herodotus-cloud/bpmn-designer';
import HerodotusFormDesigner from '@herodotus-cloud/form-designer';
import HerodotusFormEngine from '@herodotus-cloud/form-engine';

import DisableDevtool from 'disable-devtool';

import { setupStore, setupQuasar, setupI18n, setupUploader } from '@/plugins';
import { setupRouter } from './routers';

import { CONSTANTS, VARIABLES } from '@/configurations';

if (typeof (window as any).global === 'undefined') {
  (window as any).global = window;
}

async function setupApp() {
  const view = document.createElement('div');
  document.body.appendChild(view);

  const app = createApp(App);

  setupI18n(app);

  // 注册全局 Quasar
  setupQuasar(app);

  // 注册状态管理
  setupStore(app);

  // 挂载路由
  await setupRouter(app);

  setupUploader(app);

  app.use(HerodotusBpmnDesigner);
  app.use(HerodotusFormDesigner);
  app.use(HerodotusFormEngine);

  app.mount('#app', true);

  if (!CONSTANTS.IS_DEV) {
    if (VARIABLES.getUseDisableDevtool()) {
      const url =
        import.meta.env.VITE_BASE_PATH === '/'
          ? '/static/forbidden.html'
          : import.meta.env.VITE_BASE_PATH + 'static/forbidden.html';

      DisableDevtool({
        url: url,
        timeOutUrl: url,
        disableMenu: true,
      });
    }
  }
}

setupApp();
