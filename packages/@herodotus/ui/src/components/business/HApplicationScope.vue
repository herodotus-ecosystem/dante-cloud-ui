<template>
    <h-container>
        <h-table
            v-model="selectedItems"
            show-select
            disablePagination
            :table-headers="tableHeaders"
            :table-items="tableItems"
            :page-size="-1"
            :total-items="totalItems"
            :total-pages="totalPages"
            :table-title="tableTitle"
            :table-loading="tableLoading"
            :skeleton-loading="skeletonLoading"
            :column-slots="columnSlots"
            :item-key="getCompareKey()"
            @select-item="selectItem($event)"
            @select-all-items="selectAllItems($event)"
        >
        </h-table>
    </h-container>
</template>

<script lang="ts">
import { Component, VModel, Watch } from 'vue-property-decorator';
import { Inject } from 'typescript-ioc';
import { HContainer, HActionButton, HTableItemChip, HTableItemStatus } from '@/components';
import { OAuth2Scope, OAuth2ScopeService } from '@/modules';
import { BaseIndex, BaseService } from '@/lib/declarations';

@Component({
    components: {
        HContainer,
        HActionButton,
        HTableItemChip,
        HTableItemStatus,
    },
})
export default class HApplicationScope extends BaseIndex<OAuth2Scope> {
    @VModel({ type: Array, default: () => [] }) selectedItems?: string[];

    pageNumber = 1;
    // 以下为 Table相关内容
    tableTitle = '授权范围';
    columnSlots = ['actions', 'status', 'reserved'];
    tableHeaders = [
        { text: '范围代码', align: 'center', value: 'scopeCode' },
        { text: '范围名称', align: 'center', value: 'scopeName' },
        { text: '说明', align: 'center', value: 'description' },
    ];

    @Inject
    oAuth2ScopeService!: OAuth2ScopeService;

    getBaseService(): BaseService<OAuth2Scope> {
        return this.oAuth2ScopeService;
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
        return 'scopeId';
    }

    getDomainName(): string {
        return 'OAuth2Scope';
    }

    getCompareKey(): string {
        return 'scopeId';
    }

    public selectItem(e): void {
        const item = e.item;
        const isSelected = e.value;
        if (isSelected) {
            this.selectedItems.push(item);
        } else {
            this.$lib._array.remove(this.selectedItems, item, this.getCompareKey());
        }
    }

    public selectAllItems(e): void {
        if (e.value) {
            this.selectedItems = e.items;
        } else {
            this.selectedItems = [];
        }
    }
}
</script>
