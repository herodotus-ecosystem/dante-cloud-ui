<template>
    <h-detail :detail-title="formTitle">
        <h-table :table-headers="tableHeaders" :table-items="tableItems" :page-number="pageNumber" :page-size="pageSize" :total-items="totalItems" :total-pages="totalPages" :table-title="tableTitle" :table-loading="tableLoading" :skeleton-loading="skeletonLoading" :column-slots="columnSlots" :item-key="itemKey" @pagination="pagination">
            <template v-slot:top>
                <v-btn color="primary" dark class="mb-2 mr-2" @click="createItem()">添加用户</v-btn>
            </template>
            <template v-slot:item.status="{ item }">
                <h-table-item-status :type="item.status"></h-table-item-status>
            </template>
            <template v-slot:item.reserved="{ item }">
                <h-table-item-chip :status="item.reserved"></h-table-item-chip>
            </template>
            <template v-slot:item.actions="{ item }">
                <h-table-item-button color="teal" icon="mdi-account-box-multiple" icon-class="mr-2" tooltip="分配角色"></h-table-item-button>
                <h-table-item-button color="warning" icon="mdi-pencil-box-multiple" icon-class="mr-2" tooltip="编辑" @click="editItem(item)"></h-table-item-button>
                <h-table-item-button color="error" icon="mdi-delete-sweep" tooltip="删除" @click="deleteItem(item)"></h-table-item-button>
            </template>
        </h-table>
    </h-detail>
</template>

<script>
import HTable from '@/components/widgets/HTable.vue';
import HTableItemButton from '@/components/widgets/HTableItemButton.vue';
import HTableItemChip from '@/components/widgets/HTableItemChip.vue';
import HTableItemStatus from '@/components/widgets/HTableItemStatus.vue';
import HDetail from '@/components/widgets/HDetail.vue';

const itemModel = {
    userId: '',
    employeeId: '',
    userName: '',
    nickName: '',
    password: '',
    description: '',
    ranking: 0,
    reserved: false,
    createTime: '',
    updateTime: '',
    status: 1,
};

export default {
    components: {
        HTable,
        HTableItemButton,
        HTableItemChip,
        HTableItemStatus,
        HDetail
    },
    data: () => ({
        // 以下为 Table相关内容
        tableTitle: '平台用户信息',
        tableHeaders: [
            { text: '用户名', align: 'center', value: 'userName' },
            { text: '昵称', align: 'center', value: 'nickName' },
            { text: '说明', align: 'center', value: 'description' },
            { text: '保留数据', align: 'center', value: 'reserved' },
            { text: '状态', align: 'center', value: 'status' },
            { text: '操作', align: 'left', value: 'actions', sortable: false },
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

        // 以下为 编辑或新增Dialog相关内容
        editedIndex: -1,
        editedItem: itemModel,
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? '添加信息' : '编辑信息';
        },
    },

    mounted () {
        this.skeletonLoading = true;
        this.findItemsByPage();
    },

    methods: {
        pagination (pageNumber) {
            this.pageNumber = pageNumber;
            this.findItemsByPage();
        },

        findItemsByPage () {
            this.tableLoading = true;
            this.$api.upms.sysUser
                .fetch({
                    pageNumber: this.pageNumber - 1,
                    pageSize: this.pageSize,
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
            this.$api.upms.sysUser.delete(item.userId).then((result) => {
                this.findItemsByPage();
            });
        },

        goToDetail (name) {
            this.$utils.navigation.goToDetail(name, this.editedItem);
        },

        editItem (item) {
            this.editedIndex = this.tableItems.indexOf(item);
            this.editedItem = item;
            this.goToDetail("SysUserContent");
        },

        createItem () {
            this.editedIndex = -1;
            this.editedItem = itemModel;
            this.goToDetail("SysUserContent");
        },

        authorizeItem (item) {
            this.editedItem = item;
            this.goToDetail("SysUserAuthorize");
        }
    },
};
</script>
