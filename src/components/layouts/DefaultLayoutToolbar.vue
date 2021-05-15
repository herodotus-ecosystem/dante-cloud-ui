<template>
    <v-app-bar app clipped-left color="blue darken-3" dark>
        <v-app-bar-nav-icon @click.stop="handleDrawerToggle"></v-app-bar-nav-icon>
        <v-toolbar-title class="mr-12 align-center">
            <span class="title">Eurynome Cloud</span>
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

<script>
export default {
    props: {
        source: String
    },

    data: () => ({}),

    methods: {
        handleDrawerToggle () {
            this.$emit('side-icon-click');
        },

        logout () {
            this.$swal.fire({
                title: "要走了么?",
                text: "您确定要退出系统！",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "是的",
                cancelButtonText: "取消",
            }).then((result) => {
                if (result.value) {
                    this.$storage.getItem('token').then((token) => {
                        if (token) {
                            this.$api.auth.logout(token).then(result => {
                                console.log(result);
                                this.$utils.auth.logout();
                            });
                        }
                    });
                }
            })
        }
    }
};
</script>
