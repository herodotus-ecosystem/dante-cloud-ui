import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import pinia from '../plugins/pinia';

import { router, SIGN_IN_PATH } from './Base';
import { useAuthenticationStore } from '../stores';
import { initFrontEndRoutes } from './FrontEndRoute';

initFrontEndRoutes();

const hasToken = (): boolean => {
	const store = useAuthenticationStore(pinia);
	const token = store.accessToken;
	if (token) {
		return true;
	} else {
		return false;
	}
};

// 路由加载前
router.beforeEach((to, from, next) => {
	NProgress.configure({ showSpinner: false });
	NProgress.start();

	console.log(router.getRoutes());

	const isAuth = hasToken();
	console.log('hastoken --', isAuth);

	if (to.path === SIGN_IN_PATH) {
		if (isAuth) {
			next('/home');
		} else {
			next();
		}
	} else {
		if (isAuth) {
			next();
		} else {
			next(SIGN_IN_PATH);
		}
	}
});

// 路由加载后
router.afterEach(() => {
	NProgress.done();
});

// 导出路由
export { router, pinia, initFrontEndRoutes };
