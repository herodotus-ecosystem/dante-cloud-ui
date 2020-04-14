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
        goBack () {
            let currentPath=this.$route.path;
            let matched=this.$route.matched;
            let current=matched.find(match => match.path===currentPath);
            let currentParentName=current.parent.name;
            if(current.parent.name) {
                this.$router.push({ name: current.parent.name });
            } else {
                this.$router.go(-1);
            }
        }
    }

};
</script>
