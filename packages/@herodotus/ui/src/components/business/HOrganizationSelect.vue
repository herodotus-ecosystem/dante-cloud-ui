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
import { Component, ModelSync, Prop, Vue } from 'vue-property-decorator';
import { Inject } from 'typescript-ioc';
import { SysOrganization, SysOrganizationService } from '@/modules';

@Component
export default class InstitutionSelect extends Vue {
    @Prop({ type: Boolean, default: false }) readonly dense?: boolean;
    @Prop({ type: String, default: '所属单位' }) readonly label?: string;
    @Prop({ type: String, default: '请选择所属单位' }) readonly placeholder?: string;
    @Prop({ type: String, default: 'organizationName' }) readonly itemText?: string;
    @Prop({ type: String, default: 'organizationId' }) readonly itemValue?: string;
    @Prop(String) readonly selectClass?: string;

    @ModelSync('value', 'change', { type: String })
    readonly selectedValue!: string;

    @Inject
    private sysOrganizationService!: SysOrganizationService;

    private organizations: SysOrganization[] = new Array<SysOrganization>();

    private mounted(): void {
        this.sysOrganizationService.fetchAll().then((result) => {
            this.organizations = result.data;
        });
    }
}
</script>
