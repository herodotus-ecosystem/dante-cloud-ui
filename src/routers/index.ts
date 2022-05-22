import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { staticRoutes } from './logic';
import { createRouteGuard } from './guard';

const router = createRouter({
	history: createWebHashHistory(),
	routes: staticRoutes,
	scrollBehavior: () => ({ left: 0, top: 0 }),
});

export const setupRouter = (app: App<Element>) => {
	createRouteGuard(router);
	app.use(router);
};

export default router;
