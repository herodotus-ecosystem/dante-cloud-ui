import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { staticRoutes } from './logic';
import { createRouterGuard } from './guard';

const router = createRouter({
	history: createWebHashHistory(),
	routes: staticRoutes,
	scrollBehavior: () => ({ left: 0, top: 0 }),
});

export async function setupRouter(app: App) {
	app.use(router);
	createRouterGuard(router);
	await router.isReady();
}
