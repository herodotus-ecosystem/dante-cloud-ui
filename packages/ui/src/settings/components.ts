import type { DisplayElementGroup, DisplayElement } from '/@/lib/declarations';

export const HTTP_METHOD_STYLE_GROUP: DisplayElementGroup = {
  PUT: { color: 'orange', icon: 'mdi-book-remove-multiple' },
  DELETE: { color: 'red', icon: 'mdi-book-minus-multiple' },
  POST: { color: 'green', icon: 'mdi-book-plus-multiple' },
  GET: { color: 'blue', icon: 'mdi-book-multiple' },
  ALL: { color: 'black', icon: 'mdi-book-cog' }
};

export const DATA_ITEM_STATUS: Array<DisplayElement> = [
  { color: 'green', icon: 'mdi-database-check' },
  { color: 'error', icon: 'mdi-database-off' },
  { color: 'error', icon: 'mdi-database-lock' },
  { color: 'warning', icon: 'mdi-database-clock' }
];

export const DEFAULT_HTTP_METHOD_STYLE: DisplayElement = HTTP_METHOD_STYLE_GROUP.GET;

export const GRANT_TYPE_STYLE_GROUP: DisplayElementGroup = {
  authorization_code: { color: 'pink', icon: 'mdi-security', text: '授权码认证' },
  client_credentials: { color: 'teal', icon: 'mdi-arrow-decision-auto', text: '客户端凭证认证' },
  refresh_token: { color: 'indigo', icon: 'mdi-cog-refresh', text: '刷新令牌认证' },
  password: { color: 'cyan', icon: 'mdi-file-key', text: '密码认证' },
  social_credentials: { color: 'light-blue', icon: 'mdi-cast-connected', text: '社交化认证' },
  'urn:ietf:params:oauth:grant-type:device_code': { color: 'primary', icon: 'mdi-devices', text: '设备激活码认证' },
  'urn:ietf:params:oauth:grant-type:jwt-bearer': { color: 'purple', icon: 'mdi-file-hidden', text: 'JWT Bearer 认证' }
};
