export type ConstantDictionary = {
	key: string;
	text: string;
	value: number;
};

export enum Path {
	// 登录
	SIGN_IN = '/sign-in',
	// 首页
	HOME = '/dashboard',
	// 错误
	ERROR = '/:path(.*)*',
}
