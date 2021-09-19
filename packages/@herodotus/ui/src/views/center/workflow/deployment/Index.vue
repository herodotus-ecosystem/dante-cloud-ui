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
import { Deployment, DeploymentQueryParam, DeploymentService } from '@/modules';
import { BaseBpmnIndex, BaseBpmnService } from '@/lib/declarations';

@Component({
    components: {
        HContainer,
        HActionButton,
        HTableItemChip,
        HTableItemStatus,
    },
})
export default class Index extends BaseBpmnIndex<Deployment, DeploymentQueryParam> {
    private pageNumber = 1;
    // 以下为 Table相关内容
    private tableTitle = '终端应用信息';
    private columnSlots = ['actions', 'status', 'reserved'];
    private tableHeaders = [
        { text: '部署ID', align: 'center', value: 'id' },
        { text: '部署名称', align: 'center', value: 'name' },
        { text: '部署途径', align: 'center', value: 'source' },
        { text: '租户ID', align: 'center', value: 'tenantId' },
        { text: '部署时间', align: 'center', value: 'deploymentTime' },
        { text: '操作', align: 'center', value: 'actions', sortable: false },
    ];

    @Inject
    private deploymentService!: DeploymentService;

    public getBaseBpmnService(): BaseBpmnService<Deployment, DeploymentQueryParam> {
        return this.deploymentService;
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
        return 'id';
    }

    public getDomainName(): string {
        return 'Deployment';
    }
}
</script>
