import { DefaultLayout } from "@/components/layouts";

export const publicRouters = [
    {
        path: "*",
        component: () =>
            import(
                /* webpackChunkName: "errors-403" */ "../views/error/Deny.vue"
            ),
    },
    {
        path: "/login",
        name: "Login",
        meta: { title: "Login" },
        component: () =>
            import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    },

    {
        path: "/404",
        name: "404",
        meta: { title: "Not Found" },
        component: () =>
            import(
                /* webpackChunkName: "errors-404" */ "../views/error/NotFound.vue"
            ),
    },

    {
        path: "/500",
        name: "500",
        meta: { title: "Server Error" },
        component: () =>
            import(
                /* webpackChunkName: "errors-500" */ "../views/error/Error.vue"
            ),
    },
];

export const protectedRouters = [
    {
        path: "/",
        component: DefaultLayout,
        meta: {
            title: "Dashboard",
            group: "apps",
            icon: "",
            hidden: true,
            requireAuth: true,
        },
        redirect: "/dashboard",
        children: [
            {
                path: "/dashboard",
                name: "Dashboard",
                meta: {
                    title: "Dashboard",
                    group: "apps",
                    icon: "dashboard",
                    requireAuth: true,
                },
                component: () =>
                    import(
                        /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"
                    ),
            },

            {
                path: "/403",
                name: "Forbidden",
                meta: { title: "Access Denied", hiddenInMenu: true },
                component: () =>
                    import(
                        /* webpackChunkName: "error-403" */ "../views/error/Deny.vue"
                    ),
            },
        ],
    },
    // Oauth
    {
        path: "/oauth",
        component: DefaultLayout,
        meta: { title: "平台认证管理", group: "oauth" },
        redirect: "OauthApplications",
        children: [
            {
                path: "/oauth/applications",
                name: "OauthApplications",
                meta: { title: "应用管理", requireAuth: true },
                component: () =>
                    import(
                        /* webpackChunkName: "OauthApplications" */ "../views/center/user/oauth/applications/Index.vue"
                    ),
                children: [
                    {
                        path: "/oauth/applications/content",
                        name: "OauthApplicationsContent",
                        meta: {
                            title: "应用详情",
                            requireAuth: true,
                            showChildPage: true,
                            subTitle: "应用详情",
                        },
                        component: () =>
                            import(
                                /* webpackChunkName: "OauthApplicationsContent" */ "../views/center/user/oauth/applications/Content.vue"
                            ),
                    },
                    {
                        path: "/oauth/applications/authorize",
                        name: "OauthApplicationsAuthorize",
                        meta: {
                            title: "配置Scope",
                            requireAuth: true,
                            showChildPage: true,
                            subTitle: "配置Scope",
                        },
                        component: () =>
                            import(
                                /* webpackChunkName: "OauthApplicationsAuthorize" */ "../views/center/user/oauth/applications/Authorize.vue"
                            ),
                    },
                ],
            },
            {
                path: "/oauth/scopes",
                name: "OauthScopes",
                meta: { title: "范围管理", requireAuth: true },
                component: () =>
                    import(
                        /* webpackChunkName: "OauthScopes" */ "../views/center/user/oauth/scopes/Index.vue"
                    ),
                children: [
                    {
                        path: "/oauth/scopes/content",
                        name: "OauthScopesContent",
                        meta: {
                            title: "范围详情",
                            requireAuth: true,
                            showChildPage: true,
                            subTitle: "设置范围详情",
                        },
                        component: () =>
                            import(
                                /* webpackChunkName: "OauthScopesContent" */ "../views/center/user/oauth/scopes/Content.vue"
                            ),
                    },
                    {
                        path: "/oauth/scopes/authorize",
                        name: "OauthScopesAuthorize",
                        meta: {
                            title: "分配权限",
                            requireAuth: true,
                            showChildPage: true,
                            subTitle: "设置Scope权限",
                        },
                        component: () =>
                            import(
                                /* webpackChunkName: "OauthScopesAuthorize" */ "../views/center/user/oauth/scopes/Authorize.vue"
                            ),
                    },
                ],
            },
            {
                path: "/oauth/clientdetails",
                name: "OauthClientDetails",
                meta: { title: "终端管理", requireAuth: true },
                component: () =>
                    import(
                        /* webpackChunkName: "OauthScopes" */ "../views/center/user/oauth/clientdetails/Index.vue"
                    ),
                children: [
                    {
                        path: "/oauth/clientdetails/content",
                        name: "OauthClientDetailContent",
                        meta: {
                            title: "终端详情",
                            requireAuth: true,
                            showChildPage: true,
                            subTitle: "设置终端详情",
                        },
                        component: () =>
                            import(
                                /* webpackChunkName: "OauthScopesContent" */ "../views/center/user/oauth/clientdetails/Content.vue"
                            ),
                    },
                ],
            },
        ],
    },
    //security
    {
        path: "/security",
        component: DefaultLayout,
        meta: { title: "安全管理", icon: "security", group: "advance" },
        redirect: "/security/user",
        children: [
            {
                path: "/security/user",
                name: "SysUser",
                meta: { title: "用户管理", requireAuth: true },
                component: () =>
                    import(
                        /* webpackChunkName: "SysUser" */ "../views/center/user/security/SysUser.vue"
                    ),
            },
            {
                path: "/security/role",
                name: "SysRole",
                meta: { title: "角色管理", requireAuth: true },
                component: () =>
                    import(
                        /* webpackChunkName: "SysRole" */ "../views/center/user/security/SysRole.vue"
                    ),
            },
            {
                path: "/security/authority",
                name: "SysAuthority",
                meta: { title: "权限管理", requireAuth: true },
                component: () =>
                    import(
                        /* webpackChunkName: "SysAuthority" */ "../views/center/user/security/SysAuthority.vue"
                    ),
            },
        ],
    },
];
