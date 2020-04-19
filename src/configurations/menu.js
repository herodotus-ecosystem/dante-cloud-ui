const menus = [
    {
        header: "平台总览",
    },
    {
        title: "Dashboard",
        group: "apps",
        icon: "dashboard",
        name: "Dashboard",
    },
    {
        divider: true,
    },
    {
        header: "认证中心",
    },
    {
        title: "平台认证管理",
        group: "oauth",
        component: "oauth",
        icon: "vpn_lock",
        items: [
            {
                name: "OauthScopes",
                title: "范围管理",
                component: "OauthScopes",
                icon: "exposure",
            },
            {
                name: "OauthApplications",
                title: "应用管理",
                component: "OauthApplications",
                icon: "apps",
            },
        ],
    },
    {
        header: "用户中心",
    },
    {
        title: "平台安全管理",
        group: "security",
        component: "security",
        icon: "security",
        items: [
            {
                name: "SysUser",
                title: "用户管理",
                component: "SysUser",
                icon: "vpn_key",
            },
            {
                name: "SysRole",
                title: "角色管理",
                component: "SysRole",
                icon: "group",
            },
            {
                name: "SysAuthority",
                title: "权限管理",
                component: "SysAuthority",
                icon: "verified_user",
            },
        ],
    },
];

export default menus;
