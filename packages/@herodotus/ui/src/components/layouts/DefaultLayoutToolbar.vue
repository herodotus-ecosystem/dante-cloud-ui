<template>
    <v-app-bar app clipped-left color="blue darken-3" dark>
        <v-app-bar-nav-icon @click="onDrawerIconClick()"></v-app-bar-nav-icon>
        <v-toolbar-title class="mr-12 align-center">
            <span class="title">{{ systemName }}</span>
        </v-toolbar-title>
        <v-text-field solo-inverted flat hide-details label="Search" prepend-inner-icon="search"></v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon>notifications</v-icon>
        </v-btn>
        <v-menu close-on-content-click bottom left offset-y>
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    <v-icon>apps</v-icon>
                </v-btn>
            </template>

            <v-list shaped dense>
                <v-subheader>功能菜单</v-subheader>
                <v-list-item-group color="primary">
                    <v-list-item key="profile">
                        <v-list-item-icon>
                            <v-icon>mdi-account-box-multiple</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>个人信息</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item key="logout" @click="logout">
                        <v-list-item-icon>
                            <v-icon>mdi-logout</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>退出系统</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-menu>
        <v-btn icon large>
            <v-avatar size="32px" item>
                <v-img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify"></v-img>
            </v-avatar>
        </v-btn>
    </v-app-bar>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';

@Component
export default class DefaultLayoutToolbar extends Vue {
    private systemName: string | undefined = process.env.VUE_APP_SYSTEM_NAME;

    @Emit('drawer')
    private onDrawerIconClick(e: Event): Event {
        return e;
    }

    private logout(): void {
        this.$security.signout();
    }
}
</script>
