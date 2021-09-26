<template>
    <h-content-panel :title="title" :overlay="overlay">
        <validation-observer ref="observer">
            <h-table-item-editor v-model="editedItem" :overlay="overlay" column @submit="saveOrUpdate()">
                <template v-slot:primary>
                    <validation-provider v-slot="{ errors }" name="人员姓名" rules="required">
                        <v-text-field
                            outlined
                            clearable
                            label="人员姓名 * "
                            placeholder="人员姓名"
                            v-model="editedItem.employeeName"
                            :error-messages="errors"
                            required
                        ></v-text-field>
                    </validation-provider>
                    <v-text-field
                        outlined
                        clearable
                        label="人员编号"
                        placeholder="请输入人员编号"
                        v-model="editedItem.employeeNo"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        label="性别"
                        placeholder="性别"
                        v-model="editedItem.gender"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        label="身份"
                        placeholder="身份"
                        v-model="editedItem.identity"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        label="电子邮件"
                        placeholder="请输入电子邮件"
                        v-model="editedItem.email"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        label="PKI电子邮件"
                        placeholder="请输入PKI电子邮件"
                        v-model="editedItem.pkiEmail"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        label="手机号码"
                        placeholder="请输入手机号码"
                        v-model="editedItem.mobilePhoneNumber"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        label="办公电话"
                        placeholder="请输入办公电话"
                        v-model="editedItem.officePhoneNumber"
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
import { SysEmployee, SysEmployeeService } from '@/modules';
import { BaseService, BaseContent, Operation } from '@/lib/declarations';

@Component({
    components: {
        HContentPanel,
        HTableItemEditor,
    },
})
export default class Content extends BaseContent<SysEmployee> {
    @Inject
    private sysEmployeeService!: SysEmployeeService;

    get title(): string {
        return this.operation === Operation.CREATE ? '添加人员信息' : '编辑人员信息';
    }

    protected created(): void {
        super.created();
    }

    public getBaseService(): BaseService<SysEmployee> {
        return this.sysEmployeeService;
    }
}
</script>
