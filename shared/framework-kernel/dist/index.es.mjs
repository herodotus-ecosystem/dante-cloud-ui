import { useRoute as J } from "vue-router";
import { defineStore as D } from "pinia";
import { lodash as u, Swal as W, AuthorizationTokenEnum as B, Base64 as X, ContentTypeEnum as E, AuthorizationGrantTypeEnum as R, BuildInScopeEnum as L, ClientAuthenticationMethodEnum as j, Service as Q, SM2Utils as x, SM4Utils as H, moment as K } from "@herodotus-cloud/core";
import { jwtDecode as $ } from "jwt-decode";
import { nextTick as V, shallowRef as _, ref as Z, watch as G, computed as tt } from "vue";
import "pinia-plugin-persistedstate";
var U = /* @__PURE__ */ ((t) => (t.DEFAULT = "defaults", t.CLASSIC = "classic", t.TRANSVERSE = "transverse", t.COLUMNS = "transverse", t))(U || {}), v = /* @__PURE__ */ ((t) => (t.DARK = "dark", t.LIGHT = "light", t.SYSTEM = "system", t))(v || {}), z = /* @__PURE__ */ ((t) => (t.JIGSAW = "JIGSAW", t.WORD_CLICK = "WORD_CLICK", t.ARITHMETIC = "ARITHMETIC", t.CHINESE = "CHINESE", t.CHINESE_GIF = "CHINESE_GIF", t.SPEC_GIF = "SPEC_GIF", t.SPEC = "SPEC", t.HUTOOL_LINE = "HUTOOL_LINE", t.HUTOOL_CIRCLE = "HUTOOL_CIRCLE", t.HUTOOL_SHEAR = "HUTOOL_SHEAR", t.HUTOOL_GIF = "HUTOOL_GIF", t))(z || {}), Y = /* @__PURE__ */ ((t) => (t.INSTITUTION = "INSTITUTION", t.SMS = "SMS", t.WXAPP = "WXAPP", t.QQ = "QQ", t.WEIBO = "WEIBO", t.BAIDU = "BAIDU", t.WECHAT_OPEN = "WECHAT_OPEN", t.WECHAT_MP = "WECHAT_MP", t.WECHAT_ENTERPRISE = "WECHAT_ENTERPRISE", t.WECHAT_ENTERPRISE_WEB = "WECHAT_ENTERPRISE_WEB", t.DINGTALK = "DINGTALK", t.DINGTALK_ACCOUNT = "DINGTALK_ACCOUNT", t.ALIYUN = "ALIYUN", t.TAOBAO = "TAOBAO", t.ALIPAY = "ALIPAY", t.TEAMBITION = "TEAMBITION", t.HUAWEI_V2 = "HUAWEI_V2", t.FEISHU = "FEISHU", t.JD = "JD", t.DOUYIN = "DOUYIN", t.TOUTIAO = "TOUTIAO", t.MI = "MI", t.RENREN = "RENREN", t.MEITUAN = "MEITUAN", t.ELEME = "ELEME", t.KUJIALE = "KUJIALE", t.XMLY = "XMLY", t.GITEE = "GITEE", t.OSCHINA = "OSCHINA", t.CSDN = "CSDN", t.GITHUB = "GITHUB", t.GITLAB = "GITLAB", t.STACK_OVERFLOW = "STACK_OVERFLOW", t.CODING = "CODING", t.GOOGLE = "GOOGLE", t.MICROSOFT = "MICROSOFT", t.FACEBOOK = "FACEBOOK", t.LINKEDIN = "LINKEDIN", t.TWITTER = "TWITTER", t.AMAZON = "AMAZON", t.SLACK = "SLACK", t.LINE = "LINE", t.OKTA = "OKTA", t.PINTEREST = "PINTEREST", t))(Y || {}), q = /* @__PURE__ */ ((t) => (t.APP = "APP", t.PERSONAL = "PERSONAL", t))(q || {});
const ht = D("Application", {
  state: () => ({
    // 左侧菜单面板显示控制
    leftDrawer: !0,
    // 右侧设置面板显示控制
    rightDrawer: !1,
    // 登录页面面板
    signInPanel: "account"
  }),
  actions: {
    switchToMobilePanel() {
      this.signInPanel = "mobile";
    },
    switchToScanPanel() {
      this.signInPanel = "scan";
    },
    switchToAccountPanel() {
      this.signInPanel = "account";
    }
  }
});
class g {
  // 静态私有实例引用
  static _instance = null;
  // 初始化标志
  static _initialized = !1;
  options;
  // 私有构造函数防止外部实例化
  constructor(e) {
    this.options = e;
  }
  /**
   * 初始化单例（仅允许一次）
   * @param {KernelOptions} options 配置选项
   * @returns {OptionsUtilities} 单例实例
   */
  static initialize(e) {
    if (g._initialized)
      throw new Error("RouterUtilities has already been initialized");
    return g._instance = new g(e), g._initialized = !0, g._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!g._instance)
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    return g._instance;
  }
  setOptions(e) {
    this.options = e;
  }
  getOptions() {
    return this.options;
  }
  static axiosConfig() {
    return this.getInstance().getOptions().config;
  }
  static getRouterOptions() {
    return this.getInstance().getOptions().router;
  }
  static getRouter() {
    return this.getRouterOptions().instance;
  }
  static getRoutes() {
    return this.getInstance().getOptions().staticRoutes;
  }
  static getSecurityKey() {
    return this.getInstance().getOptions().variables.securityKey;
  }
  static getRedirectUri() {
    return this.getInstance().getOptions().variables.redirectUri;
  }
  static isUseCrypto() {
    return this.getInstance().getOptions().variables.isUseCrypto;
  }
  static isAutoRefreshToken() {
    return this.getInstance().getOptions().variables.isAutoRefreshToken;
  }
  static getTenantId() {
    return this.getInstance().getOptions().variables.tenantId;
  }
}
class m {
  // 静态私有实例引用
  static _instance = null;
  // 初始化标志
  static _initialized = !1;
  options;
  router = {};
  // 私有构造函数防止外部实例化
  constructor(e) {
    this.options = e, this.router = e.instance;
  }
  /**
   * 初始化单例（仅允许一次）
   * @param {RouterOptions} options 配置选项
   * @returns {RouterUtilities} 单例实例
   */
  static initialize(e) {
    if (m._initialized)
      throw new Error("RouterUtilities has already been initialized");
    return m._instance = new m(e), m._initialized = !0, m._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!m._instance)
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    return m._instance;
  }
  setRouter(e) {
    this.router = e;
  }
  getRouter() {
    return this.router;
  }
  isRouterExist() {
    return !u.isEmpty(this.router);
  }
  hasParameter(e) {
    return !u.isEmpty(e.params) || !u.isEmpty(e.query);
  }
  /**
   * 判断是否为三级路由页面
   * @param route 当前路由 {@link RouteLocationNormalizedLoaded}
   * @returns true 是三级路由，false 不是三级路由
   */
  isDetailRoute(e) {
    return !!(e.meta && e.meta.isDetailContent);
  }
  isValidDetailRoute(e) {
    return this.isDetailRoute(e) && this.hasParameter(e);
  }
  push(e) {
    return this.router.push(e);
  }
  replace(e) {
    return this.router.replace(e);
  }
  /**
   * 路由跳转
   * @param to - 需要跳转的路由
   * @param isNewTab - 是否在新的浏览器Tab标签打开
   */
  to(e, s = !1) {
    s ? this.push(e) : this.replace(e);
  }
  /**
   * 打开新页面
   * @param to 需要跳转的路由
   */
  open(e) {
    const s = this.router.resolve(e);
    window.open(s.href, "_blank");
  }
  /**
   * 返回上一级路由
   *
   */
  goBack() {
    this.router.go(-1);
  }
  refresh() {
    this.isRouterExist() ? this.router.go(0) : window.location.reload();
  }
  toRoot() {
    this.isRouterExist() && this.to(this.options.path.root);
  }
  /**
   * 跳转首页
   */
  toHome() {
    this.isRouterExist() && this.to(this.options.path.home);
  }
  toSignIn() {
    this.isRouterExist() ? this.to(this.options.path.signIn) : this.refresh();
  }
  getParent(e) {
    const s = u.split(e, "/"), i = u.dropRight(s);
    return u.join(i, "/");
  }
  toPrev(e) {
    if (e.path) {
      const s = this.getParent(e.path);
      this.to({ path: s });
    } else
      this.goBack();
  }
}
class b {
  // 静态私有实例引用
  static _instance = null;
  // 初始化标志
  static _initialized = !1;
  extension;
  constructor(e) {
    this.extension = e;
  }
  /**
   * 初始化单例（仅允许一次）
   * @param extension 扩展方法
   * @returns {OptionsUtilities} 单例实例
   */
  static initialize(e) {
    if (b._initialized)
      throw new Error("SignOutUtilities has already been initialized");
    return b._instance = new b(e), b._initialized = !0, b._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!b._instance)
      throw new Error("SignOutUtilities not initialized. Call initialize() first.");
    return b._instance;
  }
  signOut(e = !1) {
    e || N().signOut(), this.extension(), console.log("Clear Framework Kernel Data"), N().$reset(), P().$reset(), m.getInstance().toSignIn();
  }
  signOutWithDialog() {
    W.fire({
      title: "要走了么?",
      text: "您确定要退出系统！",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "是的",
      cancelButtonText: "取消"
    }).then((e) => {
      e.value && this.signOut();
    });
  }
  tokenExpires(e, s, i, n = !1) {
    W.fire({
      title: e,
      text: s,
      icon: i,
      showClass: {
        popup: "animate__animated animate__fadeInDown"
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp"
      },
      confirmButtonText: "已阅!",
      willClose: () => {
        this.signOut(n);
      }
    });
  }
}
class S {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(e) {
    this.config = e;
  }
  static getInstance(e) {
    return this.instance == null && (this.instance = new S(e)), this.instance;
  }
  getOAuth2TokenAddress() {
    return this.config.getUaa() + "/oauth2/token";
  }
  getOAuth2RevokeAddress() {
    return this.config.getUaa() + "/oauth2/revoke";
  }
  getOAuth2SignOutAddress() {
    return this.config.getUaa() + "/oauth2/sign-out";
  }
  getOAuth2DeviceAuthorizationAddress() {
    return this.config.getUaa() + "/oauth2/device_authorization";
  }
  getOIDCConnectRegisterAddress() {
    return this.config.getUaa() + "/connect/register";
  }
  createBasicHeader(e = "", s = "") {
    let i = this.config.getClientId() + ":" + this.config.getClientSecret();
    return e && s && (i = e + ":" + s), B.BASIC + X.encode(i);
  }
  createClientData(e = "", s = "", i = "") {
    const n = {
      client_id: "",
      client_secret: ""
    };
    return e && s ? (n.client_id = e, n.client_secret = s) : (n.client_id = this.config.getClientId(), n.client_secret = this.config.getClientSecret()), i && u.merge(n, { scope: i }), n;
  }
  createOAuth2Data(e, s, i = !1) {
    const n = {
      grant_type: e
    };
    return u.isEmpty(s) || u.merge(n, s), i && u.merge(n, { scope: "openid" }), n;
  }
  signOut(e, s = "", i = "") {
    return this.config.getHttp().put(
      this.getOAuth2SignOutAddress(),
      {
        accessToken: e
      },
      {
        contentType: E.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.createBasicHeader(s, i)
        }
      }
    );
  }
  revoke(e, s = "", i = "") {
    return this.config.getHttp().post(
      this.getOAuth2RevokeAddress(),
      {
        token: e
      },
      {
        contentType: E.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.createBasicHeader(s, i)
        }
      }
    );
  }
  refreshTokenFlow(e, s = !1, i = "", n = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        R.REFRESH_TOKEN,
        { refresh_token: e },
        s
      ),
      {
        contentType: E.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.createBasicHeader(i, n)
        }
      }
    );
  }
  passwordFlow(e, s, i = !1, n = "", r = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        R.PASSWORD,
        { username: e, password: s },
        i
      ),
      {
        contentType: E.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.createBasicHeader(n, r)
        }
      }
    );
  }
  /**
   * 授权码模式
   * @param code 授权码
   * @param redirect_uri 重定向地址
   * @param state 状态
   * @param oidc 是否开启 OIDC
   * @param clientId 客户端 ID
   * @param clientSecret 客户端密钥
   * @returns Promise<AxiosHttpResult<AccessTokenResponse>> - 返回访问令牌响应
   * @description 授权码模式是 OAuth 2.0 的核心授权流程，用户通过授权服务器获取授权码，然后使用该授权码获取访问令牌。
   * 这种模式适用于需要用户交互的场景，例如 Web 应用程序和移动应用程序。
   * 用户在授权服务器上登录并授权应用程序访问其资源，
   * 授权服务器返回授权码，应用程序使用该授权码向令牌端点请求访问令牌。
   * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1
   * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.3
   * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.4
   * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2
   * @see https
   */
  authorizationCodeFlow(e, s, i = "", n = !1, r = "", A = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        R.AUTHORIZATION_CODE,
        { code: e, state: i, redirect_uri: s },
        n
      ),
      {
        contentType: E.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.createBasicHeader(r, A)
        }
      }
    );
  }
  /**
   * 客户端凭据模式
   * @param clientId 客户端 ID(optional)。如果不传递该参数则使用系统配置的客户端 ID。
   * @param clientSecret  客户端密钥(optional)。如果不传递该参数则使用系统配置的客户端密钥。
   * @param scope 范围(optional)
   * @description 客户端凭据模式是 OAuth 2.0 的一种授权流程，允许客户端应用程序使用其自身的凭据（而不是用户的凭据）
   * 来获取访问令牌。这种模式适用于服务器到服务器的通信场景，例如微服务之间的通信或后台任务。
   * 客户端应用程序通过向令
   * @returns Promise<AxiosHttpResult<AccessTokenResponse>> - 返回访问令牌响应
   * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.4
   * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.4.2
   * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.4.3
   * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.4.1
   * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.4.4
   * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.4.5
   * @see https://datatracker.interface
   */
  clientCredentialsFlow(e = "", s = "", i = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(R.CLIENT_CREDENTIALS, {
        ...this.createClientData(e, s, i)
      }),
      {
        contentType: E.URL_ENCODED
      }
    );
  }
  /**
   * 设备授权模式。获取访问令牌。
   * @param deviceCode 设备码
   * @param clientId 客户端 ID(optional)。如果不传递该参数则使用系统配置的客户端 ID。
   * @param clientSecret  客户端密钥(optional)。如果不传递该参数则使用系统配置的客户端密钥。
   * @param scope 范围 (optional)
   * @description 设备授权模式允许用户在一个设备上获取授权码，然后在另一个设备上使用该授权码获取访问令牌。
   * 这种模式适用于没有浏览器或输入设备的场景，例如智能电视、游戏机等。
   * 用户需要在一个设备上输入设备码，然后在另一个设备上输入该设备码以完成授权。
   * @see https://datatracker.ietf.org/doc/html/rfc8628
   * @returns Promise<AxiosHttpResult<AccessTokenResponse>> - 返回访问令牌响应
   */
  deviceCodeFlow(e, s = "", i = "", n = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(R.DEVICE_CODE, {
        device_code: e,
        ...this.createClientData(s, i, n)
      }),
      {
        contentType: E.URL_ENCODED
      }
    );
  }
  /**
   * 设备授权流程。获取设备码和用户码。
   * @param clientId 客户端 ID(optional)。如果不传递该参数则使用系统配置的客户端 ID。
   * @param clientSecret  客户端密钥(optional)。如果不传递该参数则使用系统配置的客户端密钥。
   * @param scope 范围 (optional)
   * @returns Promise<AxiosHttpResult<DeviceAuthorizationResponse>> - 返回设备授权响应
   * @description 设备授权流程允许用户在一个设备上获取设备码，然后在另一个设备上使用该设备码进行授权。
   * 这种模式适用于没有浏览器或输入设备的场景，例如智能电视、游戏机等。
   * 用户需要在一个设备上输入设备码，然后在另一个设备上输入该设备码以完成授权。
   * @see https://datatracker.ietf.org/doc/html/rfc8628#section-3.1
   */
  deviceAuthorizationFlow(e = "", s = "", i = L.EMAIL) {
    return this.config.getHttp().post(
      this.getOAuth2DeviceAuthorizationAddress(),
      this.createClientData(e, s, i),
      {
        contentType: E.URL_ENCODED
      }
    );
  }
  socialCredentialsFlowBySms(e, s, i = !1, n = "", r = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        R.SOCIAL_CREDENTIALS,
        { mobile: e, code: s, source: Y.SMS },
        i
      ),
      {
        contentType: E.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.createBasicHeader(n, r)
        }
      }
    );
  }
  socialCredentialsFlowByJustAuth(e, s, i = !1, n = "", r = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        R.SOCIAL_CREDENTIALS,
        { ...s, source: e },
        i
      ),
      {
        contentType: E.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.createBasicHeader(n, r)
        }
      }
    );
  }
  webAuthnCredentialsFlow(e, s = !1, i = "", n = "") {
    return this.config.getHttp().postWithParams(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(R.WEBAUTHN_CREDENTIALS, {}, s),
      { ...e },
      {
        contentType: E.JSON
      },
      {
        headers: {
          Authorization: this.createBasicHeader(i, n)
        }
      }
    );
  }
  oidcClientRegistrationFlow(e, s) {
    return this.config.getHttp().post(this.getOIDCConnectRegisterAddress(), {
      product_key: e,
      grant_types: [
        R.CLIENT_CREDENTIALS,
        R.DEVICE_CODE
      ],
      redirect_uris: ["http://192.168.101.10:3000"],
      client_name: s,
      // client_secret: '123456',
      scope: [L.OPENID, L.EMAIL, L.PROFILE].join(" "),
      // 如果 response_types 包含 code 则会添加 authorization_code 授权模式
      // token 是 OAuth2.0 规范中隐式模式的值，但是在 OAuth2.1 中隐式模式被取消。目前临时使用一下
      // 可以考虑使用 id_token
      // "response_types": [
      //   "code",                // 允许：标准授权码流程
      //   "code id_token",       // 允许：OIDC 混合流程（仅返回 code + id_token）
      //   "id_token"             // 允许但不推荐：纯 OIDC 流程（无访问令牌）
      // ],
      response_types: ["token"],
      token_endpoint_auth_method: j.CLIENT_SECRET_POST
    });
  }
}
class F {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(e) {
    this.config = e;
  }
  static getInstance(e) {
    return this.instance == null && (this.instance = new F(e)), this.instance;
  }
  createSession(e = "") {
    const s = this.config.getUaa() + "/open/identity/session";
    return this.config.getHttp().post(s, {
      clientId: this.config.getClientId(),
      clientSecret: this.config.getClientSecret(),
      sessionId: e
    });
  }
  exchange(e = "", s) {
    const i = this.config.getUaa() + "/open/identity/exchange";
    return this.config.getHttp().post(i, {
      publicKey: s,
      sessionId: e
    });
  }
  getPrompt(e) {
    const s = this.config.getUaa() + "/open/identity/prompt";
    return this.config.getHttp().post(s, {
      username: e
    });
  }
  createCaptcha(e, s) {
    const i = this.config.getUaa() + "/open/captcha";
    return this.config.getHttp().get(i, {
      identity: e,
      category: s
    });
  }
  verifyCaptcha(e, s, i) {
    const n = this.config.getUaa() + "/open/captcha", r = {
      identity: e,
      category: s,
      coordinate: { x: 0, y: 0 },
      coordinates: [],
      characters: ""
    };
    return s === z.WORD_CLICK ? r.coordinates = i : s === z.JIGSAW ? r.coordinate = i : r.characters = i, this.config.getHttp().post(n, r);
  }
  createVerificationCode(e) {
    const s = this.config.getUpms() + "/open/identity/verification-code";
    return this.config.getHttp().post(
      s,
      {
        mobile: e
      },
      {
        contentType: E.URL_ENCODED
      }
    );
  }
  getSocialList() {
    const e = this.config.getUpms() + "/open/identity/sources";
    return this.config.getHttp().get(e);
  }
}
class M extends Q {
  // 静态私有实例引用
  static instance = null;
  constructor(e) {
    super(e);
  }
  static getInstance(e) {
    return this.instance == null && (this.instance = new M(e)), this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUaa() + "/webauthn/register";
  }
  getPublicKeyCredentialCreationOptionsAddress() {
    return this.getBaseAddress() + "/options";
  }
  getWebAuthnAuthenticateAddress() {
    return this.getConfig().getUaa() + "/login/webauthn";
  }
  getPublicKeyCredentialRequestOptionsAddress() {
    return this.getConfig().getUaa() + "/webauthn/authenticate/options";
  }
  getIdPath(e) {
    return this.getParamPath(this.getBaseAddress(), e);
  }
  getPublicKeyCredentialCreationOptions() {
    return this.getConfig().getHttp().post(this.getPublicKeyCredentialCreationOptionsAddress(), "");
  }
  webAuthnRegister(e) {
    return this.getConfig().getHttp().post(this.getBaseAddress(), e);
  }
  getPublicKeyCredentialRequestOptions() {
    return this.getConfig().getHttp().post(this.getPublicKeyCredentialRequestOptionsAddress(), "");
  }
  webAuthnAuthenticate(e) {
    return this.getConfig().getHttp().post(this.getWebAuthnAuthenticateAddress(), e);
  }
  delete(e) {
    return this.getConfig().getHttp().delete(this.getIdPath(e));
  }
}
class p {
  // 静态私有实例引用
  static _instance = null;
  // 初始化标志
  static _initialized = !1;
  config = {};
  // 私有构造函数防止外部实例化
  constructor(e) {
    this.config = e;
  }
  /**
   * 初始化单例（仅允许一次）
   * @param {KernelOptions} config 配置选项
   * @returns {SecurityApiResources} 单例实例
   */
  static initialize(e) {
    if (p._initialized)
      throw new Error("SecurityApiResources has already been initialized");
    return p._instance = new p(e), p._initialized = !0, p._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!p._instance)
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    return p._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return F.getInstance(this.config);
  }
  oauth2() {
    return S.getInstance(this.config);
  }
  passkey() {
    return M.getInstance(this.config);
  }
}
const P = D("Crypto", {
  state: () => ({
    sessionId: "",
    key: "",
    state: ""
  }),
  actions: {
    setSessionId(t) {
      this.sessionId = t;
    },
    setKey(t) {
      this.key = H.encrypt(t, g.getSecurityKey());
    },
    getKey() {
      return H.decrypt(this.key, g.getSecurityKey());
    },
    encrypt(t) {
      const e = this.getKey();
      return H.encrypt(t, e);
    },
    decrypt(t) {
      const e = this.getKey();
      return H.decrypt(t, e);
    },
    exchange(t = "") {
      return new Promise((e, s) => {
        p.getInstance().open().createSession(t).then((i) => {
          const n = i.data;
          if (n) {
            const r = n.sessionId, A = n.publicKey;
            this.state = n.state;
            const T = x.createKeyPair(), o = x.encrypt(T.publicKey, A);
            p.getInstance().open().exchange(r, o).then((h) => {
              const c = h.data, w = x.decrypt(c, T.privateKey);
              this.setSessionId(r), this.setKey(w), e(w);
            });
          }
        }).catch((i) => {
          s(i);
        });
      });
    }
  },
  persist: {
    storage: sessionStorage
  }
}), N = D("Authentication", {
  state: () => ({
    access_token: "",
    expires_in: 0,
    refresh_token: "",
    license: "",
    openid: "",
    idToken: "",
    scope: "",
    token_type: "",
    errorTimes: 0,
    remainTimes: 0,
    locked: !1,
    userId: "",
    username: "",
    employeeId: "",
    avatar: "",
    roles: []
  }),
  getters: {
    isNotExpired: (t) => {
      const e = K().add(t.expires_in, "seconds").valueOf();
      return K(e).add(1, "seconds").diff(K(), "seconds") !== 0;
    },
    token() {
      return g.isAutoRefreshToken() ? this.access_token : this.isNotExpired ? this.access_token : "";
    }
  },
  actions: {
    getBearerToken() {
      return B.BEARER + this.token;
    },
    getAuthorizationHeader() {
      return { Authorization: this.getBearerToken(), "X-Herodotus-Open-Id": this.userId };
    },
    saveAccessToken(t) {
      if (this.access_token = t.access_token, this.expires_in = t.expires_in, this.refresh_token = t.refresh_token ? t.refresh_token : "", this.license = t.refresh_token ? t.refresh_token : "", this.scope = t.scope, this.token_type = t.token_type, t.id_token) {
        this.idToken = t.id_token;
        const e = $(this.idToken);
        this.userId = e.openid, this.username = e.sub, this.avatar = e.avatar, this.employeeId = e.employeeId, this.roles = e.roles;
      } else if (t.openid) {
        const e = P();
        this.openid = t.openid;
        const s = e.decrypt(this.openid), i = JSON.parse(s);
        this.userId = i.userId, this.username = i.username, this.roles = i.roles, this.avatar = i.avatar, this.employeeId = i.employeeId;
      } else
        console.warn("There is no id token or openid in the data.");
    },
    setUserErrorStatus(t) {
      this.remainTimes = t.remainTimes, this.errorTimes = t.errorTimes, this.locked = t.locked;
    },
    /**
     * 判断是否是以非弹窗的形式显示的信息。
     *
     * 主要在登录页面中，将 Dialog 弹出形式的错误信息，转换为显示在输入框上部的错误信息，
     * @param error
     * @returns
     */
    isAlertMessage(t) {
      return t.code && [40106, 40111].includes(t.code);
    },
    setErrorPrompt(t, e) {
      this.isAlertMessage(t) && p.getInstance().open().getPrompt(e).then((s) => {
        this.setUserErrorStatus(s.data);
      });
    },
    signIn(t, e) {
      const s = P();
      return g.isUseCrypto() && (t = s.encrypt(t), e = s.encrypt(e)), new Promise((i, n) => {
        p.getInstance().oauth2().passwordFlow(t, e, g.isUseCrypto()).then((r) => {
          if (r) {
            const A = r;
            this.saveAccessToken(A);
          }
          this.access_token ? i(!0) : i(!1);
        }).catch((r) => {
          this.setErrorPrompt(r, t), n(r);
        });
      });
    },
    refreshToken() {
      return new Promise((t, e) => {
        p.getInstance().oauth2().refreshTokenFlow(this.refresh_token, g.isUseCrypto()).then((s) => {
          if (s) {
            const i = s;
            this.saveAccessToken(i);
          }
          this.access_token ? t(!0) : t(!1);
        }).catch((s) => {
          e(s);
        });
      });
    },
    signOut() {
      this.access_token && p.getInstance().oauth2().signOut(this.access_token).then(() => {
        console.log("Server side sign out successfully.");
      }).catch((t) => {
        console.log("Server side sign out has error.", t);
      });
    },
    authorizationCode(t, e = "") {
      return new Promise((s, i) => {
        p.getInstance().oauth2().authorizationCodeFlow(
          t,
          g.getRedirectUri(),
          e,
          g.isUseCrypto()
        ).then((n) => {
          if (n) {
            const r = n;
            this.saveAccessToken(r);
          }
          this.access_token ? s(!0) : s(!1);
        }).catch((n) => {
          i(n);
        });
      });
    },
    smsSignIn(t, e) {
      const s = P();
      return g.isUseCrypto() && (t = s.encrypt(t), e = s.encrypt(e)), new Promise((i, n) => {
        p.getInstance().oauth2().socialCredentialsFlowBySms(t, e, g.isUseCrypto()).then((r) => {
          if (r) {
            const A = r;
            this.saveAccessToken(A);
          }
          this.access_token ? i(!0) : i(!1);
        }).catch((r) => {
          this.setErrorPrompt(r, t), n(r);
        });
      });
    },
    socialSignIn(t, e) {
      return new Promise((s, i) => {
        p.getInstance().oauth2().socialCredentialsFlowByJustAuth(t, e, g.isUseCrypto()).then((n) => {
          if (n) {
            const r = n;
            this.saveAccessToken(r);
          }
          this.access_token ? s(!0) : s(!1);
        }).catch((n) => {
          n.code && [40106, 40111].includes(n.code) && i(n);
        });
      });
    },
    passkey(t) {
      return new Promise((e, s) => {
        p.getInstance().oauth2().webAuthnCredentialsFlow(t, g.isUseCrypto()).then((i) => {
          if (i) {
            const n = i;
            this.saveAccessToken(n);
          }
          this.access_token ? e(!0) : e(!1);
        }).catch((i) => {
          i.code && [40106, 40111].includes(i.code) && s(i);
        });
      });
    }
  },
  persist: !0
}), lt = () => {
  const t = N(), e = P(), s = t.access_token, i = e.sessionId, n = {};
  s && (n.Authorization = B.BEARER + s), i && (n["X-Herodotus-Session-Id"] = i);
  const r = g.getTenantId();
  return r && (n["X-Herodotus-Tenant-Id"] = r), n;
}, k = D("Router", {
  state: () => ({
    appMenus: [],
    personalMenus: [],
    cachedRoutes: [],
    details: new Map(/* @__PURE__ */ new Map()),
    pushParams: {}
  }),
  getters: {
    isDynamicRouteAdded() {
      return !u.isEmpty(this.appMenus) || !u.isEmpty(this.personalMenus);
    }
  },
  actions: {
    /**
     * 查询三级路由组件
     * @param key 三级路由组件名称
     * @returns 组件名称
     */
    getDetailComponent(t) {
      return this.details.get(t);
    },
    /**
     * 获取 Vue Router Push 类型参数
     * @param key 组件名称
     * @returns Push 类型参数
     */
    getRoutePushParam(t) {
      return this.pushParams[t];
    },
    addMenus(t, e) {
      u.isEmpty(t) || (this.appMenus = t), u.isEmpty(e) || (this.personalMenus = e);
    },
    /**
     * 将路由添加至缓存
     * @param route 路由
     */
    addCachedRoute(t) {
      if (!t.meta?.isNotKeepAlive) {
        const e = t.name;
        this.cachedRoutes.includes(e) || this.cachedRoutes.push(e);
      }
    },
    /**
     * 添加三级路由
     * @param item 路由条目
     */
    addDetailRoute(t) {
      const e = t.name;
      e && this.details.set(e, t.component);
    },
    /**
     * 判断路由中是否包含 Push 路由
     * @param route 路由
     * @returns true 包含参数，false 不包含参数
     */
    hasParameter(t) {
      const e = t.name;
      return !!(e && u.has(this.pushParams, e));
    },
    /**
     * 判断是否为三级路由
     * @param route 路由
     * @returns true 是三级路由，false 不是三级路由
     */
    isDetailRoute(t) {
      return !!(t.meta && t.meta.isDetailContent);
    },
    /**
     * 判断当前是否为有效的三级路由
     * @param route 路由
     * @returns true 是三级路由，false 不是三级路由
     */
    isValidDetailRoute(t) {
      return this.isDetailRoute(t) && this.hasParameter(t);
    },
    /**
     * 向当前缓存添加 Push 参数
     * @param name 参数名称
     * @param params 参数值
     */
    addRoutePushParam(t, e = {}) {
      t && (this.pushParams[t] = e);
    },
    /**
     * 从当前缓存中删除 Push 参数
     * @param name 参数名称
     */
    removeRoutePushParam(t) {
      t && delete this.pushParams[t];
    }
  }
}), et = D("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: v.SYSTEM,
      // 是否为混合主题，预留属性
      isMixed: !0,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: U.DEFAULT,
    /**
     * 界面效果
     */
    effect: {
      // 是否开启菜单手风琴效果
      isUniqueOpened: !1
    },
    display: {
      // 是否开启 TabsView
      isTabsView: !0,
      // 关闭标签页，激活左侧标签页
      isActivateLeftTab: !0,
      // 显示面包屑
      showBreadcrumbs: !0,
      // 显示面包屑图标
      showBreadcrumbsIcon: !0,
      table: {
        dense: !1
      }
    }
  }),
  getters: {
    isDark: (t) => t.theme.mode === v.DARK,
    isLight: (t) => t.theme.mode === v.LIGHT,
    isSystem: (t) => t.theme.mode === v.SYSTEM,
    isDefaultLayout: (t) => t.layout === U.DEFAULT,
    isClassicLayout: (t) => t.layout === U.CLASSIC
  },
  persist: !0
}), st = D("TabsView", {
  state: () => ({
    tabs: [],
    activatedTab: {},
    activatedTabName: ""
  }),
  getters: {
    isNotLastTab: (t) => (e) => t.tabs.length - 1 !== e,
    getLastTabIndex: (t) => t.tabs.length - 1,
    getTabIndex: (t) => (e) => u.findIndex(t.tabs, (s) => s.name === e.name),
    getActivatedTabIndex() {
      return this.getTabIndex(this.activatedTab);
    },
    /**
     * 最后一个Tab是否为激活状态
     */
    isLastTabActivated() {
      return this.getActivatedTabIndex === this.getLastTabIndex;
    },
    isFirstTabActivated() {
      return this.getActivatedTabIndex === 0;
    },
    disableCloseCurrentTab() {
      return this.isLastTabActivated || this.isFirstTabActivated;
    },
    disableCloseLeftTabs() {
      return this.isFirstTabActivated;
    },
    disableCloseRightTabs() {
      return this.isLastTabActivated;
    },
    disableRefreshCurrentTab() {
      return !!(this.activatedTab.meta && this.activatedTab.meta.isDetailContent);
    }
  },
  actions: {
    convertRouteToTab(t) {
      return {
        name: t.name,
        path: t.path,
        meta: t.meta
      };
    },
    setActivatedTab(t) {
      V(() => {
        this.activatedTab = t, this.activatedTabName = t.name;
      });
    },
    isNotExistInStaticRoute(t) {
      return u.findIndex(g.getRoutes(), (e) => e.path === t.path) === -1;
    },
    isTabNotOpened(t) {
      return this.getTabIndex(t) === -1;
    },
    openTab(t, e = !1) {
      this.isNotExistInStaticRoute(t) && (this.isTabNotOpened(t) && (e ? this.isLastTabActivated ? this.tabs.splice(this.getActivatedTabIndex, 0, t) : this.tabs.splice(this.getActivatedTabIndex + 1, 0, t) : this.tabs.push(t)), this.setActivatedTab(t));
    },
    closeTab(t) {
      u.remove(this.tabs, (e) => e.name === t.name);
    },
    smartTab(t) {
      const e = k(), s = e.isDetailRoute(t), i = this.convertRouteToTab(t);
      s ? e.hasParameter(t) ? this.openTab(i, s) : (this.closeTab(i), m.getInstance().goBack()) : this.openTab(i, s);
    },
    deleteTab(t) {
      const e = this.convertRouteToTab(t);
      this.closeTab(e);
    },
    closeCurrentTab() {
      this.closeTab(this.activatedTab);
    },
    closeOtherTabs() {
      u.remove(this.tabs, (t) => t.name !== this.activatedTab.name);
    },
    closeLeftTabs() {
      const t = this.getActivatedTabIndex;
      u.remove(this.tabs, (e, s) => s < t);
    },
    closeRightTabs() {
      const t = this.getActivatedTabIndex;
      u.remove(this.tabs, (e, s) => s > t);
    }
  },
  persist: !0
});
function dt() {
  const t = J(), e = k(), s = st();
  return {
    onFinish: () => {
      const n = t.name;
      e.removeRoutePushParam(n), s.deleteTab(t), m.getInstance().goBack();
    }
  };
}
function ut(t, e, s, i = "") {
  const n = _(0), r = _(5), A = _(!1), T = _(!1), o = _({}), h = Z([]), c = (d, C = !1) => {
    const I = h.value.length + 1;
    C ? h.value.push({ id: I, icon: "mdi-information", color: "green", text: d }) : h.value.push({ id: I, icon: "mdi-alert-circle", color: "error", text: d });
  }, w = (d) => {
    d === "authorization_pending" ? c("Authorization pending, continuing to poll...") : d === "slow_down" ? (c("Slowing down..."), l()) : d === "token_expired" ? (c("Token expired, stopping..."), f(), T.value = !0) : d === "access_denied" && (c("Access denied, stopping..."), f(), T.value = !0);
  }, O = () => {
    p.getInstance().oauth2().deviceCodeFlow(t.value, e.value, s.value, i).then((d) => {
      c("Authorization successful", !0), f(), A.value = !0, o.value = d;
    }).catch((d) => {
      w(d.error);
    });
  }, a = () => {
    n.value = window.setInterval(O, r.value * 1e3);
  }, f = () => {
    window.clearInterval(n.value);
  }, l = () => {
    r.value += 5, f(), a();
  };
  return {
    pullingResponse: h,
    successResponse: o,
    isFailed: T,
    isSuccess: A,
    schedule: a,
    clear: f,
    slowDown: l
  };
}
function gt() {
  k();
  const t = N(), e = (o) => o.meta?.title, s = (o) => o.meta?.icon, i = (o) => o.meta?.isHideAllChild, n = (o) => o.children, r = (o) => !!n(o);
  return {
    hasPermission: (o) => {
      const h = t.roles, c = o.meta?.roles;
      if (u.isEmpty(c))
        return !0;
      if (u.isEmpty(h))
        return !1;
      const w = u.intersection(h, c);
      return !u.isEmpty(w);
    },
    getItemTitle: e,
    getItemIcon: s,
    getItemChildren: n,
    isDisplayAsItem: (o) => r(o) ? !!i(o) : !0
  };
}
function pt() {
  const t = N();
  let e = null;
  const s = () => {
    e && (e = null);
  };
  return {
    isSupported: async () => !!(window.PublicKeyCredential && PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable && PublicKeyCredential.isConditionalMediationAvailable && (await Promise.all([
      PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(),
      PublicKeyCredential.isConditionalMediationAvailable()
    ])).every((T) => T === !0)),
    registration: (A) => (e = new AbortController(), new Promise((T, o) => {
      p.getInstance().passkey().getPublicKeyCredentialCreationOptions().then((h) => {
        const c = PublicKeyCredential.parseCreationOptionsFromJSON(
          h
        );
        return navigator.credentials.create({ publicKey: c });
      }).then((h) => {
        const c = {
          publicKey: { label: A, credential: h }
        };
        return p.getInstance().passkey().webAuthnRegister(c);
      }).then((h) => {
        T(h);
      }).catch((h) => {
        o(h);
      }).finally(() => {
        s();
      });
    })),
    authenticator: () => (e = new AbortController(), new Promise((A, T) => {
      p.getInstance().passkey().getPublicKeyCredentialRequestOptions().then((o) => {
        const h = PublicKeyCredential.parseRequestOptionsFromJSON(
          o
        );
        return navigator.credentials.get({ publicKey: h, signal: e?.signal });
      }).then((o) => {
        if (e?.signal.aborted)
          return !1;
        if (o) {
          const h = o;
          return t.passkey(h.toJSON());
        }
        return !1;
      }).then((o) => {
        A(o);
      }).catch((o) => {
        T(o);
      }).finally(() => {
        s();
      });
    }))
  };
}
function ft(t, e, s, i) {
  const n = (a) => a.meta?.isDetailContent, r = (a) => a.meta?.scenario, A = (a, f) => {
    const l = {};
    return l.path = a.name, l.component = f[s(a.componentPath)], a.componentName && (l.name = a.componentName), a.redirect && (l.redirect = a.redirect), l.meta = {
      scenario: a.scenario,
      icon: a.meta.icon,
      title: a.meta.title,
      ...a.meta.sort && { sort: a.meta.sort },
      ...a.meta.isHaveChild && { isHaveChild: a.meta.isHaveChild },
      ...a.meta.isNotKeepAlive && { isNotKeepAlive: a.meta.isNotKeepAlive },
      ...a.meta.isHideAllChild && { isHideAllChild: a.meta.isHideAllChild },
      ...a.meta.isDetailContent && { isDetailContent: a.meta.isDetailContent },
      ...a.meta.isIgnoreAuth && { isIgnoreAuth: a.meta.isIgnoreAuth }
    }, l;
  }, T = (a, f) => {
    const l = k();
    return a.map((d) => {
      const C = A(d, f);
      return n(C) && l.addDetailRoute(C), d.children && d.children.length > 0 && (C.children = T(d.children, f)), C;
    });
  }, o = () => {
    const a = [], f = t;
    return Object.keys(f).forEach((l) => {
      const C = f[l].default || {}, I = Array.isArray(C) ? [...C] : [C];
      a.push(...I);
    }), a;
  }, h = (a, f) => {
    const l = a.meta?.sort || 0, d = f.meta?.sort || 0;
    return l - d;
  }, c = (a, f) => {
    const l = k();
    if (console.log("[Herodotus] |- Begin add dynamic routes"), u.isEmpty(f))
      console.warn("[Herodotus] |- Dynamic routes is empty, skip!");
    else {
      const d = [], C = [];
      f.forEach((I) => {
        a.addRoute(I), r(I) === q.APP ? d.push(I) : C.push(I);
      }), l.addMenus(d, C), console.log("[Herodotus] |- Dynamic routes add success!");
    }
  };
  return {
    initBackEndRoutes: async (a, f) => {
      const d = (await i(f)).data.menus, I = T(d, e);
      console.log("---routes---", I), c(a, I);
    },
    initFrontEndRoutes: async (a) => {
      const l = o().sort(h);
      console.log(l), c(a, l);
    }
  };
}
function At() {
  let t;
  const e = et(), s = _(v.DARK), i = typeof window < "u", n = () => {
    if (i)
      return window.matchMedia("(prefers-color-scheme: dark)");
  }, r = () => {
    s.value = t.matches ? v.DARK : v.LIGHT;
  }, A = (h) => {
    if (!h || h.nodeType !== Node.ELEMENT_NODE) return !1;
    const c = window.getComputedStyle(h);
    return c.overflowY === "scroll" || c.overflowY === "auto" && h.scrollHeight > h.clientHeight;
  }, T = () => {
    const h = performance.now();
    if (performance.now() - h > 10) return;
    const c = document.querySelector("[data-v-app]");
    c.querySelectorAll("*").forEach((y) => {
      A(y) && (y.dataset.scrollX = String(y.scrollLeft), y.dataset.scrollY = String(y.scrollTop));
    });
    const O = c.cloneNode(!0);
    O.classList.add("app-copy");
    const a = c.getBoundingClientRect();
    O.style.top = a.top + "px", O.style.left = a.left + "px", O.style.width = a.width + "px", O.style.height = a.height + "px";
    const l = document.activeElement.getBoundingClientRect(), d = l.left + l.width / 2 + window.scrollX, C = l.top + l.height / 2 + window.scrollY;
    c.style.setProperty("--clip-pos", `${d}px ${C}px`), c.style.removeProperty("--clip-size"), V(() => {
      c.classList.add("app-transition"), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          c.style.setProperty(
            "--clip-size",
            Math.hypot(window.innerWidth, window.innerHeight) + "px"
          );
        });
      });
    }), document.body.append(O), O.querySelectorAll("[data-scroll-x], [data-scroll-y]").forEach(
      (y) => {
        y.scrollLeft = Number(y.dataset.scrollX), y.scrollTop = Number(y.dataset.scrollY);
      }
    );
    function I(y) {
      y.target === y.currentTarget && (O.remove(), c.removeEventListener("transitionend", I), c.removeEventListener("transitioncancel", I), c.classList.remove("app-transition"), c.style.removeProperty("--clip-size"), c.style.removeProperty("--clip-pos"));
    }
    c.addEventListener("transitionend", I), c.addEventListener("transitioncancel", I);
  };
  G(
    () => e.theme.mode,
    (h) => {
      h === v.SYSTEM ? (t = n(), t.addEventListener("change", r), r()) : t && t.removeEventListener("change", r);
    },
    { immediate: !0 }
  );
  const o = tt(() => e.isSystem ? s.value : e.theme.mode);
  return G(o, T), {
    theme: o
  };
}
const Tt = (t) => {
  g.initialize(t), m.initialize(t.router), p.initialize(t.config), b.initialize(t.signOutExtension);
};
export {
  z as CaptchaCategoryEnum,
  U as LayoutModeEnum,
  q as MenuScenario,
  g as OptionsUtilities,
  m as RouterUtilities,
  p as SecurityApiResources,
  b as SignOutUtilities,
  Y as SocialSourceEnum,
  v as ThemeModeEnum,
  lt as getSystemHeaders,
  Tt as initializer,
  ht as useApplicationStore,
  N as useAuthenticationStore,
  P as useCryptoStore,
  ut as useDeviceAuthorize,
  dt as useEditFinish,
  pt as usePasskey,
  k as useRouterStore,
  et as useSettingsStore,
  gt as useSystemMenu,
  ft as useSystemRoute,
  At as useSystemTheme,
  st as useTabsViewStore
};
