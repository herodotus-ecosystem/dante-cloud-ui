import { RouteLocationNormalizedLoaded } from 'vue-router';
import { BaseTree } from '../apis/base';
import { SocialSourceEnum } from '../../enums';

export interface MenuItem {
	title: string | unknown;
	prependIcon: string | unknown;
	to?: string;
	value?: string;
	$children?: MenuItem[];
}

export interface Tab extends Pick<RouteLocationNormalizedLoaded, 'name' | 'path' | 'meta'> {}

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
export interface RemoteRoute extends BaseTree {
	componentName: string;
	componentPath: string;
	redirect: string;
	meta: RemoteRouteMeta;
	roles: Array<string>;
	children?: Array<RemoteRoute>;
}

export type SocialSource = keyof typeof SocialSourceEnum;

export interface AccessPrincipal {
	code?: string;
	appId?: string;
	encryptedData?: string;
	iv?: string;
	openId?: string;
	sessionKey?: string;
	unionId?: string;
	rawData?: string;
	signature?: string;
	auth_code?: string;
	state?: string;
	authorization_code?: string;
	oauth_token?: string;
	oauth_verifier?: string;
	mobile?: string;
}
