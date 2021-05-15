<template>
    <v-app id="inspire">
        <default-layout-drawer :show-drawer="showDrawer" :drawer-menu="menus"></default-layout-drawer>
        <default-layout-toolbar @side-icon-click="handleDrawerVisiable"></default-layout-toolbar>
        <v-main>
            <default-layout-bread-crumb></default-layout-bread-crumb>
            <div class="page-wrapper">
                <router-view :key="key"></router-view>
            </div>
        </v-main>
    </v-app>
</template>

<script>
import DefaultLayoutDrawer from '@/components/layouts/DefaultLayoutDrawer.vue';
import DefaultLayoutToolbar from '@/components/layouts/DefaultLayoutToolbar.vue';
import DefaultLayoutBreadCrumb from '@/components/layouts/DefaultLayoutBreadCrumb.vue';

import menus from '@/configurations/menu'

export default {
    components: {
        DefaultLayoutDrawer,
        DefaultLayoutToolbar,
        DefaultLayoutBreadCrumb,
    },

    data: () => ({
        showDrawer: true,
        menus: menus,
    }),

    created () { },

    computed: {
        key () {
            return this.$route.path + Math.random();
        }
    },

    methods: {
        handleDrawerVisiable () {
            this.showDrawer = !this.showDrawer;
        },
    },
};
</script>

<style lang="scss" scoped>
.page-wrapper {
    min-height: calc(100vh - 64px - 50px - 81px);
}
</style>
