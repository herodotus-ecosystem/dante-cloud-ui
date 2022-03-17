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
import { OauthApplications, OauthApplicationsService } from '@/modules';
import { BaseIndex, BaseService } from '@/lib/declarations';

@Component({
    components: {
        HContainer,
        HActionButton,
        HTableItemChip,
        HTableItemStatus,
    },
})
export default class Index extends BaseIndex<OauthApplications> {
    pageNumber = 1;
    // 以下为 Table相关内容
    tableTitle = '终端应用信息';
    columnSlots = ['actions', 'status', 'reserved', 'applicationType', 'technologyType'];
    tableHeaders = [
        { text: 'APP_KEY', align: 'center', value: 'appKey' },
        { text: 'APP_SECRET', align: 'center', value: 'appSecret' },
        { text: '应用名称', align: 'center', value: 'appName' },
        { text: '应用简写', align: 'center', value: 'appNameEn' },
        { text: '备注', align: 'center', value: 'description' },
        { text: '保留数据', align: 'center', value: 'reserved' },
        { text: '状态', align: 'center', value: 'status' },
        { text: '操作', align: 'center', value: 'actions', sortable: false },
    ];

    @Inject
    oauthApplicationsService!: OauthApplicationsService;

    getBaseService(): BaseService<OauthApplications> {
        return this.oauthApplicationsService;
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
        return 'OauthApplications';
    }
}
</script>
