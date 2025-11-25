import { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router';
import { RoutePushParam, PushParam } from '../../declarations';
export declare const useRouterStore: import('pinia').StoreDefinition<"Router", {
    appMenus: RouteRecordRaw[];
    personalMenus: RouteRecordRaw[];
    cachedRoutes: string[];
    details: Map<any, any>;
    pushParams: RoutePushParam;
}, {
    isDynamicRouteAdded(): boolean;
}, {
    /**
     * 查询三级路由组件
     * @param key 三级路由组件名称
     * @returns 组件名称
     */
    getDetailComponent(key: string): any;
    /**
     * 获取 Vue Router Push 类型参数
     * @param key 组件名称
     * @returns Push 类型参数
     */
    getRoutePushParam(key: string): PushParam | undefined;
    addMenus(app: RouteRecordRaw[], personal: RouteRecordRaw[]): void;
    /**
     * 将路由添加至缓存
     * @param route 路由
     */
    addCachedRoute(route: RouteLocationNormalizedLoaded): void;
    /**
     * 添加三级路由
     * @param item 路由条目
     */
    addDetailRoute(item: RouteRecordRaw): void;
    /**
     * 判断路由中是否包含 Push 路由
     * @param route 路由
     * @returns true 包含参数，false 不包含参数
     */
    hasParameter(route: RouteLocationNormalizedLoaded): boolean;
    /**
     * 判断是否为三级路由
     * @param route 路由
     * @returns true 是三级路由，false 不是三级路由
     */
    isDetailRoute(route: RouteLocationNormalizedLoaded): boolean;
    /**
     * 判断当前是否为有效的三级路由
     * @param route 路由
     * @returns true 是三级路由，false 不是三级路由
     */
    isValidDetailRoute(route: RouteLocationNormalizedLoaded): boolean;
    /**
     * 向当前缓存添加 Push 参数
     * @param name 参数名称
     * @param params 参数值
     */
    addRoutePushParam(name: string, params?: PushParam): void;
    /**
     * 从当前缓存中删除 Push 参数
     * @param name 参数名称
     */
    removeRoutePushParam(name: string): void;
}>;
