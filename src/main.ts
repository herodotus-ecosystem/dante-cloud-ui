import { createApp } from 'vue';
import App from './App.vue';

import 'animate.css/animate.min.css';

import { setupQuasar, setupStore, setupParticles, setupVeeValidator } from '/@/plugins';
import { setupRouter } from './routers';

async function setupApp() {
	const app = createApp(App);

	// 注册全局 Quasar
	setupQuasar(app);

	// 注册表单校验组件
	setupVeeValidator(app);

	// 注册状态管理
	setupStore(app);

	// 挂载路由
	await setupRouter(app);

	setupParticles(app);

	app.mount('#app', true);
}

setupApp();
