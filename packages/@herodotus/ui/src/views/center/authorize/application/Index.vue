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
            <template v-slot:[`item.status`]="{ item }">
                <h-table-item-status :type="item.status"></h-table-item-status>
            </template>
            <template v-slot:[`item.reserved`]="{ item }">
                <h-table-item-chip :status="item.reserved"></h-table-item-chip>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <h-action-button
                    authorize
                    edit
                    :remove="!item.reserved"
                    content="范围"
                    @authorize="authorizeItem(item)"
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
    columnSlots = ['actions', 'status', 'reserved', 'applicationType', 'technologyType'];
    tableHeaders = [
        { text: '客户端ID', align: 'center', value: 'registeredClientId' },
        { text: '用户名', align: 'center', value: 'principalName' },
        { text: '认证模式', align: 'center', value: 'authorizationGrantType' },
        { text: '认证状态', align: 'center', value: 'state' },
        { text: 'Token', align: 'center', value: 'accessToken' },
        { text: '操作', align: 'center', value: 'actions', sortable: false },
    ];

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
}
</script>
