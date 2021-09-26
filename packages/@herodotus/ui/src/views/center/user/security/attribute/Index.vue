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
                <v-btn color="primary" dark class="mb-2 mr-2" @click="createItem()">添加元数据</v-btn>
            </template>
            <template v-slot:[`item.requestMethod`]="{ item }">
                <h-swagger-item
                    :method="item.requestMethod"
                    :url="item.url"
                    :description="item.description"
                ></h-swagger-item>
            </template>
            <template v-slot:[`item.expression`]="{ item }">{{ getText(item.expression) }} </template>
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
                    content="角色"
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
import { HContainer, HActionButton, HTableItemChip, HTableItemStatus, HSwaggerItem } from '@/components';
import { SysSecurityAttribute, SysSecurityAttributeService } from '@/modules';
import { BaseIndex, BaseService } from '@/lib/declarations';

@Component({
    components: {
        HContainer,
        HActionButton,
        HTableItemChip,
        HTableItemStatus,
        HSwaggerItem,
    },
})
export default class Index extends BaseIndex<SysSecurityAttribute> {
    private pageNumber = 1;
    // 以下为 Table相关内容
    private tableTitle = '安全信息列表';
    private columnSlots = ['expression', 'requestMethod', 'actions', 'status', 'reserved'];
    private tableHeaders = [
        { text: '接口', align: 'center', value: 'requestMethod' },
        { text: '默认权限代码', align: 'center', value: 'attributeCode' },
        { text: '特定表达式', align: 'center', value: 'expression' },
        { text: '保留数据', align: 'center', value: 'reserved' },
        { text: '状态', align: 'center', value: 'status' },
        { text: '操作', align: 'center', value: 'actions', sortable: false },
    ];

    @Inject
    private sysSecurityAttributeService!: SysSecurityAttributeService;

    private index = {};

    @Watch('pageNumber')
    protected onPageNumberChanged(newValue: number): void {
        this.findItemsByPage(newValue);
    }

    private pagination(e) {
        this.pageNumber = e as number;
    }

    protected mounted(): void {
        super.mounted();
        this.$enums.getItem('expression').then((result) => {
            let dictionary = result;
            dictionary.forEach((element) => {
                this.index[element.key] = element;
            });
        });
    }

    public getBaseService(): BaseService<SysSecurityAttribute> {
        return this.sysSecurityAttributeService;
    }

    public getItemKey(): string {
        return 'attributeId';
    }

    public getDomainName(): string {
        return 'SysSecurityAttribute';
    }

    public getText(key: string): string {
        let object = this.index[key];
        return this.$lib.lodash.get(object, 'text');
    }
}
</script>
