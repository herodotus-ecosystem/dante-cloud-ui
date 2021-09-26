<template>
    <h-content-panel :title="title" :overlay="overlay">
        <validation-observer ref="observer">
            <h-table-item-editor v-model="editedItem" :overlay="overlay" column clear @submit="saveOrUpdate()">
                <template v-slot:primary>
                    <validation-provider v-slot="{ errors }" name="授权模式" rules="required">
                        <h-dictionary-select
                            v-model="editedItem.authorized_grant_types"
                            dictionary="grantType"
                            label="授权模式 * "
                            multiple
                            placeholder="请选择授权模式，可以多个"
                            :error-messages="errors"
                            required
                        ></h-dictionary-select>
                    </validation-provider>
                    <v-text-field
                        outlined
                        clearable
                        label="资源IDs(选填)"
                        placeholder="请输入资源ID，多个以逗号分隔"
                        v-model="editedItem.resource_ids"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        label="重定向地址"
                        placeholder="请输入重定向地址，多个以逗号进行分隔"
                        v-model="editedItem.redirect_uri"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        label="Token有效时间"
                        placeholder="Token有效时间，单位秒"
                        v-model="editedItem.access_token_validity"
                        min="1800"
                        step="1800"
                        type="number"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        label="Token刷新时间"
                        placeholder="Token刷新时间，单位秒"
                        v-model="editedItem.refresh_token_validity"
                        min="1800"
                        step="1800"
                        type="number"
                    ></v-text-field>
                    <v-divider class="mb-5"></v-divider>
                </template>
                <template v-slot:other>
                    <v-text-field
                        outlined
                        clearable
                        :disabled="true"
                        label="APP_KEY"
                        placeholder="应用APP_KEY"
                        v-model="editedItem.client_id"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        :disabled="true"
                        label="APP_SECRET"
                        placeholder="应用APP_SECRET"
                        :value="appSecret"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        :disabled="true"
                        label="应用名称"
                        placeholder="该应用为"
                        :value="appName"
                    ></v-text-field>
                    <v-select
                        v-model="editedItem.scope"
                        :disabled="true"
                        small-chips
                        :items="editedItem.scope"
                        chips
                        label="范围设置"
                        placeholder="该终端授权范围为"
                        multiple
                        outlined
                    ></v-select>
                </template>
            </h-table-item-editor>
        </validation-observer>
    </h-content-panel>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { Inject } from 'typescript-ioc';
import { HContentPanel, HTableItemEditor, HDictionarySelect } from '@/components';
import { OauthClientDetails, OauthClientDetailsService, OauthApplications } from '@/modules';
import { BaseService, BaseContent, Operation } from '@/lib/declarations';

@Component({
    components: {
        HContentPanel,
        HTableItemEditor,
        HDictionarySelect,
    },
})
export default class Content extends BaseContent<OauthClientDetails> {
    @Inject
    private oauthClientDetailsService!: OauthClientDetailsService;

    get title(): string {
        return this.operation === Operation.CREATE ? '添加终端信息' : '编辑终端信息';
    }

    protected created(): void {
        super.created();
    }

    public getBaseService(): BaseService<OauthClientDetails> {
        return this.oauthClientDetailsService;
    }

    get additionalInformation(): OauthApplications {
        return this.editedItem.additional_information;
    }

    get appSecret(): string {
        if (this.additionalInformation) {
            return this.additionalInformation.appSecret;
        } else {
            return '';
        }
    }

    get appName(): string {
        if (this.additionalInformation) {
            return this.additionalInformation.appName;
        } else {
            return '';
        }
    }
}
</script>
