import { createApp } from 'vue';
import App from './App.vue';

import 'animate.css/animate.min.css';
import './static/styles/index.scss';

import '@herodotus/plugins/dist/assets/style.css';
import '@herodotus/components/dist/assets/style.css';
import '@herodotus/bpmn-designer/dist/assets/style.css';
import '@herodotus/form-designer/dist/assets/style.css';
import HerodotusComponents from '@herodotus/components';
import HerodotusBpmnDesigner from '@herodotus/bpmn-designer';
import HerodotusFormDesigner from '@herodotus/form-designer';

import { setupStore, setupQuasar, setupI18n, setupHighlight } from '/@/plugins';
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

  app.use(HerodotusComponents);
  app.use(HerodotusBpmnDesigner);
  app.use(HerodotusFormDesigner);

  setupHighlight(app);

  app.mount('#app', true);
}

setupApp();
