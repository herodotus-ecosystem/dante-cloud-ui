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
                <v-btn color="primary" dark class="mb-2 mr-2" @click="createItem()">创建团队</v-btn>
            </template>
            <template v-slot:[`item.supplierType`]="{ item }">
                {{ parseType(item) }}
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
import { Supplier, SupplierService } from '@/modules';
import { BaseIndex, BaseService, ConstantDictionary, ConstantEnum } from '@/lib/declarations';

@Component({
    components: {
        HContainer,
        HActionButton,
        HTableItemChip,
        HTableItemStatus,
    },
})
export default class Index extends BaseIndex<Supplier> {
    private pageNumber = 1;
    // 以下为 Table相关内容
    private tableTitle = '开发团队/厂商信息';
    private columnSlots = ['actions', 'status', 'reserved', 'supplierType'];
    private tableHeaders = [
        { text: '团队名称', align: 'center', value: 'supplierName' },
        { text: '团队代码', align: 'center', value: 'supplierCode' },
        { text: '团队类型', align: 'center', value: 'supplierType' },
        { text: '备注', align: 'center', value: 'description' },
        { text: '保留数据', align: 'center', value: 'reserved' },
        { text: '状态', align: 'center', value: 'status' },
        { text: '操作', align: 'center', value: 'actions', sortable: false },
    ];

    @Inject
    private supplierService!: SupplierService;

    private supplerType: ConstantDictionary[] = new Array<ConstantDictionary>();

    @Watch('pageNumber')
    protected onPageNumberChanged(newValue: number): void {
        this.findItemsByPage(newValue);
    }

    private pagination(e) {
        this.pageNumber = e as number;
    }

    protected mounted(): void {
        this.getConstants();
        super.mounted();
    }
    private getConstants(): void {
        this.$enums.getItem(ConstantEnum.SUPPLIER).then((result) => {
            this.supplerType = result;
        });
    }

    public getBaseService(): BaseService<Supplier> {
        return this.supplierService;
    }

    public getItemKey(): string {
        return 'supplierId';
    }

    public getDomainName(): string {
        return 'DevelopmentSupplier';
    }

    private parseType(item: Supplier): string {
        if (typeof item.supplierType == 'number') {
            return this.supplerType[item.supplierType].text;
        } else {
            return '';
        }
    }
}
</script>
