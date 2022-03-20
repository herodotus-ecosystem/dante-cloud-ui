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
                    <v-text-field outlined clearable label="回调地址" v-model="editedItem.redirectUris"></v-text-field>
                    <validation-provider v-slot="{ errors }" name="认证模式" rules="required">
                        <h-dictionary-select
                            v-model="editedItem.authorizationGrantTypes"
                            dictionary="grantType"
                            label="认证模式 * "
                            multiple
                            placeholder="请选择认证模式，可以多个"
                            :error-messages="errors"
                            required
                        ></h-dictionary-select>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="客户端验证模式" rules="required">
                        <h-dictionary-select
                            v-model="editedItem.clientAuthenticationMethods"
                            dictionary="authenticationMethod"
                            label="客户端验证模式 * "
                            multiple
                            placeholder="请选择客户端验证模式，可以多个"
                            :error-messages="errors"
                            required
                        ></h-dictionary-select>
                    </validation-provider>
                    <v-text-field
                        v-if="isEdit"
                        outlined
                        clearable
                        label="Client Id"
                        disabled
                        v-model="editedItem.clientId"
                    ></v-text-field>
                    <v-text-field
                        v-if="isEdit"
                        outlined
                        clearable
                        label="Client Secret"
                        disabled
                        v-model="editedItem.clientSecret"
                    ></v-text-field>
                    <v-switch
                        v-model="editedItem.requireProofKey"
                        label="是否需要 Proof Key"
                        color="primary"
                    ></v-switch>
                    <v-switch
                        v-model="editedItem.requireAuthorizationConsent"
                        label="是否需要认证确认"
                        color="primary"
                    ></v-switch>
                    <v-switch
                        v-model="editedItem.reuseRefreshTokens"
                        label="是否允许重用 Refresh Token"
                        color="primary"
                    ></v-switch>
                    <h-duration v-model="editedItem.accessTokenValidity" label="Access Token 有效时间"></h-duration>
                    <h-duration v-model="editedItem.refreshTokenValidity" label="Refresh Token 有效时间"></h-duration>
                    <h-dictionary-select
                        v-model="editedItem.applicationType"
                        dictionary="applicationType"
                        label="应用类型"
                    ></h-dictionary-select>
                    <h-dictionary-select
                        v-model="editedItem.signature"
                        dictionary="signature"
                        label="JWS 算法"
                    ></h-dictionary-select>
                    <v-text-field
                        outlined
                        clearable
                        label="客户端密钥过期时间"
                        v-model="editedItem.clientSecretExpiresAt"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        label="客户端密钥集URL"
                        v-model="editedItem.jwkSetUrl"
                    ></v-text-field>
                </template>
                <template v-slot:other>
                    <h-application-scope v-model="editedItem.scopes"></h-application-scope
                ></template>
            </h-table-item-editor>
        </validation-observer>
    </h-content-panel>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { Inject } from 'typescript-ioc';
import { HContentPanel, HTableItemEditor, HDictionarySelect, HDuration, HApplicationScope } from '@/components';
import { OAuth2Application, OAuth2ApplicationService } from '@/modules';
import { BaseService, BaseContent, Operation } from '@/lib/declarations';

@Component({
    components: {
        HDuration,
        HContentPanel,
        HTableItemEditor,
        HDictionarySelect,
        HApplicationScope,
    },
})
export default class Content extends BaseContent<OAuth2Application> {
    public currentEntity: OAuth2Application = {} as OAuth2Application;

    @Inject
    private oAuth2ApplicationService!: OAuth2ApplicationService;

    get title(): string {
        return !this.isEdit ? '添加应用信息' : '编辑应用信息';
    }

    get isEdit(): boolean {
        return this.operation === Operation.EDIT;
    }

    created(): void {
        super.created();
    }

    getBaseService(): BaseService<OAuth2Application> {
        return this.oAuth2ApplicationService;
    }
}
</script>
