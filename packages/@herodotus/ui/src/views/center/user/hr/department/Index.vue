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
                <v-card max-width="500" flat>
                    <v-container class="m-0">
                        <v-row>
                            <v-col cols="6">
                                <h-dictionary-select
                                    v-model="category"
                                    dictionary="organizationCategory"
                                    label="组织类别"
                                    dense
                                    hide-details
                                ></h-dictionary-select>
                            </v-col>
                            <v-col cols="6">
                                <h-organization-select
                                    v-model="organizationId"
                                    :category="category"
                                    dense
                                    select-class="mr-2"
                                    cascade
                                    horizontal
                                    hide-details
                                ></h-organization-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>

                <v-btn color="primary" dark class="mr-2" @click="creatItemWithParam()">添加部门</v-btn>
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
import {
    HContainer,
    HActionButton,
    HTableItemChip,
    HTableItemStatus,
    HOrganizationSelect,
    HDictionarySelect,
} from '@/components';
import { SysDepartmentService, SysDepartment } from '@/modules';
import { BaseService, BaseIndex } from '@/lib/declarations';

@Component({
    components: {
        HContainer,
        HActionButton,
        HTableItemChip,
        HTableItemStatus,
        HOrganizationSelect,
        HDictionarySelect,
    },
})
export default class Index extends BaseIndex<SysDepartment> {
    // @Watch注解必须依赖一个Data属性
    private pageNumber = 1;
    private tableTitle = '部门信息';
    private columnSlots: string[] = ['actions', 'status', 'reserved'];
    private tableHeaders: DataTableHeader[] = [
        { text: '部门名称', align: 'center', value: 'departmentName' },
        { text: '部门简称', align: 'center', value: 'shortName' },
        { text: '分区代码', align: 'center', value: 'partitionCode' },
        { text: '备注', align: 'center', value: 'description' },
        { text: '保留数据', align: 'center', value: 'reserved' },
        { text: '状态', align: 'center', value: 'status' },
        { text: '操作', align: 'center', value: 'actions', sortable: false },
    ];

    @Inject
    private sysDepartmentService!: SysDepartmentService;

    private organizationId = '';
    private category = '';

    protected mounted(): void {
        super.mounted();
    }

    public getBaseService(): BaseService<SysDepartment> {
        return this.sysDepartmentService;
    }

    public getItemKey(): string {
        return 'departmentId';
    }

    public getDomainName(): string {
        return 'SysDepartment';
    }

    private pagination(e) {
        this.pageNumber = e as number;
    }

    @Watch('pageNumber')
    protected onPageNumberChanged(newValue: number): void {
        this.findItems(newValue, this.organizationId);
    }

    @Watch('organizationId')
    protected onDepartmentIdChanged(newValue: string): void {
        this.findItems(this.pageNumber, newValue);
    }

    private findItems(pageNumber: number, organizationId = ''): void {
        if (organizationId) {
            this.findItemsByPage(pageNumber, { organizationId });
        } else {
            this.findItemsByPage(pageNumber);
        }
    }

    private creatItemWithParam() {
        if (this.organizationId) {
            let item: SysDepartment = {} as SysDepartment;
            item.organizationId = this.organizationId;
            super.createItem(item);
        } else {
            super.createItem();
        }
    }
}
</script>
