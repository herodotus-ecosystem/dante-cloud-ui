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
                            v-model="editedItem.appName"
                            :error-messages="errors"
                            required
                        ></v-text-field>
                    </validation-provider>
                    <v-text-field
                        outlined
                        clearable
                        label="应用名称英文(可选)"
                        placeholder="请输入英文应用名称"
                        v-model="editedItem.appNameEn"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        label="应用图标(可选)"
                        placeholder="请输入应用图标"
                        v-model="editedItem.appIcon"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        clearable
                        label="应用地址"
                        placeholder="请输入应用地址"
                        v-model="editedItem.website"
                    ></v-text-field>
                    <h-dictionary-select
                        v-model="editedItem.applicationType"
                        dictionary="applicationType"
                        label="应用类型"
                    ></h-dictionary-select>
                    <h-dictionary-select
                        v-model="editedItem.technologyType"
                        dictionary="technologyType"
                        label="技术类型"
                    ></h-dictionary-select>
                </template>
                <template v-slot:other>
                    <v-text-field
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
                    ></v-text-field>
                </template>
            </h-table-item-editor>
        </validation-observer>
    </h-content-panel>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { Inject } from 'typescript-ioc';
import { HContentPanel, HTableItemEditor, HDictionarySelect } from '@/components';
import { OauthApplications, OauthApplicationsService } from '@/modules';
import { BaseService, BaseContent, Operation } from '@/lib/declarations';

@Component({
    components: {
        HContentPanel,
        HTableItemEditor,
        HDictionarySelect,
    },
})
export default class Content extends BaseContent<OauthApplications> {
    @Inject
    private oauthApplicationsService!: OauthApplicationsService;

    get title(): string {
        return this.operation === Operation.CREATE ? '添加终端信息' : '编辑终端信息';
    }

    protected created(): void {
        super.created();
    }

    public getBaseService(): BaseService<OauthApplications> {
        return this.oauthApplicationsService;
    }
}
</script>
