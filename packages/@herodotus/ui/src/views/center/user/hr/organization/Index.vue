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
                <v-card max-width="200" flat>
                    <v-container class="m-0">
                        <v-row>
                            <v-col cols="12">
                                <h-dictionary-select
                                    v-model="category"
                                    dictionary="organizationCategory"
                                    label="组织类别"
                                    dense
                                    hide-details
                                ></h-dictionary-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
                <v-btn color="primary" dark class="mr-2" @click="creatItemWithParam()">添加单位</v-btn>
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
import { DataTableHeader } from 'vuetify';
import { Component, Watch } from 'vue-property-decorator';
import { Inject } from 'typescript-ioc';
import { HContainer, HActionButton, HTableItemChip, HTableItemStatus, HDictionarySelect } from '@/components';
import { SysOrganization, SysOrganizationService } from '@/modules';
import { BaseIndex, BaseService } from '@/lib/declarations';

@Component({
    components: {
        HContainer,
        HActionButton,
        HTableItemChip,
        HTableItemStatus,
        HDictionarySelect,
    },
})
export default class Index extends BaseIndex<SysOrganization> {
    // @Watch注解必须依赖一个Data属性
    pageNumber = 1;
    tableTitle = '单位信息';
    columnSlots = ['actions', 'status', 'reserved'];
    tableHeaders: DataTableHeader[] = [
        { text: '单位名称', align: 'center', value: 'organizationName' },
        { text: '单位简称', align: 'center', value: 'shortName' },
        { text: '分区代码', align: 'center', value: 'partitionCode' },
        { text: '备注', align: 'center', value: 'description' },
        { text: '保留数据', align: 'center', value: 'reserved' },
        { text: '状态', align: 'center', value: 'status' },
        { text: '操作', align: 'center', value: 'actions', sortable: false },
    ];

    @Inject
    sysOrganizationService!: SysOrganizationService;

    category = '';

    @Watch('pageNumber')
    onPageNumberChanged(newValue: number): void {
        this.findItemsByPage(newValue, this.category);
    }

    @Watch('category')
    onOrganizationCategoryChanged(newValue: string): void {
        this.findItems(this.pageNumber, newValue);
    }

    findItems(pageNumber: number, category: string): void {
        if (category) {
            this.findItemsByPage(pageNumber, { category });
        } else {
            this.findItemsByPage(pageNumber);
        }
    }

    pagination(e) {
        this.pageNumber = e as number;
    }

    mounted(): void {
        super.mounted();
    }

    getBaseService(): BaseService<SysOrganization> {
        return this.sysOrganizationService;
    }

    getItemKey(): string {
        return 'organizationId';
    }

    getDomainName(): string {
        return 'SysOrganization';
    }

    creatItemWithParam() {
        let item: SysOrganization = {} as SysOrganization;
        item.category = this.category;
        super.createItem(item);
    }
}
</script>
