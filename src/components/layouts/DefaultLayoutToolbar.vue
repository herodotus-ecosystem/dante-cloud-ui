<template>
    <v-app-bar app clipped-left color="blue darken-3" dark>
        <v-app-bar-nav-icon @click.stop="handleDrawerToggle"></v-app-bar-nav-icon>
        <v-toolbar-title class="mr-12 align-center">
            <span class="title">智慧电科院业务中台</span>
        </v-toolbar-title>
        <v-text-field solo-inverted flat hide-details label="Search" prepend-inner-icon="search"></v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon>apps</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>notifications</v-icon>
        </v-btn>
        <v-btn icon large @click="login">
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
        handleDrawerToggle() {
            this.$emit('side-icon-click');
        },

        login() {
            console.log('---login');
            this.$router.push('/login');
        }
    }
};
</script>
