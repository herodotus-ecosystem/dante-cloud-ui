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
const UAA_ADDRESS = GATEWAY_ADDRESS + "/eurynome-cloud-uaa";
const UPMS_ADDRESS = GATEWAY_ADDRESS + "/eurynome-cloud-upms-rest";
const BPMN_ADDRESS = GATEWAY_ADDRESS + "/eurynome-cloud-bpmn-rest/engine-rest";
/**
 * 获取Token基本参数
 */
const CLIENT_ID = process.env.VUE_APP_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.VUE_APP_OAUTH_CLIENT_SECRET;
const GRANT_TYPE = process.env.VUE_APP_OAUTH_GRANT_TYPE;
/**
 * OAuth2基础操作
 */
const OAUTH_TOKEN = UAA_ADDRESS + "/oauth/token";
const OAUTH_LOGOUT = UAA_ADDRESS + "/identity/logout";
/**
 * UPMS服务接口
 */
const UPMS_CONSTANTS = UPMS_ADDRESS + "/constants";
const UPMS_CONSTANTS_ENUM = UPMS_CONSTANTS + "/enums";
const UPMS_OAUTH_APPLICATION = UPMS_ADDRESS + "/oauth/applications";
const UPMS_OAUTH_SCOPE = UPMS_ADDRESS + "/oauth/scopes";
const UPMS_OAUTH_CLIENTDETAIL = UPMS_ADDRESS + "/oauth/client_details";
const UPMS_OAUTH_MICROSERVICE = UPMS_ADDRESS + "/oauth/microservices";
const UPMS_OAUTH_MICROSERVICE_CONFIG = UPMS_OAUTH_MICROSERVICE + "/config";

const UPMS_SYS_USER = UPMS_ADDRESS + "/user";
const UPMS_SYS_ROLE = UPMS_ADDRESS + "/role";
const UPMS_SYS_AUTHORITY = UPMS_ADDRESS + "/authority";
const UPMS_SYS_AUTHORITY_TREE = UPMS_SYS_AUTHORITY + "/tree";
const UPMS_SYS_AUTHORITY_API = UPMS_SYS_AUTHORITY + "/apis";

const UPMS_SYS_ORGANIZATION = UPMS_ADDRESS + "/organization";
const UPMS_SYS_ORGANIZATION_LIST = UPMS_SYS_ORGANIZATION + "/list";
const UPMS_SYS_DEPARTMENT = UPMS_ADDRESS + "/department";
const UPMS_SYS_DEPARTMENT_LIST = UPMS_SYS_DEPARTMENT + "/list";
const UPMS_SYS_EMPLOYEE = UPMS_ADDRESS + "/employee";
const UPMS_SYS_EMPLOYEE_LIST = UPMS_SYS_EMPLOYEE + "/list";
const UPMS_SYS_POSITION = UPMS_ADDRESS + "/position";

const UPMS_DEVELOPMENT_SUPPLIER = UPMS_ADDRESS + "/microservice/supplier";
const UPMS_DEVELOPMENT_SUPPLIER_ALL = UPMS_DEVELOPMENT_SUPPLIER + "/list";

/**
 * BPMN服务接口
 */
const BPMN_PROCESS_DEFINITION = BPMN_ADDRESS + "/deployment";
const BPMN_PROCESS_DEFINITION_COUNT = BPMN_PROCESS_DEFINITION + "/count";
const BPMN_PROCESS_DEFINITION_CREATE = BPMN_PROCESS_DEFINITION + "/create";

