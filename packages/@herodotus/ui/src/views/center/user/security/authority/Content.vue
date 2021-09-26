<template>
    <h-content-panel :title="title" :overlay="overlay">
        <validation-observer ref="observer">
            <h-table-item-editor v-model="editedItem" :overlay="overlay" column @submit="saveOrUpdate()">
                <template v-slot:primary>
                    <validation-provider v-slot="{ errors }" name="权限名称" rules="required">
                        <v-text-field
                            outlined
                            clearable
                            label="权限名称 * "
                            placeholder="请输权限名称"
                            v-model="editedItem.authorityName"
                            :error-messages="errors"
                            required
                        ></v-text-field>
                    </validation-provider>
                    <v-text-field
                        outlined
                        clearable
                        label="权限代码"
                        placeholder="请输入权限代码"
                        v-model="editedItem.authorityCode"
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
import { SysAuthority, SysAuthorityService } from '@/modules';
import { BaseService, BaseContent, Operation } from '@/lib/declarations';

@Component({
    components: {
        HContentPanel,
        HTableItemEditor,
    },
})
export default class Content extends BaseContent<SysAuthority> {
    @Inject
    private sysAuthorityService!: SysAuthorityService;

    get title(): string {
        return this.operation === Operation.CREATE ? '添加权限信息' : '编辑权限信息';
    }

    protected created(): void {
        super.created();
    }

    public getBaseService(): BaseService<SysAuthority> {
        return this.sysAuthorityService;
    }
}
</script>
