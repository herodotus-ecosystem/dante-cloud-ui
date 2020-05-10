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
        header: "开发中心",
    },
    {
        title: "平台开发管理",
        group: "development",
        component: "DevelopmentSupplier",
        icon: "mdi-developer-board",
        items: [
            {
                name: "DevelopmentSupplier",
                title: "团队管理",
                component: "DevelopmentSupplier",
                icon: "mdi-microsoft-teams",
            },
        ],
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
                icon: "mdi-arrange-send-backward",
            },
            {
                name: "OauthApplications",
                title: "应用管理",
                component: "OauthApplications",
                icon: "mdi-apps",
            },
            {
                name: "OauthMicroservices",
                title: "服务管理",
                component: "OauthMicroservices",
                icon: "mdi-sitemap",
            },
            {
                name: "OauthClientDetails",
                title: "终端管理",
                component: "OauthClientDetails",
                icon: "mdi-gas-station",
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
                icon: "mdi-account-box-multiple",
            },
            {
                name: "SysRole",
                title: "角色管理",
                component: "SysRole",
                icon: "mdi-account-lock",
            },
            {
                name: "SysAuthority",
                title: "权限管理",
                component: "SysAuthority",
                icon: "mdi-file-cog",
            },
        ],
    },
    {
        title: "人力资源管理",
        group: "humanresources",
        component: "SysOrganization",
        icon: "mdi-account-group",
        items: [
            {
                name: "SysOrganization",
                title: "单位管理",
                component: "SysOrganization",
                icon: "mdi-bank",
            },
            {
                name: "SysDepartment",
                title: "部门管理",
                component: "SysDepartment",
                icon: "mdi-file-table-box-multiple",
            },
            {
                name: "SysEmployee",
                title: "人员管理",
                component: "SysEmployee",
                icon: "mdi-account-supervisor",
            },
            {
                name: "SysPosition",
                title: "岗位管理",
                component: "SysPosition",
                icon: "mdi-card-account-details-star",
            },
        ],
    },
];

export default menus;
