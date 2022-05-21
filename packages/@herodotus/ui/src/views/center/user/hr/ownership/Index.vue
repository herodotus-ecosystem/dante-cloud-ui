<template>
    <h-container>
        <v-card class="pl-5 pr-5">
            <v-row>
                <v-col cols="3">
                    <h-organization-tree v-model="organizationId"></h-organization-tree>
                </v-col>
                <v-col cols="3">
                    <h-department-tree v-model="departmentId" :organization-id="organizationId"></h-department-tree>
                </v-col>
                <v-col cols="6">
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
                            <v-btn color="primary" dark class="mr-2" :disabled="isDisabled" @click="assign()"
                                >配置人员</v-btn
                            >
                        </template>
                        <template v-slot:[`item.identity`]="{ item }">
                            {{ parseIdentity(item) }}
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <h-action-button remove @remove="deleteAllocatable(item)"></h-action-button>
                        </template>
                    </h-table>
                </v-col>
            </v-row>
        </v-card>
    </h-container>
</template>

<script lang="ts">
import { DataTableHeader } from 'vuetify';
import { Component, Watch } from 'vue-property-decorator';
import { Inject } from 'typescript-ioc';
import { HContainer, HOrganizationTree, HDepartmentTree, HActionButton } from '@/components';
import { SysEmployee, SysEmployeeService } from '@/modules';
import { BaseIndex, BaseService, ConstantEnum, ConstantDictionary } from '@/lib/declarations';

@Component({
    components: {
        HContainer,
        HActionButton,
        HOrganizationTree,
        HDepartmentTree,
    },
})
export default class Index extends BaseIndex<SysEmployee> {
    // @Watch注解必须依赖一个Data属性
    pageNumber = 1;
    tableTitle = '已配置人员';
    columnSlots = ['actions', 'identity'];
    tableHeaders: DataTableHeader[] = [
        { text: '姓名', align: 'center', value: 'employeeName' },
        { text: '身份', align: 'center', value: 'identity' },
        { text: '操作', align: 'center', value: 'actions', sortable: false },
    ];

    identity: ConstantDictionary[] = new Array<ConstantDictionary>();

    organizationId = '';
    departmentId = '';

    @Inject
    sysEmployeeService!: SysEmployeeService;

    @Watch('pageNumber')
    onPageNumberChanged(newValue: number): void {
        this.fetchAssignedByPage(newValue, this.departmentId);
    }

    @Watch('departmentId')
    onDepartmentIdChanged(newValue: string): void {
        this.pageNumber = 1;
        this.fetchAssignedByPage(this.pageNumber, newValue);
    }

    pagination(e) {
        this.pageNumber = e as number;
    }

    mounted(): void {
        this.skeletonLoading = true;
        this.getConstants();
    }

    getBaseService(): BaseService<SysEmployee> {
        return this.sysEmployeeService;
    }

    getItemKey(): string {
        return 'userId';
    }

    getDomainName(): string {
        return 'SysOwnershipView';
    }

    getConstants(): void {
        this.$enums.getItem(ConstantEnum.IDENTITY).then((result) => {
            this.identity = result;
        });
    }

    parseIdentity(item: SysEmployee): string {
        if (typeof item.identity == 'number') {
            return this.identity[item.identity].text;
        } else {
            return '';
        }
    }

    assign(): void {
        this.$navigation.goToDetail('SysOwnershipAllocatable', {
            organizationId: this.organizationId,
            departmentId: this.departmentId,
        });
    }

    fetchAssignedByPage(pageNumber: number, departmentId: string): void {
        this.tableLoading = true;
        this.sysEmployeeService
            .fetchAssignedByPage(
                {
                    pageNumber: pageNumber - 1,
                    pageSize: this.pageSize,
                },
                { departmentId }
            )
            .then((result) => {
                const data = result.data;
                this.tableLoading = false;
                this.tableItems = data.content;
                this.totalPages = data.totalPages;
                this.totalItems = parseInt(data.totalElements, 0);
                if (this.skeletonLoading) {
                    this.skeletonLoading = false;
                }
            })
            .catch(() => {
                this.tableLoading = false;
            });
    }

    get isDisabled(): boolean {
        if (this.organizationId && this.departmentId) {
            return false;
        } else {
            return true;
        }
    }

    deleteAllocatable(item) {
        this.sysEmployeeService
            .deleteAllocatable({
                organizationId: this.organizationId,
                departmentId: this.departmentId,
                employeeId: item.employeeId,
            })
            .then(() => {
                this.fetchAssignedByPage(this.pageNumber, this.departmentId);
            });
    }
}
</script>
