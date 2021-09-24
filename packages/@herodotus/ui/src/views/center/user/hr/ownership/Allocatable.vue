<template>
    <h-content-panel title="配置人员归属" :overlay="overlay">
        <h-table-item-editor
            v-model="editedItem"
            :overlay="overlay"
            clear
            @submit="ownershipConfig()"
            class="pl-0 pr-0"
        >
            <template v-slot:primary>
                <h-table
                    show-select
                    external-pagination
                    v-model="assignedItems"
                    :table-headers="tableHeaders"
                    :table-items="tableItems"
                    :table-title="tableTitle"
                    :page-size="pageSize"
                    :total-items="totalItems"
                    :total-pages="totalPages"
                    :table-loading="tableLoading"
                    :skeleton-loading="skeletonLoading"
                    :column-slots="columnSlots"
                    :item-key="getCompareKey()"
                    @pagination="pagination($event)"
                >
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
                </h-table>
                <v-divider class="ma-5"></v-divider>
            </template>
        </h-table-item-editor>
    </h-content-panel>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Inject } from 'typescript-ioc';
import { HContentPanel, HTableItemEditor, HActionButton, HTableItemChip, HTableItemStatus } from '@/components';
import { SysEmployee, SysEmployeeService } from '@/modules';
import { ConstantDictionary, ConstantEnum } from '@/lib/declarations';

@Component({
    components: {
        HContentPanel,
        HActionButton,
        HTableItemChip,
        HTableItemStatus,
        HTableItemEditor,
    },
})
export default class Allocatable extends Vue {
    // @Watch注解必须依赖一个Data属性

    @Inject
    private sysEmployeeService!: SysEmployeeService;

    private pageNumber = 1;
    private tableLoading = false;
    private tableItems: SysEmployee[] = new Array<SysEmployee>();
    private assignedItems: SysEmployee[] = new Array<SysEmployee>();
    private totalItems = 0;
    private totalPages = 0;
    private tableTitle = '可配置人员信息';
    private columnSlots = ['status', 'reserved', 'gender', 'identity'];
    private tableHeaders = [
        { text: '人员姓名', align: 'center', value: 'employeeName' },
        { text: '性别', align: 'center', value: 'gender' },
        { text: '身份', align: 'center', value: 'identity' },
        { text: '备注', align: 'center', value: 'description' },
        { text: '保留数据', align: 'center', value: 'reserved' },
        { text: '状态', align: 'center', value: 'status' },
    ];
    private pageSize = 10;
    private overlay = false;
    private skeletonLoading = false;
    private organizationId = '';
    private departmentId = '';
    private editedItem = {};

    private gender: ConstantDictionary[] = new Array<ConstantDictionary>();
    private identity: ConstantDictionary[] = new Array<ConstantDictionary>();

    protected created(): void {
        this.getConstants();
        this.organizationId = this.$route.params.organizationId;
        this.departmentId = this.$route.params.departmentId;
        if (this.organizationId && this.departmentId) {
            this.findAllocatableByPage(this.pageNumber, {
                organizationId: this.organizationId,
                departmentId: this.departmentId,
            });
        }
    }

    public getCompareKey(): string {
        return 'employeeId';
    }

    private pagination(e) {
        this.pageNumber = e as number;
    }

    @Watch('pageNumber')
    protected onPageNumberChanged(newValue: number): void {
        this.findAllocatableByPage(newValue, { organizationId: this.organizationId, departmentId: this.departmentId });
    }

    protected findAllocatableByPage(pageNumber: number, others = {}): void {
        this.tableLoading = true;
        this.sysEmployeeService
            .fetchAllocatableByPage(
                {
                    pageNumber: pageNumber - 1,
                    pageSize: this.pageSize,
                },
                others
            )
            .then((result) => {
                const data = result.data;
                this.tableLoading = false;
                this.tableItems = data.content;
                this.totalPages = data.totalPages;
                this.totalItems = parseInt(data.totalElements, 0);
            })
            .catch(() => {
                this.tableLoading = false;
            });
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

    private ownershipConfig() {
        if (!this.$lib.lodash.isEmpty(this.assignedItems)) {
            let ownershipConfig = {
                organizationId: this.organizationId,
                departmentId: this.departmentId,
                employees: this.assignedItems,
            };

            this.overlay = true;
            this.sysEmployeeService
                .saveAllocatable(ownershipConfig)
                .then(() => {
                    this.overlay = false;
                    this.$navigation.goBack(this.$route);
                })
                .catch(() => {
                    this.overlay = false;
                });
        } else {
            this.$notify.warning('您还没有选择任何人员！');
        }
    }
}
</script>
