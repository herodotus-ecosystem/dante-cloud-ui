<template>
    <h-content-panel :title="title" :overlay="overlay">
        <validation-observer ref="observer">
            <h-table-item-editor v-model="editedItem" column @submit="saveOrUpdate()">
                <template v-slot:primary>
                    <validation-provider v-slot="{ errors }" name="应用名称" rules="required">
                        <v-text-field
                            outlined
                            clearable
                            label="应用名称 * "
                            placeholder="请输入应用名称"
                            v-model="editedItem.applicationName"
                            :error-messages="errors"
                            required
                        ></v-text-field>
                    </validation-provider>
                    <v-text-field
                        outlined
                        clearable
                        label="应用简称(可选)"
                        placeholder="请输入应用简称"
                        v-model="editedItem.abbreviation"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        label="应用图标(可选)"
                        placeholder="请输入应用图标"
                        v-model="editedItem.logo"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        label="应用主页(可选)"
                        placeholder="请输入应用主页"
                        v-model="editedItem.homepage"
                    ></v-text-field>
                    <v-text-field outlined clearable label="Client Id" v-model="editedItem.clientId"></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        label="Client Secret"
                        v-model="editedItem.clientSecret"
                    ></v-text-field>
                    <v-text-field outlined clearable label="回调地址" v-model="editedItem.redirectUris"></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        label="认证模式"
                        v-model="editedItem.authorizationGrantTypes"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        label="客户端认证模式"
                        v-model="editedItem.clientAuthenticationMethods"
                    ></v-text-field>
                    <v-switch
                        v-model="editedItem.reuseRefreshTokens"
                        label="是否重用 Refresh Token"
                        color="primary"
                    ></v-switch>
                    <h-dictionary-select
                        v-model="editedItem.applicationType"
                        dictionary="applicationType"
                        label="应用类型"
                    ></h-dictionary-select>
                    <!-- <h-dictionary-select
                        v-model="editedItem.technologyType"
                        dictionary="technologyType"
                        label="技术类型"
                    ></h-dictionary-select> -->
                </template>
                <template v-slot:other>
                    <!-- <v-text-field
                        outlined
                        clearable
                        :disabled="true"
                        label="APP_KEY"
                        placeholder="应用APP_KEY"
                        v-model="editedItem.appKey"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        :disabled="true"
                        label="APP_SECRET"
                        placeholder="应用APP_SECRET"
                        v-model="editedItem.appSecret"
                    ></v-text-field> -->
                </template>
            </h-table-item-editor>
        </validation-observer>
    </h-content-panel>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { Inject } from 'typescript-ioc';
import { HContentPanel, HTableItemEditor, HDictionarySelect } from '@/components';
import { OAuth2Application, OAuth2ApplicationService } from '@/modules';
import { BaseService, BaseContent, Operation } from '@/lib/declarations';

@Component({
    components: {
        HContentPanel,
        HTableItemEditor,
        HDictionarySelect,
    },
})
export default class Content extends BaseContent<OAuth2Application> {
    @Inject
    private oAuth2ApplicationService!: OAuth2ApplicationService;

    get title(): string {
        return this.operation === Operation.CREATE ? '添加应用信息' : '编辑应用信息';
    }

    created(): void {
        super.created();
    }

    getBaseService(): BaseService<OAuth2Application> {
        return this.oAuth2ApplicationService;
    }
}
</script>
