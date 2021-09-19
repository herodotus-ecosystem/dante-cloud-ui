<template>
    <h-content-panel :title="title" :overlay="overlay">
        <validation-observer ref="observer">
            <h-table-item-editor v-model="editedItem" column @submit="saveOrUpdate()">
                <template v-slot:primary>
                    <validation-provider v-slot="{ errors }" name="用户名" rules="required">
                        <v-text-field
                            outlined
                            clearable
                            label="用户名 * "
                            placeholder="请输入用户名"
                            v-model="editedItem.userName"
                            :error-messages="errors"
                            required
                        ></v-text-field>
                    </validation-provider>
                    <v-text-field
                        outlined
                        clearable
                        label="昵称"
                        placeholder="请输入用户昵称"
                        v-model="editedItem.nickName"
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
import { SysUser, SysUserService } from '@/modules';
import { BaseService, BaseContent, Operation } from '@/lib/declarations';

@Component({
    components: {
        HContentPanel,
        HTableItemEditor,
    },
})
export default class Content extends BaseContent<SysUser> {
    @Inject
    private sysUserService!: SysUserService;

    get title(): string {
        return this.operation === Operation.CREATE ? '添加人员信息' : '编辑人员信息';
    }

    protected created(): void {
        super.created();
    }

    public getBaseService(): BaseService<SysUser> {
        return this.sysUserService;
    }
}
</script>
