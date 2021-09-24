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
        :items="departments"
        :item-text="itemText"
        :item-value="itemValue"
    ></v-select>
</template>

<script lang="ts">
import { Component, ModelSync, Watch, Prop, Vue } from 'vue-property-decorator';
import { Inject } from 'typescript-ioc';
import { SysDepartment, SysDepartmentService } from '@/modules';

@Component
export default class HDepartmentSelect extends Vue {
    @Prop({ type: Boolean, default: false }) readonly dense?: boolean;
    @Prop({ type: String, default: '所属部门' }) readonly label?: string;
    @Prop({ type: String, default: '请选择所属部门' }) readonly placeholder?: string;
    @Prop({ type: String, default: 'departmentName' }) readonly itemText?: string;
    @Prop({ type: String, default: 'departmentId' }) readonly itemValue?: string;
    @Prop(String) readonly selectClass?: string;

    @ModelSync('value', 'change', { type: String })
    readonly selectedValue!: string;

    @Inject
    private sysDepartmentService!: SysDepartmentService;

    private departments: SysDepartment[] = new Array<SysDepartment>();

    @Prop({ type: String, default: '' }) readonly organizationId!: string;
    @Watch('organizationId', { immediate: true })
    onOrganizationChanged(newValue: string): void {
        if (newValue) {
            this.sysDepartmentService.fetchAll({ organizationId: newValue }).then((result) => {
                if (!this.$lib.lodash.isEmpty(result.data)) {
                    this.departments = result.data;
                }
            });
        } else {
            this.departments = new Array<SysDepartment>();
        }
    }
}
</script>
