<template>
    <h-material-card :icon="icon" class="v-card--material-stats" v-bind="$attrs" v-on="$listeners">
        <template v-slot:after-heading>
            <div class="ml-auto text-right">
                <div class="body-3 grey--text font-weight-light" v-text="title" />

                <h3 class="display-2 font-weight-light text--primary">
                    {{ value }} <small>{{ smallValue }}</small>
                </h3>
            </div>
        </template>

        <v-col cols="12" class="px-0">
            <v-divider />
        </v-col>

        <v-icon :color="subIconColor" size="16" class="ml-2 mr-1">
            {{ subIcon }}
        </v-icon>

        <span :class="subTextColor" class="caption grey--text font-weight-light" v-text="subText" />
    </h-material-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import HMaterialCard from './HMaterialCard.vue';

@Component({
    components: {
        HMaterialCard,
    },
})
export default class HMaterialStatsCard extends Vue {
    inheritAttrs: false;

    @Prop(String) readonly icon!: string;
    @Prop({ type: String, default: undefined }) readonly subIcon?: string;
    @Prop({ type: String, default: undefined }) readonly subIconColor?: string;
    @Prop({ type: String, default: undefined }) readonly subTextColor?: string;
    @Prop({ type: String, default: undefined }) readonly subText?: string;
    @Prop({ type: String, default: undefined }) readonly title?: string;
    @Prop({ type: String, default: undefined }) readonly value?: string;
    @Prop({ type: String, default: undefined }) readonly smallValue?: string;
}
</script>

<style lang="sass">
.v-card--material-stats
    display: flex
    flex-wrap: wrap
    position: relative

> div:first-child
    justify-content: space-between

.v-card
    border-radius: 4px
    flex: 0 1 auto

.v-card__text
    display: inline-block
    flex: 1 0 calc(100% - 120px)
    top: 0
    right: 0
    width: 100%

.v-card__actions
    flex: 1 0 100%
</style>
