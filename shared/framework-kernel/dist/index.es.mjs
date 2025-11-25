import { useRoute as Y } from "vue-router";
import { defineStore as b } from "pinia";
import { lodash as o, Swal as F, AuthorizationTokenEnum as z, Base64 as V, ContentTypeEnum as C, AuthorizationGrantTypeEnum as v, BuildInScopeEnum as X, SM2Utils as P, SM4Utils as w, moment as U } from "@herodotus-cloud/core";
import { jwtDecode as J } from "jwt-decode";
import { nextTick as S, shallowRef as q, watch as K, computed as Q } from "vue";
import "pinia-plugin-persistedstate";
var k = /* @__PURE__ */ ((t) => (t.DEFAULT = "defaults", t.CLASSIC = "classic", t.TRANSVERSE = "transverse", t.COLUMNS = "transverse", t))(k || {}), R = /* @__PURE__ */ ((t) => (t.DARK = "dark", t.LIGHT = "light", t.SYSTEM = "system", t))(R || {}), x = /* @__PURE__ */ ((t) => (t.JIGSAW = "JIGSAW", t.WORD_CLICK = "WORD_CLICK", t.ARITHMETIC = "ARITHMETIC", t.CHINESE = "CHINESE", t.CHINESE_GIF = "CHINESE_GIF", t.SPEC_GIF = "SPEC_GIF", t.SPEC = "SPEC", t.HUTOOL_LINE = "HUTOOL_LINE", t.HUTOOL_CIRCLE = "HUTOOL_CIRCLE", t.HUTOOL_SHEAR = "HUTOOL_SHEAR", t.HUTOOL_GIF = "HUTOOL_GIF", t))(x || {}), G = /* @__PURE__ */ ((t) => (t.INSTITUTION = "INSTITUTION", t.SMS = "SMS", t.WXAPP = "WXAPP", t.QQ = "QQ", t.WEIBO = "WEIBO", t.BAIDU = "BAIDU", t.WECHAT_OPEN = "WECHAT_OPEN", t.WECHAT_MP = "WECHAT_MP", t.WECHAT_ENTERPRISE = "WECHAT_ENTERPRISE", t.WECHAT_ENTERPRISE_WEB = "WECHAT_ENTERPRISE_WEB", t.DINGTALK = "DINGTALK", t.DINGTALK_ACCOUNT = "DINGTALK_ACCOUNT", t.ALIYUN = "ALIYUN", t.TAOBAO = "TAOBAO", t.ALIPAY = "ALIPAY", t.TEAMBITION = "TEAMBITION", t.HUAWEI_V2 = "HUAWEI_V2", t.FEISHU = "FEISHU", t.JD = "JD", t.DOUYIN = "DOUYIN", t.TOUTIAO = "TOUTIAO", t.MI = "MI", t.RENREN = "RENREN", t.MEITUAN = "MEITUAN", t.ELEME = "ELEME", t.KUJIALE = "KUJIALE", t.XMLY = "XMLY", t.GITEE = "GITEE", t.OSCHINA = "OSCHINA", t.CSDN = "CSDN", t.GITHUB = "GITHUB", t.GITLAB = "GITLAB", t.STACK_OVERFLOW = "STACK_OVERFLOW", t.CODING = "CODING", t.GOOGLE = "GOOGLE", t.MICROSOFT = "MICROSOFT", t.FACEBOOK = "FACEBOOK", t.LINKEDIN = "LINKEDIN", t.TWITTER = "TWITTER", t.AMAZON = "AMAZON", t.SLACK = "SLACK", t.LINE = "LINE", t.OKTA = "OKTA", t.PINTEREST = "PINTEREST", t))(G || {}), W = /* @__PURE__ */ ((t) => (t.APP = "APP", t.PERSONAL = "PERSONAL", t))(W || {});
const at = b("Application", {
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
class d {
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
    if (d._initialized)
      throw new Error("RouterUtilities has already been initialized");
    return d._instance = new d(e), d._initialized = !0, d._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!d._instance)
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    return d._instance;
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
    return !o.isEmpty(this.router);
  }
  hasParameter(e) {
    return !o.isEmpty(e.params) || !o.isEmpty(e.query);
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
    const s = o.split(e, "/"), i = o.dropRight(s);
    return o.join(i, "/");
  }
  toPrev(e) {
    if (e.path) {
      const s = this.getParent(e.path);
      this.to({ path: s });
    } else
      this.goBack();
  }
}
class O {
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
    if (O._initialized)
      throw new Error("SignOutUtilities has already been initialized");
    return O._instance = new O(e), O._initialized = !0, O._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!O._instance)
      throw new Error("SignOutUtilities not initialized. Call initialize() first.");
    return O._instance;
  }
  signOut(e = !1) {
    e || H().signOut(), this.extension(), console.log("Clear Framework Kernel Data"), H().$reset(), N().$reset(), m.getInstance().toSignIn();
  }
  signOutWithDialog() {
    F.fire({
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
    F.fire({
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
class B {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(e) {
    this.config = e;
  }
  static getInstance(e) {
    return this.instance == null && (this.instance = new B(e)), this.instance;
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
    return e && s && (i = e + ":" + s), z.BASIC + V.encode(i);
  }
  createClientData(e = "", s = "", i = "") {
    const n = {
      client_id: "",
      client_secret: ""
    };
    return e && s ? (n.client_id = e, n.client_secret = s) : (n.client_id = this.config.getClientId(), n.client_secret = this.config.getClientSecret()), i && o.merge(n, { scope: i }), n;
  }
  createOAuth2Data(e, s, i = !1) {
    const n = {
      grant_type: e
    };
    return o.isEmpty(s) || o.merge(n, s), i && o.merge(n, { scope: "openid" }), n;
  }
  signOut(e, s = "", i = "") {
    return this.config.getHttp().put(
      this.getOAuth2SignOutAddress(),
      {
        accessToken: e
      },
      {
        contentType: C.URL_ENCODED
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
        contentType: C.URL_ENCODED
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
        v.REFRESH_TOKEN,
        { refresh_token: e },
        s
      ),
      {
        contentType: C.URL_ENCODED
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
        v.PASSWORD,
        { username: e, password: s },
        i
      ),
      {
        contentType: C.URL_ENCODED
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
  authorizationCodeFlow(e, s, i = "", n = !1, r = "", E = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        v.AUTHORIZATION_CODE,
        { code: e, state: i, redirect_uri: s },
        n
      ),
      {
        contentType: C.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.createBasicHeader(r, E)
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
      this.createOAuth2Data(v.CLIENT_CREDENTIALS, {
        ...this.createClientData(e, s, i)
      }),
      {
        contentType: C.URL_ENCODED
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
      this.createOAuth2Data(v.DEVICE_CODE, {
        device_code: e,
        ...this.createClientData(s, i, n)
      }),
      {
        contentType: C.URL_ENCODED
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
  deviceAuthorizationFlow(e = "", s = "", i = X.EMAIL) {
    return this.config.getHttp().post(
      this.getOAuth2DeviceAuthorizationAddress(),
      this.createClientData(e, s, i),
      {
        contentType: C.URL_ENCODED
      }
    );
  }
  socialCredentialsFlowBySms(e, s, i = !1, n = "", r = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        v.SOCIAL_CREDENTIALS,
        { mobile: e, code: s, source: G.SMS },
        i
      ),
      {
        contentType: C.URL_ENCODED
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
        v.SOCIAL_CREDENTIALS,
        { ...s, source: e },
        i
      ),
      {
        contentType: C.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.createBasicHeader(n, r)
        }
      }
    );
  }
}
class M {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(e) {
    this.config = e;
  }
  static getInstance(e) {
    return this.instance == null && (this.instance = new M(e)), this.instance;
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
    return s === x.WORD_CLICK ? r.coordinates = i : s === x.JIGSAW ? r.coordinate = i : r.characters = i, this.config.getHttp().post(n, r);
  }
  createVerificationCode(e) {
    const s = this.config.getUpms() + "/open/identity/verification-code";
    return this.config.getHttp().post(
      s,
      {
        mobile: e
      },
      {
        contentType: C.URL_ENCODED
      }
    );
  }
  getSocialList() {
    const e = this.config.getUpms() + "/open/identity/sources";
    return this.config.getHttp().get(e);
  }
}
class u {
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
    if (u._initialized)
      throw new Error("SecurityApiResources has already been initialized");
    return u._instance = new u(e), u._initialized = !0, u._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!u._instance)
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    return u._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return M.getInstance(this.config);
  }
  oauth2() {
    return B.getInstance(this.config);
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
      this.key = w.encrypt(t, d.getSecurityKey());
    },
    getKey() {
      return w.decrypt(this.key, d.getSecurityKey());
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
        u.getInstance().open().createSession(t).then((i) => {
          const n = i.data;
          if (n) {
            const r = n.sessionId, E = n.publicKey;
            this.state = n.state;
            const _ = P.createKeyPair(), l = P.encrypt(_.publicKey, E);
            u.getInstance().open().exchange(r, l).then((p) => {
              const c = p.data, D = P.decrypt(c, _.privateKey);
              this.setSessionId(r), this.setKey(D), e(D);
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
}), H = b("Authentication", {
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
      const e = U().add(t.expires_in, "seconds").valueOf();
      return U(e).add(1, "seconds").diff(U(), "seconds") !== 0;
    },
    token() {
      return d.isAutoRefreshToken() ? this.access_token : this.isNotExpired ? this.access_token : "";
    }
  },
  actions: {
    getBearerToken() {
      return z.BEARER + this.token;
    },
    getAuthorizationHeader() {
      return { Authorization: this.getBearerToken(), "X-Herodotus-Open-Id": this.userId };
    },
    saveAccessToken(t) {
      if (this.access_token = t.access_token, this.expires_in = t.expires_in, this.refresh_token = t.refresh_token ? t.refresh_token : "", this.license = t.refresh_token ? t.refresh_token : "", this.scope = t.scope, this.token_type = t.token_type, t.id_token) {
        this.idToken = t.id_token;
        const e = J(this.idToken);
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
      this.isAlertMessage(t) && u.getInstance().open().getPrompt(e).then((s) => {
        this.setUserErrorStatus(s.data);
      });
    },
    signIn(t, e) {
      const s = N();
      return d.isUseCrypto() && (t = s.encrypt(t), e = s.encrypt(e)), new Promise((i, n) => {
        u.getInstance().oauth2().passwordFlow(t, e, d.isUseCrypto()).then((r) => {
          if (r) {
            const E = r;
            this.saveAccessToken(E);
          }
          this.access_token ? i(!0) : i(!1);
        }).catch((r) => {
          this.setErrorPrompt(r, t), n(r);
        });
      });
    },
    refreshToken() {
      return new Promise((t, e) => {
        u.getInstance().oauth2().refreshTokenFlow(this.refresh_token, d.isUseCrypto()).then((s) => {
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
      this.access_token && u.getInstance().oauth2().signOut(this.access_token).then(() => {
        console.log("Server side sign out successfully.");
      }).catch((t) => {
        console.log("Server side sign out has error.", t);
      });
    },
    authorizationCode(t, e = "") {
      return new Promise((s, i) => {
        u.getInstance().oauth2().authorizationCodeFlow(
          t,
          d.getRedirectUri(),
          e,
          d.isUseCrypto()
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
      return d.isUseCrypto() && (t = s.encrypt(t), e = s.encrypt(e)), new Promise((i, n) => {
        u.getInstance().oauth2().socialCredentialsFlowBySms(t, e, d.isUseCrypto()).then((r) => {
          if (r) {
            const E = r;
            this.saveAccessToken(E);
          }
          this.access_token ? i(!0) : i(!1);
        }).catch((r) => {
          this.setErrorPrompt(r, t), n(r);
        });
      });
    },
    socialSignIn(t, e) {
      return new Promise((s, i) => {
        u.getInstance().oauth2().socialCredentialsFlowByJustAuth(t, e, d.isUseCrypto()).then((n) => {
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
}), rt = () => {
  const t = H(), e = N(), s = t.access_token, i = e.sessionId, n = {};
  s && (n.Authorization = z.BEARER + s), i && (n["X-Herodotus-Session-Id"] = i);
  const r = d.getTenantId();
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
      return !o.isEmpty(this.appMenus) || !o.isEmpty(this.personalMenus);
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
      o.isEmpty(t) || (this.appMenus = t), o.isEmpty(e) || (this.personalMenus = e);
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
      return !!(e && o.has(this.pushParams, e));
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
}), j = b("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: R.SYSTEM,
      // 是否为混合主题，预留属性
      isMixed: !0,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: k.DEFAULT,
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
    isDark: (t) => t.theme.mode === R.DARK,
    isLight: (t) => t.theme.mode === R.LIGHT,
    isSystem: (t) => t.theme.mode === R.SYSTEM,
    isDefaultLayout: (t) => t.layout === k.DEFAULT,
    isClassicLayout: (t) => t.layout === k.CLASSIC
  },
  persist: !0
}), $ = b("TabsView", {
  state: () => ({
    tabs: [],
    activatedTab: {},
    activatedTabName: ""
  }),
  getters: {
    isNotLastTab: (t) => (e) => t.tabs.length - 1 !== e,
    getLastTabIndex: (t) => t.tabs.length - 1,
    getTabIndex: (t) => (e) => o.findIndex(t.tabs, (s) => s.name === e.name),
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
      S(() => {
        this.activatedTab = t, this.activatedTabName = t.name;
      });
    },
    isNotExistInStaticRoute(t) {
      return o.findIndex(d.getRoutes(), (e) => e.path === t.path) === -1;
    },
    isTabNotOpened(t) {
      return this.getTabIndex(t) === -1;
    },
    openTab(t, e = !1) {
      this.isNotExistInStaticRoute(t) && (this.isTabNotOpened(t) && (e ? this.isLastTabActivated ? this.tabs.splice(this.getActivatedTabIndex, 0, t) : this.tabs.splice(this.getActivatedTabIndex + 1, 0, t) : this.tabs.push(t)), this.setActivatedTab(t));
    },
    closeTab(t) {
      o.remove(this.tabs, (e) => e.name === t.name);
    },
    smartTab(t) {
      const e = L(), s = e.isDetailRoute(t), i = this.convertRouteToTab(t);
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
      o.remove(this.tabs, (t) => t.name !== this.activatedTab.name);
    },
    closeLeftTabs() {
      const t = this.getActivatedTabIndex;
      o.remove(this.tabs, (e, s) => s < t);
    },
    closeRightTabs() {
      const t = this.getActivatedTabIndex;
      o.remove(this.tabs, (e, s) => s > t);
    }
  },
  persist: !0
});
function ot() {
  const t = Y(), e = L(), s = $();
  return {
    onFinish: () => {
      const n = t.name;
      e.removeRoutePushParam(n), s.deleteTab(t), m.getInstance().goBack();
    }
  };
}
function ct() {
  L();
  const t = H(), e = (l) => l.meta?.title, s = (l) => l.meta?.icon, i = (l) => l.meta?.isHideAllChild, n = (l) => l.children, r = (l) => !!n(l);
  return {
    hasPermission: (l) => {
      const p = t.roles, c = l.meta?.roles;
      if (o.isEmpty(c))
        return !0;
      if (o.isEmpty(p))
        return !1;
      const D = o.intersection(p, c);
      return !o.isEmpty(D);
    },
    getItemTitle: e,
    getItemIcon: s,
    getItemChildren: n,
    isDisplayAsItem: (l) => r(l) ? !!i(l) : !0
  };
}
function ht(t, e, s, i) {
  const n = (a) => a.meta?.isDetailContent, r = (a) => a.meta?.scenario, E = (a, g) => {
    const h = {};
    return h.path = a.name, h.component = g[s(a.componentPath)], a.componentName && (h.name = a.componentName), a.redirect && (h.redirect = a.redirect), h.meta = {
      scenario: a.scenario,
      icon: a.meta.icon,
      title: a.meta.title,
      ...a.meta.sort && { sort: a.meta.sort },
      ...a.meta.isHaveChild && { isHaveChild: a.meta.isHaveChild },
      ...a.meta.isNotKeepAlive && { isNotKeepAlive: a.meta.isNotKeepAlive },
      ...a.meta.isHideAllChild && { isHideAllChild: a.meta.isHideAllChild },
      ...a.meta.isDetailContent && { isDetailContent: a.meta.isDetailContent },
      ...a.meta.isIgnoreAuth && { isIgnoreAuth: a.meta.isIgnoreAuth }
    }, h;
  }, _ = (a, g) => {
    const h = L();
    return a.map((f) => {
      const T = E(f, g);
      return n(T) && h.addDetailRoute(T), f.children && f.children.length > 0 && (T.children = _(f.children, g)), T;
    });
  }, l = () => {
    const a = [], g = t;
    return Object.keys(g).forEach((h) => {
      const T = g[h].default || {}, I = Array.isArray(T) ? [...T] : [T];
      a.push(...I);
    }), a;
  }, p = (a, g) => {
    const h = a.meta?.sort || 0, f = g.meta?.sort || 0;
    return h - f;
  }, c = (a, g) => {
    const h = L();
    if (console.log("[Herodotus] |- Begin add dynamic routes"), o.isEmpty(g))
      console.warn("[Herodotus] |- Dynamic routes is empty, skip!");
    else {
      const f = [], T = [];
      g.forEach((I) => {
        a.addRoute(I), r(I) === W.APP ? f.push(I) : T.push(I);
      }), h.addMenus(f, T), console.log("[Herodotus] |- Dynamic routes add success!");
    }
  };
  return {
    initBackEndRoutes: async (a, g) => {
      const f = (await i(g)).data.menus, I = _(f, e);
      console.log("---routes---", I), c(a, I);
    },
    initFrontEndRoutes: async (a) => {
      const h = l().sort(p);
      console.log(h), c(a, h);
    }
  };
}
function dt() {
  let t;
  const e = j(), s = q(R.DARK), i = typeof window < "u", n = () => {
    if (i)
      return window.matchMedia("(prefers-color-scheme: dark)");
  }, r = () => {
    s.value = t.matches ? R.DARK : R.LIGHT;
  }, E = (p) => {
    if (!p || p.nodeType !== Node.ELEMENT_NODE) return !1;
    const c = window.getComputedStyle(p);
    return c.overflowY === "scroll" || c.overflowY === "auto" && p.scrollHeight > p.clientHeight;
  }, _ = () => {
    const p = performance.now();
    if (performance.now() - p > 10) return;
    const c = document.querySelector("[data-v-app]");
    c.querySelectorAll("*").forEach((A) => {
      E(A) && (A.dataset.scrollX = String(A.scrollLeft), A.dataset.scrollY = String(A.scrollTop));
    });
    const y = c.cloneNode(!0);
    y.classList.add("app-copy");
    const a = c.getBoundingClientRect();
    y.style.top = a.top + "px", y.style.left = a.left + "px", y.style.width = a.width + "px", y.style.height = a.height + "px";
    const h = document.activeElement.getBoundingClientRect(), f = h.left + h.width / 2 + window.scrollX, T = h.top + h.height / 2 + window.scrollY;
    c.style.setProperty("--clip-pos", `${f}px ${T}px`), c.style.removeProperty("--clip-size"), S(() => {
      c.classList.add("app-transition"), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          c.style.setProperty(
            "--clip-size",
            Math.hypot(window.innerWidth, window.innerHeight) + "px"
          );
        });
      });
    }), document.body.append(y), y.querySelectorAll("[data-scroll-x], [data-scroll-y]").forEach(
      (A) => {
        A.scrollLeft = Number(A.dataset.scrollX), A.scrollTop = Number(A.dataset.scrollY);
      }
    );
    function I(A) {
      A.target === A.currentTarget && (y.remove(), c.removeEventListener("transitionend", I), c.removeEventListener("transitioncancel", I), c.classList.remove("app-transition"), c.style.removeProperty("--clip-size"), c.style.removeProperty("--clip-pos"));
    }
    c.addEventListener("transitionend", I), c.addEventListener("transitioncancel", I);
  };
  K(
    () => e.theme.mode,
    (p) => {
      p === R.SYSTEM ? (t = n(), t.addEventListener("change", r), r()) : t && t.removeEventListener("change", r);
    },
    { immediate: !0 }
  );
  const l = Q(() => e.isSystem ? s.value : e.theme.mode);
  return K(l, _), {
    theme: l
  };
}
const lt = (t) => {
  d.initialize(t), m.initialize(t.router), u.initialize(t.config), O.initialize(t.signOutExtension);
};
export {
  x as CaptchaCategoryEnum,
  k as LayoutModeEnum,
  W as MenuScenario,
  d as OptionsUtilities,
  m as RouterUtilities,
  u as SecurityApiResources,
  O as SignOutUtilities,
  G as SocialSourceEnum,
  R as ThemeModeEnum,
  rt as getSystemHeaders,
  lt as initializer,
  at as useApplicationStore,
  H as useAuthenticationStore,
  N as useCryptoStore,
  ot as useEditFinish,
  L as useRouterStore,
  j as useSettingsStore,
  ct as useSystemMenu,
  ht as useSystemRoute,
  dt as useSystemTheme,
  $ as useTabsViewStore
};
