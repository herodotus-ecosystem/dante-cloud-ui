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
                            <v-toolbar-title class="pl-0 font-weight-light">{{detailTitle ? detailTitle : $route.meta.subTitle}}</v-toolbar-title>
                        </v-toolbar>
                        <v-divider></v-divider>
                        <router-view :key="key"></router-view>
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

    props: {
        detailTitle: String
    },

    created () {

    },

    mounted () {
        this.checkRouteParam();
    },

    methods: {
        /**
         * 从router matched中，根据当前router name找到当前router对象，从该对象中找到parent
         */
        goBack () {
            this.$utils.navigation.goBack(this.$route);
        },
        /**
         * 页面刷新之后<router-view></router-view>对应页面中的params和query都为空。
         * 如果route中，params和query都为空，以此判断子页面是否为重新刷新，是就返回上一页。
         */
        checkRouteParam () {
            if (this.$route.meta.showChildPage) {
                if (this.$utils.object.isEmpty(this.$route.params) && this.$utils.object.isEmpty(this.$route.query)) {
                    this.goBack();
                }
            }
        }
    }
};
</script>
