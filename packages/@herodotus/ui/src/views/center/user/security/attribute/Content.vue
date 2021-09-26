<template>
    <h-content-panel :title="title" :overlay="overlay">
        <validation-observer ref="observer">
            <h-table-item-editor v-model="editedItem" @submit="saveOrUpdate()">
                <template v-slot:primary>
                    <validation-provider v-slot="{ errors }" name="服务ID" rules="required">
                        <v-text-field
                            outlined
                            clearable
                            label="服务ID * "
                            placeholder="请输入服务ID"
                            v-model="editedItem.serviceId"
                            :error-messages="errors"
                            required
                        ></v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="URL" rules="required">
                        <v-text-field
                            outlined
                            clearable
                            label="URL * "
                            placeholder="请输入接口URL"
                            v-model="editedItem.url"
                            :error-messages="errors"
                            required
                        ></v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="Request Method" rules="required">
                        <v-text-field
                            outlined
                            clearable
                            label="Request Method * "
                            placeholder="请输入接口Request Method"
                            v-model="editedItem.requestMethod"
                            :error-messages="errors"
                            required
                        ></v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="默认权限代码" rules="required">
                        <v-text-field
                            outlined
                            clearable
                            label="默认权限代码 * "
                            placeholder="请输入默认权限代码"
                            v-model="editedItem.attributeCode"
                            :error-messages="errors"
                            required
                        ></v-text-field>
                    </validation-provider>
                    <h-dictionary-select
                        v-model="editedItem.expression"
                        dictionary="expression"
                        label="数据状态"
                    ></h-dictionary-select>
                </template>
            </h-table-item-editor>
        </validation-observer>
    </h-content-panel>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { Inject } from 'typescript-ioc';
import { HContentPanel, HTableItemEditor, HDictionarySelect } from '@/components';
import { SysSecurityAttributeService, SysSecurityAttribute } from '@/modules';
import { BaseService, BaseContent, Operation } from '@/lib/declarations';

@Component({
    components: {
        HContentPanel,
        HTableItemEditor,
        HDictionarySelect,
    },
})
export default class Content extends BaseContent<SysSecurityAttribute> {
    private expressions: string;

    @Inject
    private sysSecurityAttributeService!: SysSecurityAttributeService;

    get title(): string {
        return this.operation === Operation.CREATE ? '添加安全元数据信息' : '编辑安全元数据信息';
    }

    protected created(): void {
        super.created();
    }

    public getBaseService(): BaseService<SysSecurityAttribute> {
        return this.sysSecurityAttributeService;
    }
}
</script>
