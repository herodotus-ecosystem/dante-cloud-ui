<template>
    <v-card>
        <v-toolbar color="primary" dark flat dense>
            <v-toolbar-title>部门</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-treeview :active.sync="active" :items="departments" selection-type="independent" hoverable activatable>
            </v-treeview>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Inject } from 'typescript-ioc';
import { SysDepartment, SysDepartmentService } from '@/modules';

@Component
export default class HDepartmentTree extends Vue {
    @Prop({ type: String, default: '' }) readonly organizationId?: string;
    @Inject
    private sysDepartmentService!: SysDepartmentService;

    private departments: SysDepartment[] = [];
    private active = [];

    @Watch('organizationId', { immediate: true })
    onOrganizationIdChanged(newValue: string): void {
        this.loadData(newValue);
    }

    @Watch('active', { immediate: true })
    onActiveChanged(newValue: string): void {
        if (newValue && newValue.length > 0) {
            this.$emit('input', newValue[0]);
        }
    }

    private loadData(organizationId: string): void {
        if (organizationId) {
            this.sysDepartmentService.fetchTree({ organizationId }).then((result) => {
                if (!this.$lib.lodash.isEmpty(result.data)) {
                    this.departments = result.data;
                } else {
                    this.departments = new Array<SysDepartment>();
                }
            });
        } else {
            this.departments = new Array<SysDepartment>();
        }
    }
}
</script>
