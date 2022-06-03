export enum PathEnum {
	ROOT = '/',
	// 登录
	SIGN_IN = '/sign-in',
	// 首页
	HOME = '/dashboard',
	HOME_NAME = 'Dashboard',
	HOME_TITLE = '首页',
	// 错误
	NOT_FOUND = '/:path(.*)*',
	NOT_FOUND_NAME = 'PageNotFound',
}
