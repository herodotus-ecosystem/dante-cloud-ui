import { createApp } from 'vue';
import App from './App.vue';

import 'animate.css/animate.min.css';

import { setupQuasar, setupStore, setupParticles, setupI18n } from '/@/plugins';
import { setupRouter } from './routers';

async function setupApp() {
	const app = createApp(App);

	setupI18n(app);

	// 注册全局 Quasar
	setupQuasar(app);

	setupParticles(app);

	// 注册状态管理
	setupStore(app);

	// 挂载路由
	await setupRouter(app);

	app.mount('#app', true);
}

setupApp();
