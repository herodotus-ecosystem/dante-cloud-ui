import { createApp } from 'vue';
import App from './App.vue';

import 'animate.css/animate.min.css';
import './static/styles/index.scss';

import HerodotusComponents from '@herodotus/components';

import { setupQuasar, setupStore, setupParticles, setupI18n, setupUploader } from '/@/plugins';
import { setupRouter } from './routers';

async function setupApp() {
  const app = createApp(App);

  setupI18n(app);

  // 注册全局 Quasar
  setupQuasar(app);

  setupParticles(app);

  setupUploader(app);

  // 注册状态管理
  setupStore(app);

  // 挂载路由
  await setupRouter(app);

  app.use(HerodotusComponents);

  app.mount('#app', true);
}

setupApp();
