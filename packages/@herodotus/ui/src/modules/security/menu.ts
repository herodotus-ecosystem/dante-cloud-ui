export type MenuItem = {
    name: string;
    title: string;
    component: string;
    icon: string;
    href?: string;
    target?: string;
};

export type MenuGroup = {
    title: string;
    icon: string;
    group: string;
    name?: string;
    items?: MenuItem[];
};

export type MenuHeader = {
    header: string;
};

export type MenuDivider = {
    divider: boolean;
};

export type Menu = MenuHeader | MenuDivider | MenuGroup;

export const MenuConfig = [
    {
        header: '平台总览',
    },
    {
        title: 'Dashboard',
        icon: 'dashboard',
        group: 'dashboard',
        name: 'Dashboard',
    },
    {
        divider: true,
    },
    {
        header: '认证中心',
    },
    {
        title: '平台认证管理',
        icon: 'vpn_lock',
        group: 'oauth',
        items: [
            {
                name: 'OAuth2Application',
                title: '应用管理',
                component: 'OAuth2Application',
                icon: 'mdi-apps',
            },
            {
                name: 'OAuth2Token',
                title: '凭证管理',
                component: 'OAuth2Token',
                icon: 'mdi-sitemap',
            },
            {
                name: 'OauthClientDetails',
                title: '终端管理',
                component: 'OauthClientDetails',
                icon: 'mdi-gas-station-outline',
            },
            {
                name: 'OAuth2Scope',
                title: '范围管理',
                component: 'OAuth2Scope',
                icon: 'mdi-arrange-send-backward',
            },
        ],
    },
    {
        header: '用户中心',
    },
    {
        title: '平台安全管理',
        icon: 'mdi-security',
        group: 'security',
        items: [
            {
                name: 'SysUser',
                title: '用户管理',
                component: 'SysUser',
                icon: 'mdi-account-box-multiple-outline',
            },
            {
                name: 'SysRole',
                title: '角色管理',
                component: 'SysRole',
                icon: 'mdi-account-lock-outline',
            },
            {
                name: 'SysAuthority',
                title: '权限管理',
                component: 'SysAuthority',
                icon: 'mdi-file-cog-outline',
            },
            {
                name: 'SysDefaultRole',
                title: '默认角色',
                component: 'SysDefaultRole',
                icon: 'mdi-account-cog-outline',
            },
            // {
            //     name: 'SysSecurityAttribute',
            //     title: '安全管理',
            //     component: 'SysSecurityAttribute',
            //     icon: 'mdi-file-cog-outline',
            // },
        ],
    },
    {
        title: '人力资源管理',
        icon: 'mdi-account-group-outline',
        group: 'hr',
        items: [
            {
                name: 'SysOrganization',
                title: '单位管理',
                component: 'SysOrganization',
                icon: 'mdi-bank-outline',
            },
            {
                name: 'SysDepartment',
                title: '部门管理',
                component: 'SysDepartment',
                icon: 'mdi-file-table-box-multiple-outline',
            },
            {
                name: 'SysEmployee',
                title: '人员管理',
                component: 'SysEmployee',
                icon: 'mdi-account-supervisor-outline',
            },
            // {
            //     name: 'SysPosition',
            //     title: '岗位管理',
            //     component: 'SysPosition',
            //     icon: 'mdi-card-account-details-star-outline',
            // },
            {
                name: 'SysOwnership',
                title: '人员归属',
                component: 'SysOwnership',
                icon: 'mdi-card-account-details-star-outline',
            },
        ],
    },
    {
        header: '流程中心',
    },
    {
        title: '工作流程管理',
        icon: 'mdi-transit-connection-variant',
        group: 'workflow',
        items: [
            {
                name: 'Deployment',
                title: '流程部署管理',
                component: 'Deployment',
                icon: 'mdi-iframe-braces-outline',
            },
            {
                name: 'ProcessDefinition',
                title: '流程定义管理',
                component: 'ProcessDefinition',
                icon: 'mdi-graph-outline',
            },
            {
                name: 'Development',
                title: '流程组件开发',
                component: 'Development',
                icon: 'mdi-graph-outline',
            },
        ],
    },
];
