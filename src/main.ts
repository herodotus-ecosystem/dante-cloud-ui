import { createApp } from 'vue';
import App from './App.vue';

import 'virtual:windi.css';

import { setupQuasar, setupStore, setupParticles } from '/@/plugins';
import { setupRouter } from './routers';

async function setupApp() {
	const app = createApp(App);

	// 注册全局 Quasar
	setupQuasar(app);

	// 注册状态管理
	setupStore(app);

	// 挂载路由
	await setupRouter(app);

	setupParticles(app);

	app.mount('#app', true);
}

setupApp();
