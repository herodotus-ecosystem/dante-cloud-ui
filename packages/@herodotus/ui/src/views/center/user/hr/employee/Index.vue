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
                <v-btn color="primary" class="mr-2" @click="createItem()">添加人员</v-btn>
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
                    :authorize="checkAuthorize(item)"
                    content="默认用户"
                    @authorize="authorize(item)"
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
import { HContainer, HActionButton, HTableItemChip, HTableItemStatus, HDictionarySelect } from '@/components';
import { SysEmployee, SysEmployeeService } from '@/modules';
import { BaseIndex, BaseService, ConstantDictionary, ConstantEnum } from '@/lib/declarations';

@Component({
    components: {
        HContainer,
        HActionButton,
        HTableItemChip,
        HTableItemStatus,
        HDictionarySelect,
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

    private condition = {
        employeeName: '',
        mobilePhoneNumber: '',
        email: '',
        gender: null,
        identity: null,
    };

    private gender: ConstantDictionary[] = new Array<ConstantDictionary>();
    private identity: ConstantDictionary[] = new Array<ConstantDictionary>();

    @Inject
    private sysEmployeeService!: SysEmployeeService;

    @Watch('pageNumber')
    protected onPageNumberChanged(newValue: number): void {
        this.findItemsByPage(newValue, this.condition);
    }

    private pagination(e) {
        this.pageNumber = e as number;
    }

    protected mounted(): void {
        this.getConstants();
        super.mounted();
    }

    public getBaseService(): BaseService<SysEmployee> {
        return this.sysEmployeeService;
    }

    public getItemKey(): string {
        return 'employeeId';
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

    private search(): void {
        this.pageNumber = 1;
        this.findItemsByPage(this.pageNumber, this.condition);
    }

    private clear(): void {
        this.condition.employeeName = '';
        this.condition.mobilePhoneNumber = '';
        this.condition.email = '';
        this.condition.gender = null;
        this.condition.identity = null;
        this.findItemsByPage(this.pageNumber, this.condition);
    }

    private authorize(item): void {
        this.sysEmployeeService
            .authorizeUser({ employeeId: item.employeeId })
            .then(() => {
                this.$notify.success('配置成功！');
            })
            .catch(() => {
                this.$notify.error('配置失败！');
            });
    }

    private checkAuthorize(item): boolean {
        if (!this.$lib.lodash.isEmpty(item.user)) {
            return false;
        } else {
            return true;
        }
    }
}
</script>
