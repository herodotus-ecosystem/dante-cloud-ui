import { Router, RouteLocationRaw, RouteLocationNormalizedLoaded } from 'vue-router';
import { OperationEnum, Tree } from '@herodotus-cloud/core';
export interface RouterOptions {
    instance: Router;
    path: {
        root: RouteLocationRaw;
        home: RouteLocationRaw;
        signIn: RouteLocationRaw;
    };
}
export interface Tab extends Pick<RouteLocationNormalizedLoaded, 'name' | 'path' | 'meta'> {
}
export interface PushParam {
    /**
     * 表格数据条目参数
     */
    item: string;
    /**
     * 额外参数
     */
    additional?: string;
    /**
     * 操作类型
     */
    operation?: OperationEnum;
}
export type RoutePushParam = Record<string, PushParam>;
export interface RemoteRouteMeta {
    title: string;
    icon: string;
    sort: number;
    isHaveChild?: boolean;
    isNotKeepAlive?: boolean;
    isHideAllChild?: boolean;
    isDetailContent?: boolean;
    isIgnoreAuth?: boolean;
}
export interface RemoteRoute extends Tree {
    componentName: string;
    componentPath: string;
    redirect: string;
    meta: RemoteRouteMeta;
    roles: Array<string>;
    children?: Array<RemoteRoute>;
}
export type ModuleNamespace = Record<string, any> & {
    [Symbol.toStringTag]: 'Module';
};
export interface MenuItem {
    title: string;
    prependIcon: string;
    to?: string;
    value?: string;
    children?: MenuItem[];
}
