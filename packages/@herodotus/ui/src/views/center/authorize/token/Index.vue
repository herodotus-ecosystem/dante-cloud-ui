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
            <template v-slot:[`item.accessTokenIssuedAt`]="{ item }">
                {{ format(item.accessTokenIssuedAt) }}
            </template>
            <template v-slot:[`item.accessTokenExpiresAt`]="{ item }">
                {{ format(item.accessTokenExpiresAt) }}
            </template>
            <template v-slot:[`item.refreshTokenIssuedAt`]="{ item }">
                {{ format(item.refreshTokenIssuedAt) }}
            </template>
            <template v-slot:[`item.refreshTokenExpiresAt`]="{ item }">
                {{ format(item.refreshTokenExpiresAt) }}
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <h-action-button remove @remove="logout(item)">
                    <template slot="left"
                        ><h-button
                            icon
                            color="brown"
                            icon-name="mdi-information"
                            :tooltip="item.accessToken"
                            tooltip-max-width="200px"
                        ></h-button>
                        <h-button
                            icon
                            color="cyan"
                            icon-name="mdi-information-outline"
                            :tooltip="item.refreshToken"
                            tooltip-max-width="200px"
                        ></h-button>
                    </template>
                </h-action-button>
            </template>
        </h-table>
    </h-container>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import { Inject } from 'typescript-ioc';
import { HContainer, HActionButton, HTableItemChip, HTableItemStatus } from '@/components';
import { OAuth2Token, OAuth2TokenService } from '@/modules';
import { BaseIndex, BaseService } from '@/lib/declarations';

@Component({
    components: {
        HContainer,
        HActionButton,
        HTableItemChip,
        HTableItemStatus,
    },
})
export default class Index extends BaseIndex<OAuth2Token> {
    pageNumber = 1;
    // 以下为 Table相关内容
    tableTitle = '凭证管理';
    columnSlots = [
        'actions',
        'accessTokenIssuedAt',
        'accessTokenExpiresAt',
        'refreshTokenIssuedAt',
        'refreshTokenExpiresAt',
    ];
    tableHeaders = [
        { text: '客户端ID', align: 'center', value: 'registeredClientId' },
        { text: '用户名', align: 'center', value: 'principalName' },
        { text: '认证模式', align: 'center', value: 'authorizationGrantType' },
        { text: '访问Token颁发时间', align: 'center', value: 'accessTokenIssuedAt' },
        { text: '访问Token过期时间', align: 'center', value: 'accessTokenExpiresAt' },
        { text: '刷新Token颁发时间', align: 'center', value: 'refreshTokenIssuedAt' },
        { text: '刷新Token过期时间', align: 'center', value: 'refreshTokenExpiresAt' },
        { text: '操作', align: 'center', value: 'actions', sortable: false },
    ];

    @Inject
    oAuth2TokenService!: OAuth2TokenService;

    getBaseService(): BaseService<OAuth2Token> {
        return this.oAuth2TokenService;
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
        return 'id';
    }

    getDomainName(): string {
        return 'OAuth2Token';
    }

    format(date: string): string {
        if (date) {
            return this.$lib.moment(date).format('YYYY-MM-DD HH:mm:ss');
        } else {
            return '';
        }
    }

    logout(item) {
        if (item && item.accessToken) {
            this.$security.signout(item.accessToken);
        } else {
            super.deleteItem(item);
        }
    }
}
</script>
