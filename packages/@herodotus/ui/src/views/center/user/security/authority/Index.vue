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
                <v-btn color="primary" dark class="mb-2 mr-2" @click="createItem()">添加权限</v-btn>
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
import { SysAuthority, SysAuthorityService } from '@/modules';
import { BaseIndex, BaseService, ConstantDictionary, ConstantEnum } from '@/lib/declarations';

@Component({
    components: {
        HContainer,
        HActionButton,
        HTableItemChip,
        HTableItemStatus,
    },
})
export default class Index extends BaseIndex<SysAuthority> {
    private pageNumber = 1;
    private tableTitle = '权限平台信息';
    private columnSlots = ['actions', 'status', 'reserved'];
    private tableHeaders = [
        { text: '权限名称', align: 'center', value: 'authorityName' },
        { text: '权限代码', align: 'center', value: 'authorityCode' },
        { text: '权限类型', align: 'center', value: 'authorityType' },
        { text: 'Request Method', align: 'center', value: 'requestMethod' },
        { text: '服务ID', align: 'center', value: 'serviceId' },
        { text: '保留数据', align: 'center', value: 'reserved' },
        { text: '状态', align: 'center', value: 'status' },
        { text: '操作', align: 'center', value: 'actions', sortable: false },
    ];

    @Inject
    private sysAuthorityService!: SysAuthorityService;

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

    public getBaseService(): BaseService<SysAuthority> {
        return this.sysAuthorityService;
    }

    public getItemKey(): string {
        return 'authorityId';
    }

    public getDomainName(): string {
        return 'SysAuthority';
    }
}
</script>
