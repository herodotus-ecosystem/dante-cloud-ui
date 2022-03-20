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
                <v-btn color="primary" dark class="mb-2 mr-2" @click="createItem()">创建应用</v-btn>
            </template>
            <template v-slot:[`item.authorizationGrantTypes`]="{ item }">
                <h-button
                    v-for="(data, index) in item.authorizationGrantTypes"
                    :key="index"
                    icon
                    :icon-name="iconSwitcher(data)"
                    :color="colorSwitcher(data)"
                    :tooltip="textSwitcher(data)"
                ></h-button>
            </template>
            <template v-slot:[`item.accessTokenValidity`]="{ item }">
                {{ durationConvert(item.accessTokenValidity) }}
            </template>
            <template v-slot:[`item.status`]="{ item }">
                <h-table-item-status :type="item.status"></h-table-item-status>
            </template>

            <template v-slot:[`item.reserved`]="{ item }">
                <h-table-item-chip :status="item.reserved"></h-table-item-chip>
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
import { OAuth2Application, OAuth2ApplicationService } from '@/modules';
import { BaseIndex, BaseService } from '@/lib/declarations';

@Component({
    components: {
        HContainer,
        HActionButton,
        HTableItemChip,
        HTableItemStatus,
    },
})
export default class Index extends BaseIndex<OAuth2Application> {
    pageNumber = 1;
    // 以下为 Table相关内容
    tableTitle = '终端应用信息';
    columnSlots = ['actions', 'status', 'reserved', 'accessTokenValidity', 'authorizationGrantTypes'];
    tableHeaders = [
        { text: '应用名称', align: 'center', value: 'applicationName' },
        { text: '应用简称', align: 'center', value: 'abbreviation' },
        { text: '认证模式', align: 'center', value: 'authorizationGrantTypes' },
        { text: '认证状态', align: 'center', value: 'state' },
        { text: 'Token有效时间', align: 'center', value: 'accessTokenValidity' },
        { text: '说明', align: 'center', value: 'description' },
        { text: '保留数据', align: 'center', value: 'reserved' },
        { text: '状态', align: 'center', value: 'status' },
        { text: '操作', align: 'center', value: 'actions', sortable: false },
    ];
    typeStyles = {
        authorization_code: { color: 'pink', icon: 'mdi-security', text: '授权码模式' },
        client_credentials: { color: 'teal', icon: 'mdi-arrow-decision-auto', text: '客户端凭证模式' },
        password: { color: 'cyan', icon: 'mdi-file-key', text: '密码模式' },
        implicit: { color: 'purple', icon: 'mdi-file-hidden', text: '隐式/简化模式' },
        refresh_token: { color: 'indigo', icon: 'mdi-cog-refresh', text: '刷新模式' },
        social_credentials: { color: 'light-blue', icon: 'mdi-cast-connected', text: '社交化认证模式' },
    };

    @Inject
    private oAuth2ApplicationService!: OAuth2ApplicationService;

    public getBaseService(): BaseService<OAuth2Application> {
        return this.oAuth2ApplicationService;
    }

    @Watch('pageNumber')
    onPageNumberChanged(newValue: number): void {
        this.findItemsByPage(newValue);
    }

    pagination(e) {
        this.pageNumber = e as number;
    }

    mounted(): void {
        super.mounted();
    }

    getItemKey(): string {
        return 'applicationId';
    }

    getDomainName(): string {
        return 'OAuth2Application';
    }

    styleSwitcher(grantType, property) {
        let type = this.typeStyles[grantType];
        if (type) {
            return type[property];
        }
    }
    colorSwitcher(grantType) {
        return this.styleSwitcher(grantType, 'color');
    }

    iconSwitcher(grantType) {
        return this.styleSwitcher(grantType, 'icon');
    }

    textSwitcher(grantType) {
        return this.styleSwitcher(grantType, 'text');
    }

    durationConvert(data: string): string {
        return this.$lib.moment.duration(data).humanize();
    }
}
</script>
