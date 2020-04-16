<template>
    <div>
        <v-container v-if="$route.meta.showChildPage" class="pt-0" fluid>
            <v-row>
                <v-col class="pt-0">
                    <v-card>
                        <v-toolbar flat>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-icon tile color="teal" large class="mr-2" v-on="on" @click="goBack()">mdi-arrow-left-box</v-icon>
                                </template>
                                <span>返回</span>
                            </v-tooltip>
                            <v-toolbar-title class="pl-0 font-weight-light">{{$route.meta.subTitle}}</v-toolbar-title>
                        </v-toolbar>
                        <v-divider></v-divider>
                        <router-view></router-view>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <template v-else>
            <slot></slot>
        </template>
    </div>
</template>

<script>
export default {
    name: 'HDetail',

    mounted () {
    },

    methods: {
        /**
         * 从router matched中，根据当前router name找到当前router对象，从该对象中找到parent
         */
        goBack () {
            this.$utils.navigation.goBack(this.$route);
        }
    }
};
</script>
