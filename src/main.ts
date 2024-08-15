import { createApp } from 'vue';

import 'animate.css';
import App from './App.vue';
import { setupVuetifyAndI18n, setupFontLoader, setupStore, setupParticles, setupVeeValidator } from './plugins';
import router, { setupRouter } from './routers';

async function bootstrap() {
	const app = createApp(App);

	// Vuetify 标准工程中引入的字体加载
	setupFontLoader();

	// 注册全局 Vuetify 和 i18n
	setupVuetifyAndI18n(app);

	// 注册表单校验组件
	// setupVeeValidator(app);

	// 注册状态管理
	setupStore(app);

	// 挂载路由
	await setupRouter(app);

	// 路由准备就绪后挂载APP实例
	await router.isReady();

	setupParticles(app);

	app.mount('#app', true);
}

bootstrap();
