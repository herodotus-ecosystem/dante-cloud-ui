<template>
    <div>
        <div v-if="$route.meta.showChildPage" class="list-table">
            <v-container grid-list-xl fluid>
                <v-layout row wrap>
                    <v-flex lg12>
                        <v-card>
                            <v-card-title>
                                <v-btn tile x-large color="teal" icon @click="goBack()">
                                    <v-icon>mdi-arrow-left-box</v-icon>
                                </v-btn>
                                <span class="title font-weight-light">Twitter</span>
                            </v-card-title>
                            <router-view></router-view>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>

        <template v-else>
            <slot></slot>
        </template>
    </div>
</template>

<script>
export default {
    name: 'HDetail',

    mounted () {
        console.log(this.$route)
    },
    methods: {
        goBack () {
            let currentPath = this.$route.path;
            let matched = this.$route.matched;
            let current = matched.find(match => match.path === currentPath);
            let currentParentName = current.parent.name;
            if (current.parent.name) {
                this.$router.push({ name: current.parent.name });
            } else {
                this.$router.go(-1);
            }
        }
    }

};
</script>
