<template>
    <h-detail :detail-title="formTitle">
        <h-table
            v-model="pageNumber"
            :table-headers="tableHeaders"
            :table-items="tableItems"
            :page-size="pageSize"
            :total-items="totalItems"
            :total-pages="totalPages"
            :table-title="tableTitle"
            :table-loading="tableLoading"
            :skeleton-loading="skeletonLoading"
            :column-slots="columnSlots"
            :item-key="itemKey"
        >
            <template v-slot:top>
                <h-institution-select
                    v-model="institution"
                    dense
                    select-class="m-0"
                    cascade
                    horizontal
                ></h-institution-select>
                <v-btn color="primary" class="mb-2 mr-2" @click="createItem()"
                    >添加人员</v-btn
                >
            </template>
            <template v-slot:[`item.status`]="{ item }">
                <h-table-item-status :type="item.status"></h-table-item-status>
            </template>
            <template v-slot:[`item.reserved`]="{ item }">
                <h-table-item-chip :status="item.reserved"></h-table-item-chip>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <h-table-item-btn
                    color="warning"
                    icon="mdi-pencil-box-multiple"
                    icon-class="mr-2"
                    tooltip="编辑"
                    @click="editItem(item)"
                ></h-table-item-btn>
                <h-table-item-btn
                    v-if="!item.reserved"
                    color="error"
                    icon="mdi-delete-sweep"
                    tooltip="删除"
                    @click="deleteItem(item)"
                ></h-table-item-btn>
            </template>
        </h-table>
    </h-detail>
</template>

<script>
import HTable from '@/components/widgets/HTable.vue';
import HTableItemBtn from '@/components/widgets/HTableItemBtn.vue';
import HTableItemChip from '@/components/widgets/HTableItemChip.vue';
import HTableItemStatus from '@/components/business/HTableItemStatus.vue';
import HDetail from '@/components/widgets/HDetail.vue';
import HInstitutionSelect from '@/components/business/HInstitutionSelect.vue';

export default {
    components: {
        HTable,
        HTableItemBtn,
        HTableItemChip,
        HTableItemStatus,
        HDetail,
        HInstitutionSelect
    },
    data: () => ({
        // 以下为 Table相关内容
        tableTitle: '人员信息',
        tableHeaders: [
            { text: '人员姓名', align: 'center', value: 'employeeName' },
            { text: '性别', align: 'center', value: 'gender' },
            { text: '身份', align: 'center', value: 'identity' },
            { text: '备注', align: 'center', value: 'description' },
            { text: '保留数据', align: 'center', value: 'reserved' },
            { text: '状态', align: 'center', value: 'status' },
            { text: '操作', align: 'center', value: 'actions', sortable: false },
        ],
        tableItems: [],
        pageSize: 10,
        pageNumber: 1,
        totalItems: 0,
        totalPages: 0,
        tableLoading: true,
        skeletonLoading: false,
        columnSlots: ['actions', 'status', 'reserved'],
        itemKey: 'userId',
        institution: {
            organizationId: '',
            departmentId: ''
        },

        // 以下为 编辑或新增Dialog相关内容
        editedIndex: -1,
        editedItem: {},
        tableItemModel: {
            a4BizEmpId: '',
            avatar: '',
            birthday: '',
            department: {
                departmentId: ''
            },
            email: '',
            employeeId: '',
            employeeName: '',
            employeeNo: '',
            gender: '',
            identity: '',
            mobilePhoneNumber: '',
            officePhoneNumber: '',
            organization: {
                organizationId: ''
            },
            pkiEmail: '',
            positions: [],
            description: '',
            ranking: 0,
            reversion: 0,
            reserved: false,
            createTime: '',
            updateTime: '',
            status: 1,
        }
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? '添加信息' : '编辑信息';
        },
    },

    watch: {
        pageNumber: {
            handler () {
                this.findItemsByPage();
            }
        }
    },

    mounted () {
        this.skeletonLoading = true;
        this.findItemsByPage();
    },

    methods: {
        findItemsByPage () {
            this.tableLoading = true;
            this.$api.upms.sysEmployee
                .fetch({
                    pageNumber: this.pageNumber - 1,
                    pageSize: this.pageSize,
                    departmentId: this.institution.departmentId
                })
                .then((result) => {
                    this.tableLoading = false;
                    this.tableItems = result.content;
                    this.totalPages = result.totalPages;
                    this.totalItems = parseInt(result.totalElements, 0);
                    if (this.skeletonLoading) {
                        this.skeletonLoading = false;
                    }
                });
        },

        deleteItem (item) {
            this.$api.upms.sysEmployee.delete(item.employeeId).then((result) => {
                this.findItemsByPage();
            });
        },

        goToDetail (name) {
            this.$utils.navigation.goToDetail(name, this.editedItem);
        },

        editItem (item) {
            this.editedIndex = this.tableItems.indexOf(item);
            this.editedItem = item;
            this.goToDetail("SysEmployeeContent");
        },

        createItem () {
            this.editedIndex = -1;
            this.editedItem = this.tableItemModel;
            this.goToDetail("SysEmployeeContent");
        }
    },
};
</script>
