<template>
    <h-content-panel :title="title" :overlay="overlay">
        <validation-observer ref="observer">
            <h-table-item-editor v-model="editedItem" :overlay="overlay" column @submit="saveOrUpdate()">
                <template v-slot:primary>
                    <validation-provider v-slot="{ errors }" name="团队名称" rules="required">
                        <v-text-field
                            outlined
                            clearable
                            label="团队名称 * "
                            placeholder="请输入团队名称"
                            v-model="editedItem.supplierName"
                            :error-messages="errors"
                            required
                        ></v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="团队代码" rules="required">
                        <v-text-field
                            outlined
                            clearable
                            label="团队代码 * "
                            placeholder="请输入团队代码"
                            v-model="editedItem.supplierCode"
                            :error-messages="errors"
                            required
                        ></v-text-field>
                    </validation-provider>
                    <h-dictionary-select
                        v-model="editedItem.supplierType"
                        dictionary="supplierType"
                        label="团队/厂商类型"
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
import { Supplier, SupplierService } from '@/modules';
import { BaseService, BaseContent, Operation } from '@/lib/declarations';

@Component({
    components: {
        HContentPanel,
        HTableItemEditor,
        HDictionarySelect,
    },
})
export default class Content extends BaseContent<Supplier> {
    @Inject
    private supplierService!: SupplierService;

    get title(): string {
        return this.operation === Operation.CREATE ? '添加团队/厂商信息' : '编辑团队/厂商信息';
    }

    protected created(): void {
        super.created();
    }

    public getBaseService(): BaseService<Supplier> {
        return this.supplierService;
    }
}
</script>
