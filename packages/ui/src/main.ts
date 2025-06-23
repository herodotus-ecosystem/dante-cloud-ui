import { createApp } from 'vue';
import App from './App.vue';

import 'virtual:uno.css';

import 'animate.css/animate.min.css';
import './static/styles/index.scss';

import '@herodotus/components/dist/assets/style.css';
import '@herodotus/bpmn-designer/dist/assets/style.css';
import HerodotusComponents from '@herodotus/components';
import HerodotusBpmnDesigner from '@herodotus/bpmn-designer';

import DisableDevtool from 'disable-devtool';

import { setupStore, setupQuasar, setupI18n, setupHighlight, setupUploader } from '@/plugins';
import { setupRouter } from './routers';

if (typeof (window as any).global === 'undefined') {
  (window as any).global = window;
}

async function setupApp() {
  const app = createApp(App);

  setupI18n(app);

  // 注册全局 Quasar
  setupQuasar(app);

  // 注册状态管理
  setupStore(app);

  // 挂载路由
  await setupRouter(app);

  setupUploader(app);

  app.use(HerodotusComponents);
  app.use(HerodotusBpmnDesigner);

  setupHighlight(app);

  app.mount('#app', true);

  if (!import.meta.env.DEV) {
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

setupApp();
