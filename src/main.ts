import { createApp } from 'vue';
import App from './App.vue';

import { setupQuasar, setupStore } from '/@/plugins';
import { setupRouter } from './routers';

async function setupApp() {
	const app = createApp(App);

	// 注册全局 Quasar
	setupQuasar(app);

	// 注册状态管理
	setupStore(app);

	// 挂载路由
	await setupRouter(app);

	app.mount('#app', true);
}

setupApp();
