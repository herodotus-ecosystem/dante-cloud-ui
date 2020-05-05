<template>
    <h-detail :detail-title="formTitle">
        <h-table :table-headers="tableHeaders" :table-items="tableItems" :page-number="pageNumber" :page-size="pageSize" :total-items="totalItems" :total-pages="totalPages" :table-title="tableTitle" :table-loading="tableLoading" :skeleton-loading="skeletonLoading" :column-slots="columnSlots" :item-key="itemKey" @pagination="pagination">
            <template v-slot:top>
                <v-btn color="primary" dark class="mb-2 mr-2" @click="createItem()">创建微服务</v-btn>
            </template>
            <template v-slot:item.status="{ item }">
                <h-table-item-status :type="item.status"></h-table-item-status>
            </template>
            <template v-slot:item.reserved="{ item }">
                <h-table-item-chip :status="item.reserved"></h-table-item-chip>
            </template>
            <template v-slot:item.actions="{ item }">
                <h-table-item-button color="warning" icon="mdi-pencil-box-multiple" icon-class="mr-2" tooltip="编辑" @click="editItem(item)"></h-table-item-button>
                <h-table-item-button v-if="!item.reserved" color="error" icon="mdi-delete-sweep" tooltip="删除" @click="deleteItem(item)"></h-table-item-button>
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
    serviceId: '',
    appSecret: '',
    appName: '',
    appCode: '',
    applicationType: 0,
    supplier: {
        supplierId: ''
    },
    description: '',
    ranking: 0,
    reserved: false,
    createTime: '',
    updateTime: '',
    status: 1
}

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
        tableTitle: '平台微服务信息',
        tableHeaders: [
            { text: '服务名称', align: 'center', value: 'appName' },
            { text: '服务代码', align: 'center', value: 'appCode' },
            { text: '团队/厂商', align: 'center', value: 'supplier.supplierName' },
            { text: '说明', align: 'center', value: 'description' },
            { text: '保留数据', align: 'center', value: 'reserved' },
            { text: '状态', align: 'center', value: 'status' },
            { text: '操作', align: 'center', value: 'actions', sortable: false }
        ],
        tableItems: [],
        pageSize: 10,
        pageNumber: 1,
        totalItems: 0,
        totalPages: 0,
        tableLoading: true,
        skeletonLoading: false,
        columnSlots: ['actions', 'status', 'reserved'],
        itemKey: 'serviceId',

        // 以下为 编辑或新增Dialog相关内容
        editedIndex: -1,
        editedItem: itemModel,
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? '添加团队' : '编辑团队';
        }
    },

    created () { },

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
            this.$api.upms.oauthMicroservices
                .fetch({
                    pageNumber: this.pageNumber - 1,
                    pageSize: this.pageSize
                })
                .then(result => {
                    this.tableLoading = false;
                    this.tableItems = result.content;
                    this.totalPages = result.totalPages;
                    this.totalItems = parseInt(result.totalElements, 0);
                    if (this.skeletonLoading) {
                        this.skeletonLoading = false;
                    }
                }).catch(() => {
                    this.skeletonLoading = false;
                });
        },

        deleteItem (item) {
            this.$api.upms.oauthMicroservices.delete(item.serviceId).then(result => {
                this.findItemsByPage();
            });
        },

        goToDetail (name) {
            this.$utils.navigation.goToDetail(name, this.editedItem);
        },

        editItem (item) {
            this.editedIndex = this.tableItems.indexOf(item);
            this.editedItem = item;
            this.goToDetail("OauthMicroservicesContent");
        },

        createItem () {
            this.editedIndex = -1;
            this.editedItem = itemModel;
            this.goToDetail("OauthMicroservicesContent");
        }
    }
};
</script>
