<template>
    <h-material-card class="v-card--material-chart" v-bind="$attrs" v-on="$listeners">
        <template v-slot:heading>
            <chartist
                :data="data"
                :event-handlers="eventHandlers"
                :options="options"
                :ratio="ratio"
                :responsive-options="responsiveOptions"
                :type="type"
                style="max-height: 150px"
            />
        </template>

        <slot slot="reveal-actions" name="reveal-actions" />

        <slot />

        <slot slot="actions" name="actions" />
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
export default class HMaterialChartCard extends Vue {
    inheritAttrs: false;

    @Prop({
        type: Object,
        default: () => {
            return {};
        },
    })
    readonly data?: Record<string, any>;
    @Prop({
        type: Object,
        default: () => {
            return {};
        },
    })
    readonly options?: Record<string, any>;
    @Prop({
        type: Array,
        default: () => {
            return [];
        },
    })
    readonly eventHandlers?: [];
    @Prop({
        type: Array,
        default: () => {
            return [];
        },
    })
    readonly responsiveOptions?: [];
    @Prop({ type: String, default: undefined }) readonly ratio?: string;
    @Prop({ type: String, validator: (v) => ['Bar', 'Line', 'Pie'].includes(v) }) readonly type!: string;
}
</script>

<style lang="sass">
.v-card--material-chart
    p
        color: #999

    .v-card--material__heading
        max-height: 185px

    .ct-label
        color: inherit
        opacity: .7
        font-size: 0.975rem
        font-weight: 100

    .ct-grid
        stroke: rgba(255, 255, 255, 0.2)

    .ct-series-a .ct-point,
    .ct-series-a .ct-line,
    .ct-series-a .ct-bar,
    .ct-series-a .ct-slice-donut
        stroke: rgba(255,255,255,.8)

    .ct-series-a .ct-slice-pie,
    .ct-series-a .ct-area
        fill: rgba(255,255,255,.4)
</style>
