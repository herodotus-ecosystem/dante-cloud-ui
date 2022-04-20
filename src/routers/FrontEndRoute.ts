import { appendRoute } from './Base';

/**
 * 前端控制路由：初始化方法，防止刷新时路由丢失
 */
export const initFrontEndRoutes = async () => {
	// 界面 loading 动画开始执行
	// if (window.nextLoading === undefined) {
	// 	NextLoading.start();
	// }
	// 添加动态路由
	await appendRoute();
};
