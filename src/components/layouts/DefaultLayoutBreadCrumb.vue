<template>
    <v-layout row layout mr-3 pl-1 pt-2>
        <v-breadcrumbs divider="/" :items="breadcrumbs">
            <template v-slot:item="props">
                <a :href="props.item.href" :class="[props.item.disabled && 'disabled']">{{ props.item.text }}</a>
            </template>
        </v-breadcrumbs>
        <v-spacer></v-spacer>
        <div class="page-header-right">
            <v-btn icon class="mt-3">
                <v-icon class="text--secondary">refresh</v-icon>
            </v-btn>
        </div>
    </v-layout>
</template>

<script>
export default {
    data () {
        return {
            title: 'Home',
            breadcrumbs: []
        };
    },
    watch: {
        '$route.path': function () {
            this.computeBreadcrumbs();
        }
    },
    methods: {
        computeBreadcrumbs () {
            let breadcrumbs = [
                {
                    text: '首页',
                    href: '/',
                    disabled: false
                }
            ];

            let appends = [];

            appends = this.$route.matched.map(item => {
                return {
                    text: item.meta.title || '',
                    href: item.path || '/',
                    disabled: true,
                    hidden: item.meta.hidden || false
                };
            });

            let filtered = [];

            filtered = appends.filter(item => {
                return !item.hidden;
            });

            this.breadcrumbs = breadcrumbs.concat(filtered);
        }
    },
    created () {
        this.computeBreadcrumbs();
    }
};
</script>
<style lang="scss" scoped>
.disabled {
    color: grey;
    pointer-events: none;
    text-decoration: blink;
}
</style>
