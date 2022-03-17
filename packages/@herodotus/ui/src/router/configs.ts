import { RouteConfig } from 'vue-router';
import DefaultLayout from '../components/layouts/DefaultLayout.vue';
export const publicRouters: RouteConfig[] = [
    {
        path: '*',
        component: () => import(/* webpackChunkName: "errors-403" */ '../views/error/Deny.vue'),
    },
    {
        path: '/signin',
        name: 'Signin',
        meta: { title: 'signin' },
        component: () => import(/* webpackChunkName: "signin" */ '../views/Signin.vue'),
    },

    {
        path: '/404',
        name: '404',
        meta: { title: 'Not Found' },
        component: () => import(/* webpackChunkName: "errors-404" */ '../views/error/NotFound.vue'),
    },

    {
        path: '/500',
        name: '500',
        meta: { title: 'Server Error' },
        component: () => import(/* webpackChunkName: "errors-500" */ '../views/error/Error.vue'),
    },

    {
        path: '/home',
        name: 'Home',
        meta: { title: 'Home', requireAuth: true },
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    },
];

export const protectedRouters: RouteConfig[] = [
    {
        path: '/',
        component: DefaultLayout,
        meta: {
            title: 'Dashboard',
            group: 'apps',
            icon: '',
            hidden: true,
            requireAuth: true,
        },
        redirect: '/dashboard',
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                meta: {
                    title: 'Dashboard',
                    group: 'apps',
                    icon: 'dashboard',
                    requireAuth: true,
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
            },
            {
                path: '/403',
                name: 'Forbidden',
                meta: { title: 'Access Denied', hiddenInMenu: true },
                component: () => import(/* webpackChunkName: "error-403" */ '../views/error/Deny.vue'),
            },
        ],
    },

    // Oauth
    {
        path: '/oauth2',
        component: DefaultLayout,
        meta: { title: '平台认证管理', group: 'oauth2' },
        redirect: 'OAuth2Application',
        children: [
            {
                path: '/oauth2/application',
                name: 'OAuth2Application',
                meta: { title: '应用管理', requireAuth: true },
                component: () =>
                    import(
                        /* webpackChunkName: "OAuth2Application" */ '../views/center/authorize/application/Index.vue'
                    ),
            },
            {
                path: '/oauth2/application/content',
                name: 'OAuth2ApplicationContent',
                meta: {
                    title: '应用详情',
                    requireAuth: true,
                    parentTitle: '应用管理',
                },
                component: () =>
                    import(
                        /* webpackChunkName: "OAuth2ApplicationContent" */ '../views/center/authorize/application/Content.vue'
                    ),
            },
            {
                path: '/oauth2/token',
                name: 'OAuth2Token',
                meta: {
                    title: '凭证管理',
                    requireAuth: true,
                },
                component: () =>
                    import(/* webpackChunkName: "OAuth2Token" */ '../views/center/authorize/token/Index.vue'),
            },
            {
                path: '/oauth2/scope',
                name: 'OauthScopes',
                meta: { title: '范围管理', requireAuth: true },
                component: () =>
                    import(/* webpackChunkName: "OauthScopes" */ '../views/center/user/oauth/scopes/Index.vue'),
            },
        ],
    },
    //security
    {
        path: '/security',
        component: DefaultLayout,
        meta: { title: '安全管理', icon: 'security', group: 'security' },
        redirect: '/security/user',
        children: [
            {
                path: '/security/user',
                name: 'SysUser',
                meta: { title: '用户管理', requireAuth: true },
                component: () =>
                    import(/* webpackChunkName: "SysUser" */ '../views/center/user/security/user/Index.vue'),
            },
            {
                path: '/security/user/content',
                name: 'SysUserContent',
                meta: {
                    title: '用户详情',
                    requireAuth: true,
                    parentTitle: '用户管理',
                },
                component: () =>
                    import(/* webpackChunkName: "SysUserContent" */ '../views/center/user/security/user/Content.vue'),
            },
            {
                path: '/security/user/authorize',
                name: 'SysUserAuthorize',
                meta: {
                    title: '设置角色',
                    requireAuth: true,
                    parentTitle: '用户管理',
                },
                component: () =>
                    import(
                        /* webpackChunkName: "SysUserAuthorize" */ '../views/center/user/security/user/Authorize.vue'
                    ),
            },
            {
                path: '/security/role',
                name: 'SysRole',
                meta: { title: '角色管理', requireAuth: true },
                component: () =>
                    import(/* webpackChunkName: "SysRole" */ '../views/center/user/security/role/Index.vue'),
            },
            {
                path: '/security/role/content',
                name: 'SysRoleContent',
                meta: {
                    title: '范围详情',
                    requireAuth: true,
                    parentTitle: '角色管理',
                },
                component: () =>
                    import(/* webpackChunkName: "SysRoleContent" */ '../views/center/user/security/role/Content.vue'),
            },
            {
                path: '/security/role/authorize',
                name: 'SysRoleAuthorize',
                meta: {
                    title: '分配权限',
                    requireAuth: true,
                    parentTitle: '角色管理',
                },
                component: () =>
                    import(
                        /* webpackChunkName: "SysRoleAuthorize" */ '../views/center/user/security/role/Authorize.vue'
                    ),
            },
            {
                path: '/security/authority',
                name: 'SysAuthority',
                meta: { title: '权限管理', requireAuth: true },
                component: () =>
                    import(/* webpackChunkName: "SysAuthority" */ '../views/center/user/security/authority/Index.vue'),
            },
            {
                path: '/security/authority/content',
                name: 'SysAuthorityContent',
                meta: {
                    title: '权限详情',
                    requireAuth: true,
                    parentTitle: '权限管理',
                },
                component: () =>
                    import(
                        /* webpackChunkName: "SysAuthorityContent" */ '../views/center/user/security/authority/Content.vue'
                    ),
            },
            {
                path: '/security/security-attribute',
                name: 'SysSecurityAttribute',
                meta: { title: '元数据管理', requireAuth: true },
                component: () =>
                    import(
                        /* webpackChunkName: "SysSecurityAttribute" */ '../views/center/user/security/attribute/Index.vue'
                    ),
            },
            {
                path: '/security/security-attribute/content',
                name: 'SysSecurityAttributeContent',
                meta: {
                    title: '安全详情',
                    requireAuth: true,
                    parentTitle: '元数据管理',
                },
                component: () =>
                    import(
                        /* webpackChunkName: "SysSecurityAttributeContent" */ '../views/center/user/security/attribute/Content.vue'
                    ),
            },
            {
                path: '/security/default-role',
                name: 'SysDefaultRole',
                meta: { title: '默认角色', requireAuth: true },
                component: () =>
                    import(
                        /* webpackChunkName: "SysDefaultRole" */ '../views/center/user/security/default-role/Index.vue'
                    ),
            },
            {
                path: '/security/default-role/authorize',
                name: 'SysDefaultRoleAuthorize',
                meta: {
                    title: '配置角色',
                    requireAuth: true,
                    parentTitle: '默认角色',
                },
                component: () =>
                    import(
                        /* webpackChunkName: "SysDefaultRoleAuthorize" */ '../views/center/user/security/default-role/Authorize.vue'
                    ),
            },
        ],
    },
    //human resources
    {
        path: '/hr',
        component: DefaultLayout,
        meta: {
            title: '人力资源',
            icon: 'mdi-account-group',
            group: 'humanresources',
        },
        redirect: '/hr/organization',
        children: [
            {
                path: '/hr/organization',
                name: 'SysOrganization',
                meta: { title: '单位管理', requireAuth: true },
                component: () =>
                    import(/* webpackChunkName: "SysOrganization" */ '../views/center/user/hr/organization/Index.vue'),
            },
            {
                path: '/hr/organization/content',
                name: 'SysOrganizationContent',
                meta: {
                    title: '单位详情',
                    requireAuth: true,
                    parentTitle: '单位管理',
                },
                component: () =>
                    import(
                        /* webpackChunkName: "SysOrganizationContent" */ '../views/center/user/hr/organization/Content.vue'
                    ),
            },
            {
                path: '/hr/department',
                name: 'SysDepartment',
                meta: { title: '部门管理', requireAuth: true },
                component: () =>
                    import(/* webpackChunkName: "SysDepartment" */ '../views/center/user/hr/department/Index.vue'),
            },
            {
                path: '/hr/department/content',
                name: 'SysDepartmentContent',
                meta: {
                    title: '部门详情',
                    requireAuth: true,
                    parentTitle: '部门管理',
                },
                component: () =>
                    import(
                        /* webpackChunkName: "SysDepartmentContent" */ '../views/center/user/hr/department/Content.vue'
                    ),
            },
            {
                path: '/hr/employee',
                name: 'SysEmployee',
                meta: { title: '人员管理', requireAuth: true },
                component: () =>
                    import(/* webpackChunkName: "SysEmployee" */ '../views/center/user/hr/employee/Index.vue'),
            },
            {
                path: '/hr/employee/content',
                name: 'SysEmployeeContent',
                meta: {
                    title: '人员详情',
                    requireAuth: true,
                    parentTitle: '人员管理',
                },
                component: () =>
                    import(/* webpackChunkName: "SysEmployeeContent" */ '../views/center/user/hr/employee/Content.vue'),
            },
            {
                path: '/hr/ownership',
                name: 'SysOwnership',
                meta: { title: '人员归属', requireAuth: true },
                component: () =>
                    import(/* webpackChunkName: "SysOwnership" */ '../views/center/user/hr/ownership/Index.vue'),
            },
            {
                path: '/hr/ownership/allocatable',
                name: 'SysOwnershipAllocatable',
                meta: {
                    title: '配置归属',
                    requireAuth: true,
                    parentTitle: '归属管理',
                },
                component: () =>
                    import(
                        /* webpackChunkName: "SysOwnershipAllocatable" */ '../views/center/user/hr/ownership/Allocatable.vue'
                    ),
            },
        ],
    },
    //Camunda Work Flow
    {
        path: '/workflow',
        component: DefaultLayout,
        meta: {
            title: '工作流程',
            icon: 'mdi-transit-connection-variant',
            group: 'workflow',
        },
        redirect: '/workflow/deployment',
        children: [
            {
                path: '/workflow/deployment',
                name: 'Deployment',
                meta: { title: '流程部署管理', requireAuth: true },
                component: () =>
                    import(/* webpackChunkName: "Deployment" */ '../views/center/workflow/deployment/Index.vue'),
            },
            {
                path: '/workflow/deployment/modeler',
                name: 'DeploymentModeler',
                meta: {
                    title: '创建模型',
                    requireAuth: true,
                    parentTitle: '流程部署管理',
                },
                component: () =>
                    import(
                        /* webpackChunkName: "DeploymentModeler" */ '../views/center/workflow/deployment/Modeler.vue'
                    ),
            },
            {
                path: '/workflow/process-definition',
                name: 'ProcessDefinition',
                meta: { title: '流程定义管理', requireAuth: true },
                component: () =>
                    import(
                        /* webpackChunkName: "ProcessDefinition" */ '../views/center/workflow/process/definition/Index.vue'
                    ),
            },
            {
                path: '/workflow/development',
                name: 'Development',
                meta: { title: '流程组件开发', requireAuth: true },
                component: () =>
                    import(/* webpackChunkName: "Deployment" */ '../views/center/workflow/deployment/Development.vue'),
            },
        ],
    },
];
