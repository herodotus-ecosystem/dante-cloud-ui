import { Router, RouteLocationRaw, RouteLocationNormalizedLoaded, NavigationFailure } from 'vue-router';
import { RouterOptions } from '../../declarations';
export declare class RouterUtilities {
    private static _instance;
    private static _initialized;
    private options;
    private router;
    private constructor();
    /**
     * 初始化单例（仅允许一次）
     * @param {RouterOptions} options 配置选项
     * @returns {RouterUtilities} 单例实例
     */
    static initialize(options: RouterOptions): RouterUtilities;
    /**
     * 获取单例实例
     * @returns {RouterUtilities} 单例实例
     */
    static getInstance(): RouterUtilities;
    setRouter(router: Router): void;
    getRouter(): Router;
    private isRouterExist;
    hasParameter(route: RouteLocationNormalizedLoaded): boolean;
    /**
     * 判断是否为三级路由页面
     * @param route 当前路由 {@link RouteLocationNormalizedLoaded}
     * @returns true 是三级路由，false 不是三级路由
     */
    isDetailRoute(route: RouteLocationNormalizedLoaded): boolean;
    isValidDetailRoute(route: RouteLocationNormalizedLoaded): boolean;
    push(to: RouteLocationRaw): Promise<void | NavigationFailure | undefined>;
    replace(to: RouteLocationRaw): Promise<void | NavigationFailure | undefined>;
    /**
     * 路由跳转
     * @param to - 需要跳转的路由
     * @param isNewTab - 是否在新的浏览器Tab标签打开
     */
    to(to: RouteLocationRaw, isPush?: boolean): void;
    /**
     * 打开新页面
     * @param to 需要跳转的路由
     */
    open(to: RouteLocationRaw): void;
    /**
     * 返回上一级路由
     *
     */
    goBack(): void;
    refresh(): void;
    toRoot(): void;
    /**
     * 跳转首页
     */
    toHome(): void;
    toSignIn(): void;
    private getParent;
    toPrev(route: RouteLocationNormalizedLoaded): void;
}
