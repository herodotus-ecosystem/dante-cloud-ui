import {
    header,
    http,
    axios,
    storage,
    storageSync,
    authrization,
    notify,
    swal,
    moment,
    utils,
} from "./http";

/**
 * 基础服务地址
 */
const GATEWAY_ADDRESS = process.env.VUE_APP_GATEWAY;
const UAA_ADDRESS = GATEWAY_ADDRESS + "/eurynome-cloud-platform-uaa";
const UPMS_ADDRESS = GATEWAY_ADDRESS + "/eurynome-cloud-upms-rest";
/**
 * 获取Token基本参数
 */
const CLIENT_ID = process.env.VUE_APP_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.VUE_APP_OAUTH_CLIENT_SECRET;
const GRANT_TYPE = process.env.VUE_APP_OAUTH_GRANT_TYPE;
/**
 * OAuth2基础操作
 */
const OAUTH_TOKEN_URL = UAA_ADDRESS + "/oauth/token";
const OAUTH_LOGOUT_URL = UAA_ADDRESS + "/logout/quit";
/**
 * UPMS服务接口
 */
const UPMS_CONSTANTS_URL = UPMS_ADDRESS + "/constants";
const UPMS_CONSTANTS_ENUM_URL = UPMS_CONSTANTS_URL + "/enums";
const UPMS_OAUTH_APPLICATION_URL = UPMS_ADDRESS + "/oauth/applications";
const UPMS_OAUTH_SCOPE_URL = UPMS_ADDRESS + "/oauth/scopes";

const UPMS_SYS_USER_URL = UPMS_ADDRESS + "/user";
const UPMS_SYS_ROLE_URL = UPMS_ADDRESS + "/role";
const UPMS_SYS_AUTHORITY_URL = UPMS_ADDRESS + "/authority";
const UPMS_SYS_AUTHORITY_TREE_URL = UPMS_SYS_AUTHORITY_URL + "/tree";
const UPMS_SYS_AUTHORITY_API_URL = UPMS_SYS_AUTHORITY_URL + "/apis";

const api = {
    auth: {
        login: (username, password) =>
            http.post(
                OAUTH_TOKEN_URL,
                {
                    username: username,
                    password: password,
                    grant_type: GRANT_TYPE,
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    scope: "all",
                },
                "urlencoded"
            ),
        logout: () => {},

        cleanStorage: async () => await storage.clear(),
    },
    upms: {
        constants: {
            fetchAllEnums: (params) =>
                http.get(UPMS_CONSTANTS_ENUM_URL, params),
        },
        oauthApplications: {
            fetch: (params) => http.get(UPMS_OAUTH_APPLICATION_URL, params),
            saveOrUpdate: (data) => http.post(UPMS_OAUTH_APPLICATION_URL, data),
            delete: (data) => http.delete(UPMS_OAUTH_APPLICATION_URL, data),
            assignScope: (data) =>
                http.put(UPMS_OAUTH_APPLICATION_URL, data, "urlencoded"),
        },
        oauthScopes: {
            fetch: (params) => http.get(UPMS_OAUTH_SCOPE_URL, params),
            saveOrUpdate: (data) => http.post(UPMS_OAUTH_SCOPE_URL, data),
            delete: (data) => http.delete(UPMS_OAUTH_SCOPE_URL, data),
            assignAuthority: (data) =>
                http.put(UPMS_OAUTH_SCOPE_URL, data, "urlencoded"),
        },
        sysUser: {
            fetch: (params) => http.get(UPMS_SYS_USER_URL, params),
            saveOrUpdate: (data) => http.post(UPMS_SYS_USER_URL, data),
            delete: (data) => http.delete(UPMS_SYS_USER_URL, data),
        },
        sysRole: {
            fetch: (params) => http.get(UPMS_SYS_ROLE_URL, params),
            saveOrUpdate: (data) => http.post(UPMS_SYS_ROLE_URL, data),
            delete: (data) => http.delete(UPMS_SYS_ROLE_URL, data),
            assignAuthority: (data) => http.put(UPMS_SYS_ROLE_URL, data),
        },
        sysAuthority: {
            fetch: (params) => http.get(UPMS_SYS_AUTHORITY_URL, params),
            saveOrUpdate: (data) => http.post(UPMS_SYS_AUTHORITY_URL, data),
            delete: (data) => http.delete(UPMS_SYS_AUTHORITY_URL, data),
            fetchAuthorityTree: () => http.get(UPMS_SYS_AUTHORITY_TREE_URL),
            fetchAuthorityApis: () => http.get(UPMS_SYS_AUTHORITY_API_URL),
        },
    },
};

export {
    header,
    http,
    axios,
    storage,
    storageSync,
    authrization,
    notify,
    swal,
    moment,
    utils,
    api,
};
