<template>
    <v-app id="inspire">
        <default-layout-drawer v-model="showDrawer" :menu="menu"></default-layout-drawer>
        <default-layout-toolbar @drawer="drawerClick()"></default-layout-toolbar>
        <v-main>
            <default-layout-bread-crumb></default-layout-bread-crumb>
            <v-container>
                <router-view :key="key"></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DefaultLayoutDrawer from './DefaultLayoutDrawer.vue';
import DefaultLayoutToolbar from './DefaultLayoutToolbar.vue';
import DefaultLayoutBreadCrumb from './DefaultLayoutBreadCrumb.vue';
import { MenuConfig, Menu } from '@/modules';

@Component({
    components: {
        DefaultLayoutDrawer,
        DefaultLayoutToolbar,
        DefaultLayoutBreadCrumb,
    },
})
export default class DefaultLayout extends Vue {
    private showDrawer = true;
    private menu: Menu[] = MenuConfig;

    get key(): string {
        return this.$route.path + Math.random();
    }

    private drawerClick(): void {
        this.showDrawer = !this.showDrawer;
    }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
    min-height: calc(100vh - 64px - 50px - 81px);
}
</style>
