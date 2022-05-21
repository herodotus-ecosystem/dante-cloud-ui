<template>
    <h-content-panel :title="title" :overlay="overlay">
        <validation-observer ref="observer">
            <h-table-item-editor v-model="editedItem" :overlay="overlay" column @submit="saveOrUpdate()">
                <template v-slot:primary>
                    <validation-provider v-slot="{ errors }" name="部门名称" rules="required">
                        <v-text-field
                            outlined
                            clearable
                            label="部门名称 * "
                            placeholder="请输入部门名称"
                            v-model="editedItem.departmentName"
                            :error-messages="errors"
                            required
                        ></v-text-field>
                    </validation-provider>
                    <v-text-field
                        outlined
                        clearable
                        label="部门分区码"
                        placeholder="请输入部门分区码名称"
                        v-model="editedItem.partitionCode"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        label="部门简称"
                        placeholder="请输入部门简称"
                        v-model="editedItem.shortName"
                    ></v-text-field>
                    <h-organization-select v-model="editedItem.organizationId"></h-organization-select>
                    <h-department-select
                        v-model="editedItem.parentId"
                        :organizationId="editedItem.organizationId"
                        label="上级部门"
                        placeholder="请选择上级部门"
                    ></h-department-select>
                </template>
                <template v-slot:other>
                    <v-text-field
                        outlined
                        clearable
                        :disabled="true"
                        label="4A标准部门ID"
                        placeholder="4A标准部门ID"
                        v-model="editedItem.a4BizDeptId"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        :disabled="true"
                        label="标准部门ID"
                        placeholder="标准部门ID"
                        v-model="editedItem.bizDeptId"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        :disabled="true"
                        label="标准部门代码"
                        placeholder="标准部门代码"
                        v-model="editedItem.bizDeptCode"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        :disabled="true"
                        label="标准部门名称"
                        placeholder="标准部门名称"
                        v-model="editedItem.bizDeptName"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        :disabled="true"
                        label="标准部门类型"
                        placeholder="标准部门类型"
                        v-model="editedItem.bizDeptType"
                    ></v-text-field>
                </template>
            </h-table-item-editor>
        </validation-observer>
    </h-content-panel>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { Inject } from 'typescript-ioc';
import { HContentPanel, HTableItemEditor, HOrganizationSelect, HDepartmentSelect } from '@/components';
import { BaseService, BaseContent, Operation } from '@/lib/declarations';
import { SysDepartment, SysDepartmentService } from '@/modules';

@Component({
    components: {
        HContentPanel,
        HTableItemEditor,
        HOrganizationSelect,
        HDepartmentSelect,
    },
})
export default class Content extends BaseContent<SysDepartment> {
    @Inject
    private sysDepartmentService!: SysDepartmentService;

    get title(): string {
        return this.operation === Operation.CREATE ? '添加部门信息' : '编辑部门信息';
    }

    protected created(): void {
        super.created();
    }

    public getBaseService(): BaseService<SysDepartment> {
        return this.sysDepartmentService;
    }
}
</script>
