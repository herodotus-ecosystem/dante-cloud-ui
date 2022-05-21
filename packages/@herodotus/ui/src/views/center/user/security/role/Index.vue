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
                <v-btn color="primary" dark class="mb-2 mr-2" @click="createItem()">添加角色</v-btn>
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
                    content="权限"
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
import { SysRole, SysRoleService } from '@/modules';
import { BaseIndex, BaseService } from '@/lib/declarations';

@Component({
    components: {
        HContainer,
        HActionButton,
        HTableItemChip,
        HTableItemStatus,
    },
})
export default class Index extends BaseIndex<SysRole> {
    pageNumber = 1;
    // 以下为 Table相关内容
    tableTitle = '平台角色信息';
    columnSlots = ['actions', 'status', 'reserved'];
    tableHeaders = [
        { text: '角色名称', align: 'center', value: 'roleName' },
        { text: '角色代码', align: 'center', value: 'roleCode' },
        { text: '备注', align: 'center', value: 'description' },
        { text: '保留数据', align: 'center', value: 'reserved' },
        { text: '状态', align: 'center', value: 'status' },
        { text: '操作', align: 'center', value: 'actions', sortable: false },
    ];

    @Inject
    sysRoleService!: SysRoleService;

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

    getBaseService(): BaseService<SysRole> {
        return this.sysRoleService;
    }

    getItemKey(): string {
        return 'roleId';
    }

    getDomainName(): string {
        return 'SysRole';
    }
}
</script>
