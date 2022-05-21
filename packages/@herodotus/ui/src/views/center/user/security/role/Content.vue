<template>
    <h-content-panel :title="title" :overlay="overlay">
        <validation-observer ref="observer">
            <h-table-item-editor v-model="editedItem" :overlay="overlay" column @submit="saveOrUpdate()">
                <template v-slot:primary>
                    <validation-provider v-slot="{ errors }" name="角色名称" rules="required">
                        <v-text-field
                            outlined
                            clearable
                            label="角色名称"
                            placeholder="请输入角色名称"
                            v-model="editedItem.roleName"
                            :error-messages="errors"
                            required
                        ></v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" vid="roleCode" name="角色代码" rules="required">
                        <v-text-field
                            outlined
                            clearable
                            label="角色代码 * "
                            placeholder="请输入ROLE_开头的角色代码"
                            v-model="editedItem.roleCode"
                            :error-messages="errors"
                            required
                            @blur="checkRoleCode"
                        ></v-text-field>
                    </validation-provider>
                </template>
            </h-table-item-editor>
        </validation-observer>
    </h-content-panel>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { Inject } from 'typescript-ioc';
import { ValidationObserver } from 'vee-validate';
import { HContentPanel, HTableItemEditor } from '@/components';
import { SysRole, SysRoleService } from '@/modules';
import { BaseService, BaseContent, Operation } from '@/lib/declarations';

@Component({
    components: {
        HContentPanel,
        HTableItemEditor,
    },
})
export default class Content extends BaseContent<SysRole> {
    @Inject
    private sysRoleService!: SysRoleService;

    get title(): string {
        return this.operation === Operation.CREATE ? '添加角色信息' : '编辑角色信息';
    }

    protected created(): void {
        super.created();
    }

    public getBaseService(): BaseService<SysRole> {
        return this.sysRoleService;
    }

    public checkRoleCode(): void {
        let roleCode = this.editedItem.roleCode;
        if (roleCode) {
            this.sysRoleService.fetchByRoleCode(roleCode).then((result) => {
                let role = result.data;
                if (role && role.roleCode) {
                    let observer = this.$refs.observer as InstanceType<typeof ValidationObserver>;
                    observer.setErrors({ roleCode: ['角色代码已存在'] });
                }
            });
        }
    }
}
</script>
