<template>
    <v-app id="inspire">
        <default-layout-drawer :show-drawer="showDrawer" :drawer-menu="menu"></default-layout-drawer>
        <default-layout-toolbar @side-icon-click="handleDrawerVisiable"></default-layout-toolbar>
        <v-content>
            <default-layout-bread-crumb></default-layout-bread-crumb>
            <div class="page-wrapper">
                <router-view></router-view>
            </div>
        </v-content>
    </v-app>
</template>

<script>
import DefaultLayoutDrawer from '@/components/layouts/DefaultLayoutDrawer.vue';
import DefaultLayoutToolbar from '@/components/layouts/DefaultLayoutToolbar.vue';
import DefaultLayoutBreadCrumb from '@/components/layouts/DefaultLayoutBreadCrumb.vue';

export default {
    components: {
        DefaultLayoutDrawer,
        DefaultLayoutToolbar,
        DefaultLayoutBreadCrumb,
    },

    data: () => ({
        showDrawer: true,
        menu: [],
    }),

    created () { },

    mounted () {
        this.setMenu();
    },

    computed: {
        key () {
            return this.$route.path + Math.random();
        }
    },

    methods: {
        handleDrawerVisiable () {
            this.showDrawer = !this.showDrawer;
        },
        setMenu () {
            this.menu = [
                {
                    header: '平台总览',
                },
                {
                    title: 'Dashboard',
                    group: 'apps',
                    icon: 'dashboard',
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
                    group: 'oauth',
                    component: 'oauth',
                    icon: 'vpn_lock',
                    items: [
                        {
                            name: 'OauthApplications',
                            title: '应用管理',
                            component: 'OauthApplications',
                            icon: 'apps',
                        },
                        {
                            name: 'OauthScopes',
                            title: '范围管理',
                            component: 'OauthScopes',
                            icon: 'exposure',
                        },
                    ],
                },
                {
                    header: '用户中心',
                },
                {
                    title: '平台安全管理',
                    group: 'security',
                    component: 'security',
                    icon: 'security',
                    items: [
                        {
                            name: 'SysUser',
                            title: '用户管理',
                            component: 'SysUser',
                            icon: 'vpn_key',
                        },
                        {
                            name: 'SysRole',
                            title: '角色管理',
                            component: 'SysRole',
                            icon: 'group',
                        },
                        {
                            name: 'SysAuthority',
                            title: '权限管理',
                            component: 'SysAuthority',
                            icon: 'verified_user',
                        },
                    ],
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
.page-wrapper {
    min-height: calc(100vh - 64px - 50px - 81px);
}
</style>
