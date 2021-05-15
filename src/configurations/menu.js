const menus = [
    {
        header: "平台总览",
    },
    {
        title: "Dashboard",
        icon: "dashboard",
        group: "dashboard",
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
        icon: "vpn_lock",
        group: "oauth",
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
                name: "OauthClientDetails",
                title: "终端管理",
                component: "OauthClientDetails",
                icon: "mdi-gas-station-outline",
            },
        ],
    },
    {
        header: "用户中心",
    },
    {
        title: "平台安全管理",
        icon: "mdi-security",
        group: "security",
        items: [
            {
                name: "SysUser",
                title: "用户管理",
                component: "SysUser",
                icon: "mdi-account-box-multiple-outline",
            },
            {
                name: "SysRole",
                title: "角色管理",
                component: "SysRole",
                icon: "mdi-account-lock-outline",
            },
            {
                name: "SysAuthority",
                title: "权限管理",
                component: "SysAuthority",
                icon: "mdi-file-cog-outline",
            },
        ],
    },
    {
        header: "流程中心",
    },
    {
        title: "工作流程管理",
        icon: "mdi-transit-connection-variant",
        group: "process",
        items: [
            {
                name: "ProcessDeployment",
                title: "流程部署管理",
                component: "ProcessDeployment",
                icon: "mdi-iframe-braces-outline",
            },
            {
                name: "ProcessDefinition",
                title: "流程定义管理",
                component: "ProcessDefinition",
                icon: "mdi-graph-outline",
            },
        ],
    },
];

export default menus;
