<template>
    <h-container>
        <v-card class="pl-5 pr-5">
            <v-row>
                <v-col cols="3" class="pl-0">
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
                                >添加单位</v-btn
                            >
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <h-action-button edit @remove="deleteItem(item)"></h-action-button>
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
import { SysOwnershipView, SysOwnershipViewService } from '@/modules';
import { BaseIndex, BaseService } from '@/lib/declarations';

@Component({
    components: {
        HContainer,
        HActionButton,
        HOrganizationTree,
        HDepartmentTree,
    },
})
export default class Index extends BaseIndex<SysOwnershipView> {
    // @Watch注解必须依赖一个Data属性
    private pageNumber = 1;
    private tableTitle = '人员归属信息';
    private columnSlots = ['actions'];
    private tableHeaders: DataTableHeader[] = [
        { text: '姓名', align: 'center', value: 'employeeName' },
        { text: '电子邮件', align: 'center', value: 'email' },
        { text: '操作', align: 'center', value: 'actions', sortable: false },
    ];

    private organizationId = '';
    private departmentId = '';

    @Inject
    private sysOwnershipViewService!: SysOwnershipViewService;

    @Watch('pageNumber')
    protected onPageNumberChanged(newValue: number): void {
        this.findItems(newValue, this.organizationId, this.departmentId);
    }

    @Watch('departmentId')
    protected onDepartmentIdChanged(newValue: string): void {
        this.pageNumber = 1;
        this.findItems(this.pageNumber, this.organizationId, newValue);
    }

    private pagination(e) {
        this.pageNumber = e as number;
    }

    protected mounted(): void {
        this.tableLoading = false;
    }

    public getBaseService(): BaseService<SysOwnershipView> {
        return this.sysOwnershipViewService;
    }

    public getItemKey(): string {
        return 'ownershipId';
    }

    public getDomainName(): string {
        return 'SysOwnershipView';
    }

    public assign(): void {
        this.$navigation.goToDetail('SysOwnershipAllocatable', {
            organizationId: this.organizationId,
            departmentId: this.departmentId,
        });
    }

    private findItems(pageNumber: number, organizationId: string, departmentId: string): void {
        if (departmentId) {
            this.findItemsByPage(pageNumber, { organizationId, departmentId });
        }
    }

    get isDisabled(): boolean {
        if (this.organizationId && this.departmentId) {
            return false;
        } else {
            return true;
        }
    }
}
</script>
