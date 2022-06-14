import type { DisplayElementGroup, DisplayElement } from '/@/lib/declarations';

export const HTTP_METHOD_STYLE_GROUP: DisplayElementGroup = {
	PUT: { color: 'orange', icon: 'mdi-book-remove-multiple' },
	DELETE: { color: 'red', icon: 'mdi-book-minus-multiple' },
	POST: { color: 'green', icon: 'mdi-book-plus-multiple' },
	GET: { color: 'blue', icon: 'mdi-book-multiple' },
};

export const DEFAULT_HTTP_METHOD_STYLE: DisplayElement = HTTP_METHOD_STYLE_GROUP.GET;

export const GRANT_TYPE_STYLE_GROUP: DisplayElementGroup = {
	authorization_code: { color: 'pink', icon: 'mdi-security', text: '授权码模式' },
	client_credentials: { color: 'teal', icon: 'mdi-arrow-decision-auto', text: '客户端凭证模式' },
	password: { color: 'cyan', icon: 'mdi-file-key', text: '密码模式' },
	implicit: { color: 'purple', icon: 'mdi-file-hidden', text: '隐式/简化模式' },
	refresh_token: { color: 'indigo', icon: 'mdi-cog-refresh', text: '刷新模式' },
	social_credentials: { color: 'light-blue', icon: 'mdi-cast-connected', text: '社交化认证模式' },
};
