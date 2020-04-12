<template>
    <v-navigation-drawer v-model="showDrawer" clipped app dark>
        <v-list dense>
            <template v-for="item in drawerMenu">
                <v-list-group v-if="item.items" :key="item.title" :group="item.group" :prepend-icon="item.icon" no-action>
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <template v-for="subItem in item.items">
                        <v-list-item :key="subItem.name" :to="generateChildTarget(item, subItem)" :href="subItem.href" :disabled="subItem.disabled" :target="subItem.target" class="ml-2">
                            <v-list-item-content>
                                <v-list-item-title v-text="subItem.title"></v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon>
                                <v-icon v-text="subItem.icon"></v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                    </template>
                </v-list-group>
                <v-subheader v-else-if="item.header" :key="item.name">{{
                    item.header
                }}</v-subheader>
                <v-divider v-else-if="item.divider" :key="item.name"></v-divider>
                <v-list-item v-else :to="!item.href ? { name: item.name } : null" :href="item.href" :disabled="item.disabled" :target="item.target" :key="item.name">
                    <v-list-item-icon v-if="item.icon">
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    props: {
        showDrawer: Boolean,
        drawerMenu: {
            type: Array,
            default: () => []
        }
    },

    data: () => ({}),

    methods: {
        generateChildTarget (item, subItem) {
            if (subItem.href) {
                return;
            } else if (subItem.component) {
                return { name: subItem.component };
            }
            return { name: `${item.group}/${subItem.name}` };
        }
    }
};
</script>

<style scoped>
.drawer-menu--scroll {
    height: calc(100vh - 48px);
    overflow: auto;
}
</style>
