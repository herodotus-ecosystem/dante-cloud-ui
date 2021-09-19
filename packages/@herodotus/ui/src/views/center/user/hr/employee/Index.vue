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
                <h-institution-select
                    v-model="institution"
                    dense
                    select-class="m-0"
                    cascade
                    horizontal
                ></h-institution-select>
                <v-btn color="primary" class="mb-2 mr-2" @click="createItem()">添加人员</v-btn>
            </template>
            <template v-slot:[`item.gender`]="{ item }">
                {{ parseGender(item) }}
            </template>
            <template v-slot:[`item.identity`]="{ item }">
                {{ parseIdentity(item) }}
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
import { HContainer, HActionButton, HTableItemChip, HTableItemStatus, HInstitutionSelect } from '@/components';
import { SysEmployee, SysEmployeeService } from '@/modules';
import { BaseIndex, BaseService, ConstantDictionary, ConstantEnum } from '@/lib/declarations';

@Component({
    components: {
        HContainer,
        HActionButton,
        HTableItemChip,
        HTableItemStatus,
        HInstitutionSelect,
    },
})
export default class Index extends BaseIndex<SysEmployee> {
    // @Watch注解必须依赖一个Data属性
    private pageNumber = 1;
    private tableTitle = '人员信息';
    private columnSlots = ['actions', 'status', 'reserved', 'gender', 'identity'];
    private tableHeaders = [
        { text: '人员姓名', align: 'center', value: 'employeeName' },
        { text: '性别', align: 'center', value: 'gender' },
        { text: '身份', align: 'center', value: 'identity' },
        { text: '备注', align: 'center', value: 'description' },
        { text: '保留数据', align: 'center', value: 'reserved' },
        { text: '状态', align: 'center', value: 'status' },
        { text: '操作', align: 'center', value: 'actions', sortable: false },
    ];

    private institution = {
        organizationId: '',
        departmentId: '',
    };

    private gender: ConstantDictionary[] = new Array<ConstantDictionary>();
    private identity: ConstantDictionary[] = new Array<ConstantDictionary>();

    @Inject
    private sysEmployeeService!: SysEmployeeService;

    @Watch('pageNumber')
    protected onPageNumberChanged(newValue: number): void {
        this.findItems(newValue, this.institution.departmentId);
    }

    @Watch('institution.departmentId')
    protected onDepartmentIdChanged(newValue: string): void {
        this.findItems(this.pageNumber, newValue);
    }

    private pagination(e) {
        this.pageNumber = e as number;
    }

    private findItems(pageNumber: number, departmentId = ''): void {
        if (departmentId) {
            this.findItemsByPage(pageNumber, { departmentId });
        } else {
            this.findItemsByPage(pageNumber);
        }
    }

    protected mounted(): void {
        this.getConstants();
        super.mounted();
    }

    public getBaseService(): BaseService<SysEmployee> {
        return this.sysEmployeeService;
    }

    public getItemKey(): string {
        return 'userId';
    }

    public getDomainName(): string {
        return 'SysEmployee';
    }

    private getConstants(): void {
        this.$enums.getItem(ConstantEnum.GENDER).then((result) => {
            this.gender = result;
        });
        this.$enums.getItem(ConstantEnum.IDENTITY).then((result) => {
            this.identity = result;
        });
    }

    private parseGender(item: SysEmployee): string {
        if (typeof item.gender == 'number') {
            return this.gender[item.gender].text;
        } else {
            return '';
        }
    }

    private parseIdentity(item: SysEmployee): string {
        if (typeof item.identity == 'number') {
            return this.identity[item.identity].text;
        } else {
            return '';
        }
    }
}
</script>
