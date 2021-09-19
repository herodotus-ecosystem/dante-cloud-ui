<template>
    <h-content-panel :title="title" :overlay="overlay">
        <validation-observer ref="observer">
            <h-table-item-editor v-model="editedItem" :overlay="overlay" column @submit="saveOrUpdate()">
                <template v-slot:primary>
                    <validation-provider v-slot="{ errors }" name="单位名称" rules="required">
                        <v-text-field
                            outlined
                            clearable
                            label="单位名称 * "
                            placeholder="请输入单位名称"
                            v-model="editedItem.organizationName"
                            :error-messages="errors"
                            required
                        ></v-text-field>
                    </validation-provider>
                    <v-text-field
                        outlined
                        clearable
                        label="单位分区码"
                        placeholder="请输入单位分区码名称"
                        v-model="editedItem.partitionCode"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        label="单位简称"
                        placeholder="请输入单位简称"
                        v-model="editedItem.shortName"
                    ></v-text-field>
                </template>
                <template v-slot:other>
                    <v-text-field
                        outlined
                        clearable
                        :disabled="true"
                        label="4A标准单位ID"
                        placeholder="4A标准单位ID"
                        v-model="editedItem.a4BizOrgId"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        :disabled="true"
                        label="标准单位ID"
                        placeholder="标准单位ID"
                        v-model="editedItem.bizOrgId"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        :disabled="true"
                        label="标准单位代码"
                        placeholder="标准单位代码"
                        v-model="editedItem.bizOrgCode"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        :disabled="true"
                        label="标准单位名称"
                        placeholder="标准单位名称"
                        v-model="editedItem.bizOrgName"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        :disabled="true"
                        label="标准单位类型"
                        placeholder="标准单位类型"
                        v-model="editedItem.bizOrgType"
                    ></v-text-field>
                </template>
            </h-table-item-editor>
        </validation-observer>
    </h-content-panel>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { Inject } from 'typescript-ioc';
import { HContentPanel, HTableItemEditor } from '@/components';
import { SysOrganization, SysOrganizationService } from '@/modules';
import { BaseService, BaseContent, Operation } from '@/lib/declarations';

@Component({
    components: {
        HContentPanel,
        HTableItemEditor,
    },
})
export default class Content extends BaseContent<SysOrganization> {
    @Inject
    private sysOrganizationService!: SysOrganizationService;

    get title(): string {
        return this.operation === Operation.CREATE ? '添加单位信息' : '编辑单位信息';
    }

    protected created(): void {
        super.created();
    }

    public getBaseService(): BaseService<SysOrganization> {
        return this.sysOrganizationService;
    }
}
</script>
