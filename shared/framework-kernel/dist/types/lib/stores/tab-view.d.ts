import { RouteLocationNormalizedLoaded, RouteRecordName, RouteRecordNormalized } from 'vue-router';
import { Tab } from '../../declarations';
/**
 * TabView 目前完全基于 Quasar 的 QRouteTab 进行构建。
 * QRouteTab 可以和 VueRouter 完全融合。
 *
 * 但是有一个问题，就是在关闭最后一个 Tab 时，QRouteTab 会从新跳转到该 Tab 所在的地址，这样就导致自定义方法中的 router 跳转不起作用。
 * 为了解决这个问题，彻底将最后一个 Tab 锁定 (即不允许关闭)
 *
 * 思考下来发现这个逻辑也符合常理，因为界面上还是始终要留一个Tab才好。
 */
export declare const useTabsViewStore: import('pinia').StoreDefinition<"TabsView", {
    tabs: Array<Tab>;
    activatedTab: Tab;
    activatedTabName: RouteRecordName | null | undefined;
}, {
    isNotLastTab: (state: {
        tabs: {
            name: import('vue-router').RouteRecordNameGeneric;
            path: string;
            meta: import('vue-router').RouteMeta;
        }[];
        activatedTab: {
            name: import('vue-router').RouteRecordNameGeneric;
            path: string;
            meta: import('vue-router').RouteMeta;
        };
        activatedTabName: RouteRecordName | null | undefined;
    } & import('pinia').PiniaCustomStateProperties<{
        tabs: Array<Tab>;
        activatedTab: Tab;
        activatedTabName: RouteRecordName | null | undefined;
    }>) => (index: number) => boolean;
    getLastTabIndex: (state: {
        tabs: {
            name: import('vue-router').RouteRecordNameGeneric;
            path: string;
            meta: import('vue-router').RouteMeta;
        }[];
        activatedTab: {
            name: import('vue-router').RouteRecordNameGeneric;
            path: string;
            meta: import('vue-router').RouteMeta;
        };
        activatedTabName: RouteRecordName | null | undefined;
    } & import('pinia').PiniaCustomStateProperties<{
        tabs: Array<Tab>;
        activatedTab: Tab;
        activatedTabName: RouteRecordName | null | undefined;
    }>) => number;
    getTabIndex: (state: {
        tabs: {
            name: import('vue-router').RouteRecordNameGeneric;
            path: string;
            meta: import('vue-router').RouteMeta;
        }[];
        activatedTab: {
            name: import('vue-router').RouteRecordNameGeneric;
            path: string;
            meta: import('vue-router').RouteMeta;
        };
        activatedTabName: RouteRecordName | null | undefined;
    } & import('pinia').PiniaCustomStateProperties<{
        tabs: Array<Tab>;
        activatedTab: Tab;
        activatedTabName: RouteRecordName | null | undefined;
    }>) => (tab: Tab) => number;
    getActivatedTabIndex(): number;
    /**
     * 最后一个Tab是否为激活状态
     */
    isLastTabActivated(): boolean;
    isFirstTabActivated(): boolean;
    disableCloseCurrentTab(): boolean;
    disableCloseLeftTabs(): boolean;
    disableCloseRightTabs(): boolean;
    disableRefreshCurrentTab(): boolean;
}, {
    convertRouteToTab(route: RouteRecordNormalized | RouteLocationNormalizedLoaded): Tab;
    setActivatedTab(tab: Tab): void;
    isNotExistInStaticRoute(tab: Tab): boolean;
    isTabNotOpened(tab: Tab): boolean;
    openTab(tab: Tab, isDetail?: boolean): void;
    closeTab(tab: Tab): void;
    smartTab(route: RouteLocationNormalizedLoaded): void;
    deleteTab(route: RouteLocationNormalizedLoaded): void;
    closeCurrentTab(): void;
    closeOtherTabs(): void;
    closeLeftTabs(): void;
    closeRightTabs(): void;
}>;