const api = {
    auth: {
        login: (username, password) =>
            http.post(
                OAUTH_TOKEN,
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
        logout: (token) => http.get(OAUTH_LOGOUT, { access_token: token }),

        cleanStorage: async () => await storage.clear(),
    },
    upms: {
        constants: {
            fetchAllEnums: (params) => http.get(UPMS_CONSTANTS_ENUM, params),
        },
        oauthApplications: {
            fetch: (params) => http.get(UPMS_OAUTH_APPLICATION, params),
            saveOrUpdate: (data) => http.post(UPMS_OAUTH_APPLICATION, data),
            delete: (data) => http.delete(UPMS_OAUTH_APPLICATION, data),
            assignScope: (data) =>
                http.put(UPMS_OAUTH_APPLICATION, data, "urlencoded"),
        },
        oauthScopes: {
            fetch: (params) => http.get(UPMS_OAUTH_SCOPE, params),
            saveOrUpdate: (data) => http.post(UPMS_OAUTH_SCOPE, data),
            delete: (data) => http.delete(UPMS_OAUTH_SCOPE, data),
            assignAuthority: (data) =>
                http.put(UPMS_OAUTH_SCOPE, data, "urlencoded"),
        },
        oauthClientDetails: {
            fetch: (params) => http.get(UPMS_OAUTH_CLIENTDETAIL, params),
            saveOrUpdate: (data) => http.post(UPMS_OAUTH_CLIENTDETAIL, data),
            delete: (data) => http.delete(UPMS_OAUTH_CLIENTDETAIL, data),
        },
        oauthMicroservices: {
            fetch: (params) => http.get(UPMS_OAUTH_MICROSERVICE, params),
            saveOrUpdate: (data) => http.post(UPMS_OAUTH_MICROSERVICE, data),
            delete: (data) => http.delete(UPMS_OAUTH_MICROSERVICE, data),
            assignScope: (data) =>
                http.put(UPMS_OAUTH_MICROSERVICE, data, "urlencoded"),
            publishConfig: (data) =>
                http.post(UPMS_OAUTH_MICROSERVICE_CONFIG, data, "urlencoded"),
            removeConfig: (data) =>
                http.delete(UPMS_OAUTH_MICROSERVICE_CONFIG, data),
        },
        sysUser: {
            fetch: (params) => http.get(UPMS_SYS_USER, params),
            saveOrUpdate: (data) => http.post(UPMS_SYS_USER, data),
            delete: (data) => http.delete(UPMS_SYS_USER, data),
            assignRole: (data) => http.put(UPMS_SYS_USER, data, "urlencoded"),
        },
        sysRole: {
            fetch: (params) => http.get(UPMS_SYS_ROLE, params),
            saveOrUpdate: (data) => http.post(UPMS_SYS_ROLE, data),
            delete: (data) => http.delete(UPMS_SYS_ROLE, data),
            assignAuthority: (data) => http.put(UPMS_SYS_ROLE, data),
        },
        sysAuthority: {
            fetch: (params) => http.get(UPMS_SYS_AUTHORITY, params),
            saveOrUpdate: (data) => http.post(UPMS_SYS_AUTHORITY, data),
            delete: (data) => http.delete(UPMS_SYS_AUTHORITY, data),
            fetchAuthorityTree: () => http.get(UPMS_SYS_AUTHORITY_TREE),
            fetchAuthorityApis: () => http.get(UPMS_SYS_AUTHORITY_API),
        },
        supplier: {
            fetch: (params) => http.get(UPMS_DEVELOPMENT_SUPPLIER, params),
            saveOrUpdate: (data) => http.post(UPMS_DEVELOPMENT_SUPPLIER, data),
            delete: (data) => http.delete(UPMS_DEVELOPMENT_SUPPLIER, data),
            fetchAll: () => http.get(UPMS_DEVELOPMENT_SUPPLIER_ALL),
        },
        sysOrganization: {
            fetch: (params) => http.get(UPMS_SYS_ORGANIZATION, params),
            fetchAll: () => http.get(UPMS_SYS_ORGANIZATION_LIST),
            saveOrUpdate: (data) => http.post(UPMS_SYS_ORGANIZATION, data),
            delete: (data) => http.delete(UPMS_SYS_ORGANIZATION, data),
        },
        sysDepartment: {
            fetch: (params) => http.get(UPMS_SYS_DEPARTMENT, params),
            fetchAll: (organizationId) =>
                http.get(UPMS_SYS_DEPARTMENT_LIST, {
                    organizationId,
                }),
            saveOrUpdate: (data) => http.post(UPMS_SYS_DEPARTMENT, data),
            delete: (data) => http.delete(UPMS_SYS_DEPARTMENT, data),
        },
        sysEmployee: {
            fetch: (params) => http.get(UPMS_SYS_EMPLOYEE_LIST, params),
            saveOrUpdate: (data) => http.post(UPMS_SYS_EMPLOYEE, data),
            delete: (data) => http.delete(UPMS_SYS_EMPLOYEE, data),
        },
        sysPosition: {
            fetch: (params) => http.get(UPMS_SYS_POSITION, params),
            saveOrUpdate: (data) => http.post(UPMS_SYS_POSITION, data),
            delete: (data) => http.delete(UPMS_SYS_POSITION, data),
        },
    },
    bpmn: {
        processDefinition: {
            fetch: (params) => http.get(BPMN_PROCESS_DEFINITION, params),
            fetchCount: (params) =>
                http.get(BPMN_PROCESS_DEFINITION_COUNT, params),
            create: (data) => http.post(BPMN_PROCESS_DEFINITION_CREATE, data),
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