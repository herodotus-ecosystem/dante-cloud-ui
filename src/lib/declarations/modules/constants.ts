export type ConstantDictionary = {
	key: string;
	text: string;
	value: number;
};

export enum Path {
	ROOT = '/',
	// 登录
	SIGN_IN = '/sign-in',
	// 首页
	HOME = '/dashboard',
	HOME_NAME = 'Dashboard',
	HOME_TITLE = '首页',
	// 错误
	ERROR = '/:path(.*)*',
}
