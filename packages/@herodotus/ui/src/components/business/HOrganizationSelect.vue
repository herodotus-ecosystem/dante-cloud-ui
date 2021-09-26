<template>
    <v-select
        v-model="selectedValue"
        outlined
        small-chips
        clearable
        :dense="dense"
        :hide-details="dense"
        :class="selectClass"
        :label="label"
        :placeholder="placeholder"
        :items="organizations"
        :item-text="itemText"
        :item-value="itemValue"
    ></v-select>
</template>

<script lang="ts">
import { Component, ModelSync, Prop, Vue, Watch } from 'vue-property-decorator';
import { Inject } from 'typescript-ioc';
import { SysOrganization, SysOrganizationService } from '@/modules';

@Component
export default class HOrganizationSelect extends Vue {
    @Prop({ type: Boolean, default: false }) readonly dense?: boolean;
    @Prop({ type: String, default: '所属单位' }) readonly label?: string;
    @Prop({ type: String, default: '请选择所属单位' }) readonly placeholder?: string;
    @Prop({ type: String, default: 'organizationName' }) readonly itemText?: string;
    @Prop({ type: String, default: 'organizationId' }) readonly itemValue?: string;
    @Prop({ type: Array, default: () => [] }) readonly items?: SysOrganization[];
    @Prop(String) readonly selectClass?: string;
    @Prop({ type: [Number, String], default: '' }) readonly category?: number | string;
    @ModelSync('value', 'change', { type: String })
    readonly selectedValue!: string;

    @Inject
    private sysOrganizationService!: SysOrganizationService;

    private organizations: SysOrganization[] = [];

    @Watch('category', { immediate: true })
    onCategoryChanged(newValue: string): void {
        this.loadData(newValue);
    }

    public mounted(): void {
        this.loadData(this.category);
    }

    private loadData(category): void {
        this.sysOrganizationService.fetchAll({ category: category }).then((result) => {
            if (!this.$lib.lodash.isEmpty(result.data)) {
                this.organizations = result.data;
            }
        });
    }
}
</script>
