<template>
    <h-container>
        <h-table
            show-select
            external-pagination
            :table-headers="tableHeaders"
            :table-items="tableItems"
            :page-size="pageSize"
            :total-items="totalItems"
            :total-pages="totalPages"
            :table-title="tableTitle"
            :table-loading="tableLoading"
            :skeleton-loading="skeletonLoading"
            :column-slots="columnSlots"
            :item-key="getItemKey()"
            @pagination="pagination($event)"
        >
            <template v-slot:top>
                <v-btn color="primary" dark class="mb-2 mr-2" @click="createItem()">申请APP_KEY</v-btn>
            </template>
            <template v-slot:[`item.access_token_validity`]="{ item }">
                <v-chip v-if="!isServiceTypeDataItem(item)" color="teal" dark small text-color="white">
                    {{ timeDisplay(item.access_token_validity) }}
                </v-chip>
            </template>
            <template v-slot:[`item.refresh_token_validity`]="{ item }">
                <v-chip v-if="!isServiceTypeDataItem(item)" color="teal" dark small text-color="white">
                    {{ timeDisplay(item.refresh_token_validity) }}
                </v-chip>
            </template>
            <template v-slot:[`item.redirect_uri`]="{ item }">
                <v-menu v-if="!isServiceTypeDataItem(item)" open-on-hover top offset-y>
                    <template v-slot:activator="{ on }">
                        <v-icon color="primary" dark v-on="on"> mdi-shuffle-variant </v-icon>
                    </template>
                    <v-list dense>
                        <v-list-item v-for="(data, index) in item.web_server_redirect_uri" :key="index">
                            <v-list-item-title>{{ data }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>
            <template v-slot:[`item.authorized_grant_types`]="{ item }">
                <template v-for="(data, index) in item.authorized_grant_types">
                    <v-tooltip bottom :key="index">
                        <template v-slot:activator="{ on }">
                            <v-icon :class="index ? 'ml-2' : ''" :color="colorSwitcher(data)" v-on="on">
                                {{ iconSwitcher(data) }}
                            </v-icon>
                        </template>
                        <span>{{ textSwitcher(data) }}</span>
                    </v-tooltip>
                </template>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <h-action-button
                    edit
                    :remove="!item.reserved"
                    @edit="editItem(item)"
                    @remove="deleteItem(item)"
                ></h-action-button>
            </template>
        </h-table>
    </h-container>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import { Inject } from 'typescript-ioc';
import { HContainer, HActionButton, HTableItemChip, HTableItemStatus } from '@/components';
import { OauthClientDetails, OauthClientDetailsService } from '@/modules';
import { BaseIndex, BaseService } from '@/lib/declarations';

@Component({
    components: {
        HContainer,
        HActionButton,
        HTableItemChip,
        HTableItemStatus,
    },
})
export default class Index extends BaseIndex<OauthClientDetails> {
    private pageNumber = 1;
    // 以下为 Table相关内容
    private tableTitle = '客户端详情信息';
    private columnSlots = [
        'actions',
        'redirect_uri',
        'authorized_grant_types',
        'access_token_validity',
        'refresh_token_validity',
    ];
    private tableHeaders = [
        { text: 'APP_KEY', align: 'center', value: 'client_id' },
        { text: '应用名称', align: 'center', value: 'additional_information.appName' },
        { text: '应用类型', align: 'center', value: 'additional_information.applicationType' },
        { text: '授权类型', align: 'center', value: 'authorized_grant_types' },
        { text: 'Token有效时间', align: 'center', value: 'access_token_validity' },
        { text: 'Token刷新时间', align: 'center', value: 'refresh_token_validity' },
        { text: '地址', align: 'center', value: 'redirect_uri' },
        { text: '操作', align: 'center', value: 'actions', sortable: false },
    ];
    private typeStyles = {
        authorization_code: { color: 'pink', icon: 'mdi-security', text: '授权码模式' },
        client_credentials: { color: 'teal', icon: 'mdi-arrow-decision-auto', text: '客户端凭证模式' },
        password: { color: 'cyan', icon: 'mdi-file-key', text: '密码模式' },
        implicit: { color: 'purple', icon: 'mdi-file-hidden', text: '隐式/简化模式' },
        refresh_token: { color: 'indigo', icon: 'mdi-cog-refresh', text: '刷新模式' },
        social_authentication: { color: 'light-blue', icon: 'mdi-cast-connected', text: '社交化认证模式' },
    };

    @Inject
    private oauthClientDetailsService!: OauthClientDetailsService;

    private styleSwitcher(grantType, property) {
        let type = this.typeStyles[grantType];
        if (type) {
            return type[property];
        }
    }
    private colorSwitcher(grantType) {
        return this.styleSwitcher(grantType, 'color');
    }

    private iconSwitcher(grantType) {
        return this.styleSwitcher(grantType, 'icon');
    }

    private textSwitcher(grantType) {
        return this.styleSwitcher(grantType, 'text');
    }

    private timeDisplay(time) {
        if (time === 0) {
            return '0';
        } else {
            return this.$lib.moment.duration(time, 'second').humanize();
        }
    }

    isServiceTypeDataItem(item) {
        let object = item.additional_information;
        if (object && object.applicationType && object.applicationType === 'SERVICE') {
            return true;
        }
        return false;
    }

    public getBaseService(): BaseService<OauthClientDetails> {
        return this.oauthClientDetailsService;
    }

    @Watch('pageNumber')
    protected onPageNumberChanged(newValue: number): void {
        this.findItemsByPage(newValue);
    }

    private pagination(e) {
        this.pageNumber = e as number;
    }

    protected mounted(): void {
        super.mounted();
    }

    public getItemKey(): string {
        return 'client_id';
    }

    public getDomainName(): string {
        return 'OauthClientDetails';
    }
}
</script>
