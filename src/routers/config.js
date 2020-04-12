import { DefaultLayout } from '@/layouts';

export const publicRouters = [
    {
        path: '*',
        component: () =>
            import(
                /* webpackChunkName: "errors-403" */ '../views/error/Deny.vue'
            ),
    },
    {
        path: '/login',
        name: 'Login',
        meta: { title: 'Login' },
        component: () =>
            import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    },

    {
        path: '/404',
        name: '404',
        meta: { title: 'Not Found' },
        component: () =>
            import(
                /* webpackChunkName: "errors-404" */ '../views/error/NotFound.vue'
            ),
    },

    {
        path: '/500',
        name: '500',
        meta: { title: 'Server Error' },
        component: () =>
            import(
                /* webpackChunkName: "errors-500" */ '../views/error/Error.vue'
            ),
    },
];

export const protectedRouters = [
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
                component: () =>
                    import(
                        /* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'
                    ),
            },

            {
                path: '/403',
                name: 'Forbidden',
                meta: { title: 'Access Denied', hiddenInMenu: true },
                component: () =>
                    import(
                        /* webpackChunkName: "error-403" */ '../views/error/Deny.vue'
                    ),
            },
        ],
    },
    // Oauth
    {
        path: '/oauth',
        component: DefaultLayout,
        meta: { title: '平台认证管理', group: 'oauth' },
        redirect: 'OauthApplications',
        children: [
            {
                path: '/oauth/applications',
                name: 'OauthApplications',
                meta: { title: '应用管理', requireAuth: true },
                component: () =>
                    import(
                        /* webpackChunkName: "OauthApplications" */ '../views/center/user/oauth/OauthApplications.vue'
                    ),
            },
            {
                path: '/oauth/scopes',
                name: 'OauthScopes',
                meta: { title: '范围管理', requireAuth: true },
                component: () =>
                    import(
                        /* webpackChunkName: "OauthScopes" */ '../views/center/user/oauth/OauthScopes.vue'
                    ),
                children: [
                    {
                        path: '/oauth/scopes/assign',
                        name: 'Assign',
                        meta: {
                            title: '分配权限',
                            requireAuth: true,
                            showChildPage: true,
                        },
                        component: () =>
                            import(
                                /* webpackChunkName: "Assign" */ '../views/center/user/oauth/Assign.vue'
                            ),
                    },
                ],
            },
        ],
    },
    //security
    {
        path: '/security',
        component: DefaultLayout,
        meta: { title: '安全管理', icon: 'security', group: 'advance' },
        redirect: '/security/user',
        children: [
            {
                path: '/security/user',
                name: 'SysUser',
                meta: { title: '用户管理', requireAuth: true },
                component: () =>
                    import(
                        /* webpackChunkName: "SysUser" */ '../views/center/user/security/SysUser.vue'
                    ),
            },
            {
                path: '/security/role',
                name: 'SysRole',
                meta: { title: '角色管理', requireAuth: true },
                component: () =>
                    import(
                        /* webpackChunkName: "SysRole" */ '../views/center/user/security/SysRole.vue'
                    ),
            },
            {
                path: '/security/authority',
                name: 'SysAuthority',
                meta: { title: '权限管理', requireAuth: true },
                component: () =>
                    import(
                        /* webpackChunkName: "SysAuthority" */ '../views/center/user/security/SysAuthority.vue'
                    ),
            },
        ],
    },
];
