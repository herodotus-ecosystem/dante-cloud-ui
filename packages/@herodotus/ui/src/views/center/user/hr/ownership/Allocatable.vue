<template>
    <h-content-panel title="配置人员归属" :overlay="overlay">
        <h-table-item-editor
            v-model="editedItem"
            :overlay="overlay"
            clear
            @submit="allocatableDeploy()"
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
                    <template v-slot:top>
                        <v-card flat>
                            <v-row dense>
                                <v-col class="d-flex align-center" cols="2">
                                    <v-text-field
                                        v-model="condition.employeeName"
                                        label="姓名"
                                        outlined
                                        dense
                                        clearable
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col class="d-flex align-center" cols="2">
                                    <v-text-field
                                        v-model="condition.mobilePhoneNumber"
                                        label="手机号码"
                                        outlined
                                        dense
                                        clearable
                                        hide-details
                                    ></v-text-field
                                ></v-col>
                                <v-col class="d-flex align-center" cols="2">
                                    <v-text-field
                                        v-model="condition.email"
                                        label="EMAIL"
                                        outlined
                                        dense
                                        clearable
                                        hide-details
                                    ></v-text-field
                                ></v-col>
                                <v-col class="d-flex align-center" cols="2">
                                    <h-dictionary-select
                                        v-model="condition.gender"
                                        dictionary="gender"
                                        label="性别"
                                        dense
                                        hide-details
                                    ></h-dictionary-select>
                                </v-col>
                                <v-col class="d-flex align-center" cols="2">
                                    <h-dictionary-select
                                        v-model="condition.identity"
                                        dictionary="identity"
                                        label="身份"
                                        dense
                                        hide-details
                                    ></h-dictionary-select>
                                </v-col>
                                <v-col cols="2">
                                    <h-button icon icon-name="search" tooltip="模糊搜索" @click="search()"></h-button>
                                    <h-button icon icon-name="delete" tooltip="清空" @click="clear()"></h-button>
                                </v-col>
                            </v-row>
                        </v-card>
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
                </h-table>
                <v-divider class="ma-5"></v-divider>
            </template>
        </h-table-item-editor>
    </h-content-panel>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Inject } from 'typescript-ioc';
import {
    HContentPanel,
    HTableItemEditor,
    HActionButton,
    HTableItemChip,
    HTableItemStatus,
    HDictionarySelect,
} from '@/components';
import { SysEmployee, SysEmployeeService } from '@/modules';
import { ConstantDictionary, ConstantEnum } from '@/lib/declarations';

@Component({
    components: {
        HContentPanel,
        HActionButton,
        HTableItemChip,
        HTableItemStatus,
        HTableItemEditor,
        HDictionarySelect,
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

    private condition = {
        employeeName: '',
        mobilePhoneNumber: '',
        email: '',
        gender: null,
        identity: null,
    };

    protected created(): void {
        this.getConstants();
        this.skeletonLoading = true;
        this.organizationId = this.$route.params.organizationId;
        this.departmentId = this.$route.params.departmentId;
        if (this.organizationId && this.departmentId) {
            this.findAllocatableByPage(this.pageNumber);
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
        this.findAllocatableByPage(newValue, this.condition);
    }

    protected findAllocatableByPage(pageNumber: number, others = {}): void {
        this.tableLoading = true;
        this.sysEmployeeService
            .fetchAllocatableByPage(
                {
                    pageNumber: pageNumber - 1,
                    pageSize: this.pageSize,
                },
                { organizationId: this.organizationId, departmentId: this.departmentId, ...others }
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

    private allocatableDeploy() {
        if (!this.$lib.lodash.isEmpty(this.assignedItems)) {
            this.overlay = true;
            this.sysEmployeeService
                .saveAllocatable({
                    organizationId: this.organizationId,
                    departmentId: this.departmentId,
                    employees: this.assignedItems,
                })
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

    private search(): void {
        this.pageNumber = 1;
        this.findAllocatableByPage(this.pageNumber, this.condition);
    }

    private clear(): void {
        this.condition.employeeName = '';
        this.condition.mobilePhoneNumber = '';
        this.condition.email = '';
        this.condition.gender = null;
        this.condition.identity = null;
        this.findAllocatableByPage(this.pageNumber, this.condition);
    }
}
</script>
