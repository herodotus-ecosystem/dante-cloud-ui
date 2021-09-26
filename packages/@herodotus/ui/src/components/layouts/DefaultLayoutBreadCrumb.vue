<template>
    <v-layout row layout mr-3 mt-1 ml-1 mb-1>
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

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

type Breadcrumbs = {
    text: string;
    href: string;
    disabled: boolean;
    hidden?: boolean;
};

@Component
export default class DefaultLayoutBreadCrumb extends Vue {
    private title = 'Home';
    private breadcrumbs: Breadcrumbs[] = [];

    @Watch('$route.path')
    private onRoutePathChanged(): void {
        this.computeBreadcrumbs();
    }

    private created(): void {
        this.computeBreadcrumbs();
    }

    private createBreadcrumbs(text: string, href: string, hidden: boolean): Breadcrumbs {
        return {
            text: text || '---',
            href: href || '/',
            disabled: true,
            hidden: hidden || false,
        };
    }

    private computeBreadcrumbs(): void {
        let breadcrumbs: Breadcrumbs[] = [
            {
                text: '首页',
                href: '/',
                disabled: false,
            },
        ];

        let appends: Breadcrumbs[] = new Array<Breadcrumbs>();

        this.$route.matched.forEach((item) => {
            if (item.meta.parentTitle) {
                appends.push(
                    this.createBreadcrumbs(item.meta.parentTitle, this.$navigation.getParentPath(item.path), false)
                );
            }
            appends.push(this.createBreadcrumbs(item.meta.title, item.path, item.meta.hidden));
        });

        let filtered: Breadcrumbs[] = [];

        filtered = appends.filter((item) => {
            return !item.hidden;
        });

        this.breadcrumbs = breadcrumbs.concat(filtered);
    }
}
</script>
<style lang="scss" scoped>
.disabled {
    color: grey;
    pointer-events: none;
    text-decoration: blink;
}
</style>
