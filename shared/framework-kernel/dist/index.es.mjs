import { useRoute as J } from "vue-router";
import { defineStore as b } from "pinia";
import { Swal as S, AuthorizationTokenEnum as M, Base64 as q, ContentTypeEnum as O, AuthorizationGrantTypeEnum as D, BuildInScopeEnum as Q, SM2Utils as U, SM4Utils as w, moment as x } from "@herodotus-cloud/core";
import { jwtDecode as j } from "jwt-decode";
import { isEmpty as C, split as $, dropRight as Z, join as tt, merge as z, has as et, remove as k, findIndex as G, intersection as st } from "lodash-es";
import { nextTick as Y, shallowRef as it, watch as W, computed as nt } from "vue";
import "pinia-plugin-persistedstate";
var H = /* @__PURE__ */ ((t) => (t.DEFAULT = "defaults", t.CLASSIC = "classic", t.TRANSVERSE = "transverse", t.COLUMNS = "transverse", t))(H || {}), y = /* @__PURE__ */ ((t) => (t.DARK = "dark", t.LIGHT = "light", t.SYSTEM = "system", t))(y || {}), B = /* @__PURE__ */ ((t) => (t.JIGSAW = "JIGSAW", t.WORD_CLICK = "WORD_CLICK", t.ARITHMETIC = "ARITHMETIC", t.CHINESE = "CHINESE", t.CHINESE_GIF = "CHINESE_GIF", t.SPEC_GIF = "SPEC_GIF", t.SPEC = "SPEC", t.HUTOOL_LINE = "HUTOOL_LINE", t.HUTOOL_CIRCLE = "HUTOOL_CIRCLE", t.HUTOOL_SHEAR = "HUTOOL_SHEAR", t.HUTOOL_GIF = "HUTOOL_GIF", t))(B || {}), V = /* @__PURE__ */ ((t) => (t.INSTITUTION = "INSTITUTION", t.SMS = "SMS", t.WXAPP = "WXAPP", t.QQ = "QQ", t.WEIBO = "WEIBO", t.BAIDU = "BAIDU", t.WECHAT_OPEN = "WECHAT_OPEN", t.WECHAT_MP = "WECHAT_MP", t.WECHAT_ENTERPRISE = "WECHAT_ENTERPRISE", t.WECHAT_ENTERPRISE_WEB = "WECHAT_ENTERPRISE_WEB", t.DINGTALK = "DINGTALK", t.DINGTALK_ACCOUNT = "DINGTALK_ACCOUNT", t.ALIYUN = "ALIYUN", t.TAOBAO = "TAOBAO", t.ALIPAY = "ALIPAY", t.TEAMBITION = "TEAMBITION", t.HUAWEI_V2 = "HUAWEI_V2", t.FEISHU = "FEISHU", t.JD = "JD", t.DOUYIN = "DOUYIN", t.TOUTIAO = "TOUTIAO", t.MI = "MI", t.RENREN = "RENREN", t.MEITUAN = "MEITUAN", t.ELEME = "ELEME", t.KUJIALE = "KUJIALE", t.XMLY = "XMLY", t.GITEE = "GITEE", t.OSCHINA = "OSCHINA", t.CSDN = "CSDN", t.GITHUB = "GITHUB", t.GITLAB = "GITLAB", t.STACK_OVERFLOW = "STACK_OVERFLOW", t.CODING = "CODING", t.GOOGLE = "GOOGLE", t.MICROSOFT = "MICROSOFT", t.FACEBOOK = "FACEBOOK", t.LINKEDIN = "LINKEDIN", t.TWITTER = "TWITTER", t.AMAZON = "AMAZON", t.SLACK = "SLACK", t.LINE = "LINE", t.OKTA = "OKTA", t.PINTEREST = "PINTEREST", t))(V || {}), X = /* @__PURE__ */ ((t) => (t.APP = "APP", t.PERSONAL = "PERSONAL", t))(X || {});
const pt = b("Application", {
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
class h {
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
    if (h._initialized)
      throw new Error("RouterUtilities has already been initialized");
    return h._instance = new h(e), h._initialized = !0, h._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!h._instance)
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    return h._instance;
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
class E {
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
    if (E._initialized)
      throw new Error("RouterUtilities has already been initialized");
    return E._instance = new E(e), E._initialized = !0, E._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!E._instance)
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    return E._instance;
  }
  setRouter(e) {
    this.router = e;
  }
  getRouter() {
    return this.router;
  }
  isRouterExist() {
    return !C(this.router);
  }
  hasParameter(e) {
    return !C(e.params) || !C(e.query);
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
    const s = $(e, "/"), i = Z(s);
    return tt(i, "/");
  }
  toPrev(e) {
    if (e.path) {
      const s = this.getParent(e.path);
      this.to({ path: s });
    } else
      this.goBack();
  }
}
class R {
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
    if (R._initialized)
      throw new Error("SignOutUtilities has already been initialized");
    return R._instance = new R(e), R._initialized = !0, R._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!R._instance)
      throw new Error("SignOutUtilities not initialized. Call initialize() first.");
    return R._instance;
  }
  signOut(e = !1) {
    e || P().signOut(), this.extension(), console.log("Clear Framework Kernel Data"), P().$reset(), N().$reset(), E.getInstance().toSignIn();
  }
  signOutWithDialog() {
    S.fire({
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
    S.fire({
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
    return e && s && (i = e + ":" + s), M.BASIC + q.encode(i);
  }
  createClientData(e = "", s = "", i = "") {
    const n = {
      client_id: "",
      client_secret: ""
    };
    return e && s ? (n.client_id = e, n.client_secret = s) : (n.client_id = this.config.getClientId(), n.client_secret = this.config.getClientSecret()), i && z(n, { scope: i }), n;
  }
  createOAuth2Data(e, s, i = !1) {
    const n = {
      grant_type: e
    };
    return C(s) || z(n, s), i && z(n, { scope: "openid" }), n;
  }
  signOut(e, s = "", i = "") {
    return this.config.getHttp().put(
      this.getOAuth2SignOutAddress(),
      {
        accessToken: e
      },
      {
        contentType: O.URL_ENCODED
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
        contentType: O.URL_ENCODED
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
        D.REFRESH_TOKEN,
        { refresh_token: e },
        s
      ),
      {
        contentType: O.URL_ENCODED
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
        D.PASSWORD,
        { username: e, password: s },
        i
      ),
      {
        contentType: O.URL_ENCODED
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
        D.AUTHORIZATION_CODE,
        { code: e, state: i, redirect_uri: s },
        n
      ),
      {
        contentType: O.URL_ENCODED
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
      this.createOAuth2Data(D.CLIENT_CREDENTIALS, {
        ...this.createClientData(e, s, i)
      }),
      {
        contentType: O.URL_ENCODED
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
      this.createOAuth2Data(D.DEVICE_CODE, {
        device_code: e,
        ...this.createClientData(s, i, n)
      }),
      {
        contentType: O.URL_ENCODED
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
  deviceAuthorizationFlow(e = "", s = "", i = Q.EMAIL) {
    return this.config.getHttp().post(
      this.getOAuth2DeviceAuthorizationAddress(),
      this.createClientData(e, s, i),
      {
        contentType: O.URL_ENCODED
      }
    );
  }
  socialCredentialsFlowBySms(e, s, i = !1, n = "", r = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        D.SOCIAL_CREDENTIALS,
        { mobile: e, code: s, source: V.SMS },
        i
      ),
      {
        contentType: O.URL_ENCODED
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
        D.SOCIAL_CREDENTIALS,
        { ...s, source: e },
        i
      ),
      {
        contentType: O.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.createBasicHeader(n, r)
        }
      }
    );
  }
}
class K {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(e) {
    this.config = e;
  }
  static getInstance(e) {
    return this.instance == null && (this.instance = new K(e)), this.instance;
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
    return s === B.WORD_CLICK ? r.coordinates = i : s === B.JIGSAW ? r.coordinate = i : r.characters = i, this.config.getHttp().post(n, r);
  }
  createVerificationCode(e) {
    const s = this.config.getUpms() + "/open/identity/verification-code";
    return this.config.getHttp().post(
      s,
      {
        mobile: e
      },
      {
        contentType: O.URL_ENCODED
      }
    );
  }
  getSocialList() {
    const e = this.config.getUpms() + "/open/identity/sources";
    return this.config.getHttp().get(e);
  }
}
class l {
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
    if (l._initialized)
      throw new Error("SecurityApiResources has already been initialized");
    return l._instance = new l(e), l._initialized = !0, l._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!l._instance)
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    return l._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return K.getInstance(this.config);
  }
  oauth2() {
    return F.getInstance(this.config);
  }
}
const N = b("Crypto", {
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
      this.key = w.encrypt(t, h.getSecurityKey());
    },
    getKey() {
      return w.decrypt(this.key, h.getSecurityKey());
    },
    encrypt(t) {
      const e = this.getKey();
      return w.encrypt(t, e);
    },
    decrypt(t) {
      const e = this.getKey();
      return w.decrypt(t, e);
    },
    exchange(t = "") {
      return new Promise((e, s) => {
        l.getInstance().open().createSession(t).then((i) => {
          const n = i.data;
          if (n) {
            const r = n.sessionId, A = n.publicKey;
            this.state = n.state;
            const _ = U.createKeyPair(), d = U.encrypt(_.publicKey, A);
            l.getInstance().open().exchange(r, d).then((u) => {
              const o = u.data, v = U.decrypt(o, _.privateKey);
              this.setSessionId(r), this.setKey(v), e(v);
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
}), P = b("Authentication", {
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
      const e = x().add(t.expires_in, "seconds").valueOf();
      return x(e).add(1, "seconds").diff(x(), "seconds") !== 0;
    },
    token() {
      return h.isAutoRefreshToken() ? this.access_token : this.isNotExpired ? this.access_token : "";
    }
  },
  actions: {
    getBearerToken() {
      return M.BEARER + this.token;
    },
    getAuthorizationHeader() {
      return { Authorization: this.getBearerToken(), "X-Herodotus-Open-Id": this.userId };
    },
    saveAccessToken(t) {
      if (this.access_token = t.access_token, this.expires_in = t.expires_in, this.refresh_token = t.refresh_token ? t.refresh_token : "", this.license = t.refresh_token ? t.refresh_token : "", this.scope = t.scope, this.token_type = t.token_type, t.id_token) {
        this.idToken = t.id_token;
        const e = j(this.idToken);
        this.userId = e.openid, this.username = e.sub, this.avatar = e.avatar, this.employeeId = e.employeeId, this.roles = e.roles;
      } else if (t.openid) {
        const e = N();
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
      this.isAlertMessage(t) && l.getInstance().open().getPrompt(e).then((s) => {
        this.setUserErrorStatus(s.data);
      });
    },
    signIn(t, e) {
      const s = N();
      return h.isUseCrypto() && (t = s.encrypt(t), e = s.encrypt(e)), new Promise((i, n) => {
        l.getInstance().oauth2().passwordFlow(t, e, h.isUseCrypto()).then((r) => {
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
        l.getInstance().oauth2().refreshTokenFlow(this.refresh_token, h.isUseCrypto()).then((s) => {
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
      this.access_token && l.getInstance().oauth2().signOut(this.access_token).then(() => {
        console.log("Server side sign out successfully.");
      }).catch((t) => {
        console.log("Server side sign out has error.", t);
      });
    },
    authorizationCode(t, e = "") {
      return new Promise((s, i) => {
        l.getInstance().oauth2().authorizationCodeFlow(
          t,
          h.getRedirectUri(),
          e,
          h.isUseCrypto()
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
      const s = N();
      return h.isUseCrypto() && (t = s.encrypt(t), e = s.encrypt(e)), new Promise((i, n) => {
        l.getInstance().oauth2().socialCredentialsFlowBySms(t, e, h.isUseCrypto()).then((r) => {
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
        l.getInstance().oauth2().socialCredentialsFlowByJustAuth(t, e, h.isUseCrypto()).then((n) => {
          if (n) {
            const r = n;
            this.saveAccessToken(r);
          }
          this.access_token ? s(!0) : s(!1);
        }).catch((n) => {
          n.code && [40106, 40111].includes(n.code) && i(n);
        });
      });
    }
  },
  persist: !0
}), ft = () => {
  const t = P(), e = N(), s = t.access_token, i = e.sessionId, n = {};
  s && (n.Authorization = M.BEARER + s), i && (n["X-Herodotus-Session-Id"] = i);
  const r = h.getTenantId();
  return r && (n["X-Herodotus-Tenant-Id"] = r), n;
}, L = b("Router", {
  state: () => ({
    appMenus: [],
    personalMenus: [],
    cachedRoutes: [],
    details: new Map(/* @__PURE__ */ new Map()),
    pushParams: {}
  }),
  getters: {
    isDynamicRouteAdded() {
      return !C(this.appMenus) || !C(this.personalMenus);
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
      C(t) || (this.appMenus = t), C(e) || (this.personalMenus = e);
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
      return !!(e && et(this.pushParams, e));
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
}), at = b("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: y.SYSTEM,
      // 是否为混合主题，预留属性
      isMixed: !0,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: H.DEFAULT,
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
    isDark: (t) => t.theme.mode === y.DARK,
    isLight: (t) => t.theme.mode === y.LIGHT,
    isSystem: (t) => t.theme.mode === y.SYSTEM,
    isDefaultLayout: (t) => t.layout === H.DEFAULT,
    isClassicLayout: (t) => t.layout === H.CLASSIC
  },
  persist: !0
}), rt = b("TabsView", {
  state: () => ({
    tabs: [],
    activatedTab: {},
    activatedTabName: ""
  }),
  getters: {
    isNotLastTab: (t) => (e) => t.tabs.length - 1 !== e,
    getLastTabIndex: (t) => t.tabs.length - 1,
    getTabIndex: (t) => (e) => G(t.tabs, (s) => s.name === e.name),
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
      Y(() => {
        this.activatedTab = t, this.activatedTabName = t.name;
      });
    },
    isNotExistInStaticRoute(t) {
      return G(h.getRoutes(), (e) => e.path === t.path) === -1;
    },
    isTabNotOpened(t) {
      return this.getTabIndex(t) === -1;
    },
    openTab(t, e = !1) {
      this.isNotExistInStaticRoute(t) && (this.isTabNotOpened(t) && (e ? this.isLastTabActivated ? this.tabs.splice(this.getActivatedTabIndex, 0, t) : this.tabs.splice(this.getActivatedTabIndex + 1, 0, t) : this.tabs.push(t)), this.setActivatedTab(t));
    },
    closeTab(t) {
      k(this.tabs, (e) => e.name === t.name);
    },
    smartTab(t) {
      const e = L(), s = e.isDetailRoute(t), i = this.convertRouteToTab(t);
      s ? e.hasParameter(t) ? this.openTab(i, s) : (this.closeTab(i), E.getInstance().goBack()) : this.openTab(i, s);
    },
    deleteTab(t) {
      const e = this.convertRouteToTab(t);
      this.closeTab(e);
    },
    closeCurrentTab() {
      this.closeTab(this.activatedTab);
    },
    closeOtherTabs() {
      k(this.tabs, (t) => t.name !== this.activatedTab.name);
    },
    closeLeftTabs() {
      const t = this.getActivatedTabIndex;
      k(this.tabs, (e, s) => s < t);
    },
    closeRightTabs() {
      const t = this.getActivatedTabIndex;
      k(this.tabs, (e, s) => s > t);
    }
  },
  persist: !0
});
function Tt() {
  const t = J(), e = L(), s = rt();
  return {
    onFinish: () => {
      const n = t.name;
      e.removeRoutePushParam(n), s.deleteTab(t), E.getInstance().goBack();
    }
  };
}
function It() {
  L();
  const t = P(), e = (d) => d.meta?.title, s = (d) => d.meta?.icon, i = (d) => d.meta?.isHideAllChild, n = (d) => d.children, r = (d) => !!n(d);
  return {
    hasPermission: (d) => {
      const u = t.roles, o = d.meta?.roles;
      if (C(o))
        return !0;
      if (C(u))
        return !1;
      const v = st(u, o);
      return !C(v);
    },
    getItemTitle: e,
    getItemIcon: s,
    getItemChildren: n,
    isDisplayAsItem: (d) => r(d) ? !!i(d) : !0
  };
}
function At(t, e, s, i) {
  const n = (a) => a.meta?.isDetailContent, r = (a) => a.meta?.scenario, A = (a, g) => {
    const c = {};
    return c.path = a.name, c.component = g[s(a.componentPath)], a.componentName && (c.name = a.componentName), a.redirect && (c.redirect = a.redirect), c.meta = {
      scenario: a.scenario,
      icon: a.meta.icon,
      title: a.meta.title,
      ...a.meta.sort && { sort: a.meta.sort },
      ...a.meta.isHaveChild && { isHaveChild: a.meta.isHaveChild },
      ...a.meta.isNotKeepAlive && { isNotKeepAlive: a.meta.isNotKeepAlive },
      ...a.meta.isHideAllChild && { isHideAllChild: a.meta.isHideAllChild },
      ...a.meta.isDetailContent && { isDetailContent: a.meta.isDetailContent },
      ...a.meta.isIgnoreAuth && { isIgnoreAuth: a.meta.isIgnoreAuth }
    }, c;
  }, _ = (a, g) => {
    const c = L();
    return a.map((p) => {
      const f = A(p, g);
      return n(f) && c.addDetailRoute(f), p.children && p.children.length > 0 && (f.children = _(p.children, g)), f;
    });
  }, d = () => {
    const a = [], g = t;
    return Object.keys(g).forEach((c) => {
      const f = g[c].default || {}, T = Array.isArray(f) ? [...f] : [f];
      a.push(...T);
    }), a;
  }, u = (a, g) => {
    const c = a.meta?.sort || 0, p = g.meta?.sort || 0;
    return c - p;
  }, o = (a, g) => {
    const c = L();
    if (console.log("[Herodotus] |- Begin add dynamic routes"), C(g))
      console.warn("[Herodotus] |- Dynamic routes is empty, skip!");
    else {
      const p = [], f = [];
      g.forEach((T) => {
        a.addRoute(T), r(T) === X.APP ? p.push(T) : f.push(T);
      }), c.addMenus(p, f), console.log("[Herodotus] |- Dynamic routes add success!");
    }
  };
  return {
    initBackEndRoutes: async (a, g) => {
      const p = (await i(g)).data.menus, T = _(p, e);
      console.log("---routes---", T), o(a, T);
    },
    initFrontEndRoutes: async (a) => {
      const c = d().sort(u);
      console.log(c), o(a, c);
    }
  };
}
function Et() {
  let t;
  const e = at(), s = it(y.DARK), i = typeof window < "u", n = () => {
    if (i)
      return window.matchMedia("(prefers-color-scheme: dark)");
  }, r = () => {
    s.value = t.matches ? y.DARK : y.LIGHT;
  }, A = (u) => {
    if (!u || u.nodeType !== Node.ELEMENT_NODE) return !1;
    const o = window.getComputedStyle(u);
    return o.overflowY === "scroll" || o.overflowY === "auto" && u.scrollHeight > u.clientHeight;
  }, _ = () => {
    const u = performance.now();
    if (performance.now() - u > 10) return;
    const o = document.querySelector("[data-v-app]");
    o.querySelectorAll("*").forEach((I) => {
      A(I) && (I.dataset.scrollX = String(I.scrollLeft), I.dataset.scrollY = String(I.scrollTop));
    });
    const m = o.cloneNode(!0);
    m.classList.add("app-copy");
    const a = o.getBoundingClientRect();
    m.style.top = a.top + "px", m.style.left = a.left + "px", m.style.width = a.width + "px", m.style.height = a.height + "px";
    const c = document.activeElement.getBoundingClientRect(), p = c.left + c.width / 2 + window.scrollX, f = c.top + c.height / 2 + window.scrollY;
    o.style.setProperty("--clip-pos", `${p}px ${f}px`), o.style.removeProperty("--clip-size"), Y(() => {
      o.classList.add("app-transition"), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          o.style.setProperty(
            "--clip-size",
            Math.hypot(window.innerWidth, window.innerHeight) + "px"
          );
        });
      });
    }), document.body.append(m), m.querySelectorAll("[data-scroll-x], [data-scroll-y]").forEach(
      (I) => {
        I.scrollLeft = Number(I.dataset.scrollX), I.scrollTop = Number(I.dataset.scrollY);
      }
    );
    function T(I) {
      I.target === I.currentTarget && (m.remove(), o.removeEventListener("transitionend", T), o.removeEventListener("transitioncancel", T), o.classList.remove("app-transition"), o.style.removeProperty("--clip-size"), o.style.removeProperty("--clip-pos"));
    }
    o.addEventListener("transitionend", T), o.addEventListener("transitioncancel", T);
  };
  W(
    () => e.theme.mode,
    (u) => {
      u === y.SYSTEM ? (t = n(), t.addEventListener("change", r), r()) : t && t.removeEventListener("change", r);
    },
    { immediate: !0 }
  );
  const d = nt(() => e.isSystem ? s.value : e.theme.mode);
  return W(d, _), {
    theme: d
  };
}
const Ct = (t) => {
  h.initialize(t), E.initialize(t.router), l.initialize(t.config), R.initialize(t.signOutExtension);
};
export {
  B as CaptchaCategoryEnum,
  H as LayoutModeEnum,
  X as MenuScenario,
  h as OptionsUtilities,
  E as RouterUtilities,
  l as SecurityApiResources,
  R as SignOutUtilities,
  V as SocialSourceEnum,
  y as ThemeModeEnum,
  ft as getSystemHeaders,
  Ct as initializer,
  pt as useApplicationStore,
  P as useAuthenticationStore,
  N as useCryptoStore,
  Tt as useEditFinish,
  L as useRouterStore,
  at as useSettingsStore,
  It as useSystemMenu,
  At as useSystemRoute,
  Et as useSystemTheme,
  rt as useTabsViewStore
};
