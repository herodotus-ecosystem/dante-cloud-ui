<template>
    <h-content-panel :title="title" :overlay="overlay">
        <validation-observer ref="observer">
            <h-table-item-editor v-model="editedItem" :overlay="overlay" column @submit="saveOrUpdate()">
                <template v-slot:primary>
                    <validation-provider v-slot="{ errors }" name="授权范围代码" rules="required">
                        <v-text-field
                            outlined
                            clearable
                            label="授权范围代码 * "
                            placeholder="请使用小写英文单词编写的授权范围代码，例如：all、read_user等"
                            v-model="editedItem.scopeCode"
                            :error-messages="errors"
                            required
                        ></v-text-field>
                    </validation-provider>
                    <v-text-field
                        outlined
                        clearable
                        label="授权范围名称"
                        placeholder="请输入授权范围名称"
                        v-model="editedItem.scopeName"
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
import { OAuth2Scope, OAuth2ScopeService } from '@/modules';
import { BaseService, BaseContent, Operation } from '@/lib/declarations';

@Component({
    components: {
        HContentPanel,
        HTableItemEditor,
    },
})
export default class Content extends BaseContent<OAuth2Scope> {
    @Inject
    private oauthScopesService!: OAuth2ScopeService;

    get title(): string {
        return this.operation === Operation.CREATE ? '添加范围信息' : '编辑范围信息';
    }

    protected created(): void {
        super.created();
    }

    public getBaseService(): BaseService<OAuth2Scope> {
        return this.oauthScopesService;
    }
}
</script>
