import type { RouteRecordRaw, RouteMeta } from 'vue-router';
import { defineComponent } from 'vue';

export type Component<T extends any = any> = ReturnType<typeof defineComponent> | (() => Promise<typeof import('*.vue')>) | (() => Promise<T>);

export interface HerodotusRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
	name: string;
	meta: HerodotusRouteMeta;
	component?: Component | string;
	components?: Component;
	children?: HerodotusRouteRecordRaw[];
	props?: Recordable;
	fullPath?: string;
}

export interface HerodotusRouteMeta {
	// 名称
	title: string;
	// 是否忽略权限
	ignoreAuth?: boolean;
	permissions?: string[];
	// 是否不缓存
	noKeepAlive?: boolean;
	// 是否固定在tab上
	affix?: boolean;
	// tab上的图标
	icon?: string;
	// 跳转地址
	frameSrc?: string;
	// 外链跳转地址
	externalLink?: string;
	//隐藏
	hidden?: boolean;
}

export interface Menu extends HerodotusRouteRecordRaw {
	title: string;
	label: string;
	key: string;
	icon?: any;
	permissions?: string[];
	sort?: number;
}
