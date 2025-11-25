import type { DisplayElementGroup, DisplayElement } from '@/lib/declarations';

export const IN_BROWSER = typeof window !== 'undefined';
export const IS_PROD = import.meta.env.PROD;
export const IS_DEV = import.meta.env.DEV;
export const IS_SERVER = import.meta.env.SSR;

export const HTTP_METHOD_STYLE_GROUP: DisplayElementGroup = {
  PUT: { color: 'orange', icon: 'mdi-book-remove-multiple' },
  DELETE: { color: 'red', icon: 'mdi-book-minus-multiple' },
  POST: { color: 'green', icon: 'mdi-book-plus-multiple' },
  GET: { color: 'blue', icon: 'mdi-book-multiple' },
  ALL: { color: 'black', icon: 'mdi-book-cog' },
};

export const DATA_ITEM_STATUS: Array<DisplayElement> = [
  { color: 'positive', icon: 'mdi-circle' },
  { color: 'negative', icon: 'mdi-circle' },
  { color: 'warning', icon: 'mdi-circle' },
  { color: 'info', icon: 'mdi-circle' },
];

export const COLOR_LIST: Array<string> = [
  'positive',
  'negative',
  'info',
  'warning',
  'accent',
  'secondary',
  'primary',
  'red',
  'pink',
  'purple',
  'deep-purple',
  'indigo',
  'blue',
  'light-blue',
  'cyan',
  'teal',
  'green',
  'light-green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deep-orange',
  'brown',
  'grey',
  'blue-grey',
];

export const DEFAULT_HTTP_METHOD_STYLE: DisplayElement = HTTP_METHOD_STYLE_GROUP.GET!;

export const GRANT_TYPE_STYLE_GROUP: DisplayElementGroup = {
  authorization_code: { color: 'pink', icon: 'mdi-security', text: '授权码认证' },
  client_credentials: { color: 'orange', icon: 'mdi-arrow-decision-auto', text: '客户端凭证认证' },
  refresh_token: { color: 'indigo', icon: 'mdi-cog-refresh', text: '刷新令牌认证' },
  password: { color: 'cyan', icon: 'mdi-file-key', text: '密码认证' },
  social_credentials: { color: 'light-blue', icon: 'mdi-charity', text: '社交化认证' },
  webauthn_credentials: {
    color: 'secondary',
    icon: 'mdi-account-key',
    text: 'Passkey 通行密钥认证',
  },
  'urn:ietf:params:oauth:grant-type:device_code': {
    color: 'primary',
    icon: 'mdi-devices',
    text: '设备激活码认证',
  },
  'urn:ietf:params:oauth:grant-type:jwt-bearer': {
    color: 'purple',
    icon: 'mdi-file-hidden',
    text: 'JWT Bearer 认证',
  },
};

export const Path = {
  ROOT: '/',
  // 登录
  SIGN_IN: '/sign-in',
  SIGN_IN_NAME: 'SignIn',
  // 首页
  HOME: '/dashboard',
  HOME_NAME: 'Dashboard',
  HOME_TITLE: '首页',
  // 错误
  NOT_FOUND: '/:pathMatch(.*)*',
  NOT_FOUND_NAME: 'PageNotFound',
};

export const ComponentName = {
  SYS_USER: 'SysUser',
  SYS_ROLE: 'SysRole',
  SYS_PERMISSION: 'SysPermission',
  SYS_ATTRIBUTE: 'SysAttribute',
  SYS_ELEMENT: 'SysElement',
  SYS_DEFAULT_ROLE: 'SysDefaultRole',
  SYS_ORGANIZATION: 'SysOrganization',
  SYS_DEPARTMENT: 'SysDepartment',
  SYS_EMPLOYEE: 'SysEmployee',
  SYS_OWNERSHIP: 'SysOwnership',
  SYS_DICTIONARY: 'SysDictionary',
  OAUTH2_APPLICATION: 'OAuth2Application',
  OAUTH2_SCOPE: 'OAuth2Scope',
  OAUTH2_TOKEN: 'OAuth2Token',
  OAUTH2_COMPLIANCE: 'OAuth2Compliance',
  OAUTH2_AUDIT: 'OAuth2Audit',
  OAUTH2_DEVICE: 'OAuth2Device',
  OAUTH2_PRODUCT: 'OAuth2Product',
  OAUTH2_CREDENTIAL_RECORD: 'OAuth2CredentialRecord',
  ASSET_SERVER: 'AssetServer',
  ASSET_APPLICATION: 'AssetApplication',
  DATABASE_ACCOUNT: 'DatabaseAccount',
  DATABASE_CATALOG: 'DatabaseCatalog',
  DATABASE_INSTANCE: 'DatabaseInstance',
  MESSAGE_INFORMATION: 'MessageInformation',
  WORKFLOW_DYNAMIC_FORM: 'WorkflowDynamicForm',
  WIDGETS_DYNAMIC_FORM: 'WidgetsDynamicForm',
  WORKFLOW_PROCESS_START: 'WorkflowProcessStart',
  WORKFLOW_PROCESS_APPROVE: 'WorkflowProcessApprove',
  SYS_TENANT_DATA_SOURCE: 'SysTenantDataSource',
  OSS_BUCKET: 'OssBucket',
  OSS_OBJECT: 'OssObject',
  SOCIAL_BINDING: 'SocialBinding',
  IOT_PRODUCT_CATEGORY: 'IotProductCategory',
  IOT_PRODUCT: 'IotProduct',
  IOT_DEVICE: 'IotDevice',
  IOT_TSL_FUNCTION: 'IotTslFunction',
  IOT_TSL_UNIT: 'IotTslUnit',
  MGT_CERTIFICATE: 'MgtCertificate',
};
