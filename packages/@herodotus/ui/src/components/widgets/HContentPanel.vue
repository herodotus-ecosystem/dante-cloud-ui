<template>
    <h-container>
        <h-overlay :overlay="overlay"></h-overlay>
        <v-card>
            <v-toolbar flat>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon tile color="teal" large class="mr-2" v-on="on" @click="goBack()"
                            >mdi-arrow-left-box</v-icon
                        >
                    </template>
                    <span>返回</span>
                </v-tooltip>
                <v-toolbar-title class="pl-0 font-weight-light">{{ title }}</v-toolbar-title>
            </v-toolbar>
            <v-divider class="mb-2"></v-divider>
            <slot></slot>
        </v-card>
    </h-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import HContainer from './HContainer.vue';
import HOverlay from './HOverlay.vue';

@Component({
    components: {
        HOverlay,
        HContainer,
    },
})
export default class HContentPanel extends Vue {
    @Prop(String) readonly title!: string;
    @Prop({ type: Boolean, default: false }) readonly overlay?: boolean;

    get key(): string {
        return this.$route.path + Math.random();
    }

    private mounted(): void {
        this.checkRouteParam();
    }

    /**
     * 从router matched中，根据当前router name找到当前router对象，从该对象中找到parent
     */
    private goBack(): void {
        this.$navigation.goBack(this.$route);
    }

    /**
     * 页面刷新之后<router-view></router-view>对应页面中的params和query都为空。
     * 如果route中，params和query都为空，以此判断子页面是否为重新刷新，是就返回上一页。
     */
    private checkRouteParam(): void {
        if (this.$lib.lodash.isEmpty(this.$route.params) && this.$lib.lodash.isEmpty(this.$route.query)) {
            this.goBack();
        }
    }
}
</script>
