<template>
    <v-select
        v-model="selectedValue"
        outlined
        small-chips
        clearable
        :dense="dense"
        :hide-details="hideDetails"
        :multiple="multiple"
        :items="items"
        :label="label"
        :dark="dark"
        :flat="flat"
        :solo-inverted="soloInverted"
        :placeholder="placeholder"
        :errorMessages="errorMessages"
    ></v-select>
</template>

<script lang="ts">
import { Component, ModelSync, Prop, Vue } from 'vue-property-decorator';
import { ConstantDictionary } from '@/lib/declarations';

@Component
export default class HDictionarySelect extends Vue {
    @Prop({ type: Boolean, default: false }) readonly dense?: boolean;
    @Prop({ type: Boolean, default: false }) readonly dark?: boolean;
    @Prop({ type: Boolean, default: false }) readonly flat?: boolean;
    @Prop({ type: Boolean, default: false }) readonly soloInverted?: boolean;
    @Prop({ type: Boolean, default: false }) readonly hideDetails?: boolean;
    @Prop({ type: Boolean, default: false }) readonly multiple?: boolean;
    @Prop({ type: String, required: true }) readonly dictionary!: string;
    @Prop({ type: [String, Array] }) readonly errorMessages?: string | string[];
    @Prop(String) readonly label!: string;
    @Prop(String) readonly placeholder!: string;

    @ModelSync('value', 'change', { type: [Number, String, Array], default: 0 })
    readonly selectedValue: number | string | string[];

    private items = new Array<ConstantDictionary>();

    private mounted(): void {
        this.initialize();
    }

    private initialize(): void {
        this.$enums.getItem(this.dictionary).then((result) => {
            this.items = result;
        });
    }
}
</script>
