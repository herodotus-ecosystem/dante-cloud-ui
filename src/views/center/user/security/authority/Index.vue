<template>
    <h-detail :detail-title="formTitle">
        <h-table v-model="pageNumber" :table-headers="tableHeaders" :table-items="tableItems" :page-size="pageSize" :total-items="totalItems" :total-pages="totalPages" :table-title="tableTitle" :table-loading="tableLoading" :skeleton-loading="skeletonLoading" :column-slots="columnSlots" :item-key="itemKey">
            <template v-slot:top>
                <v-btn color="primary" dark class="mb-2 mr-2" @click="createItem()">添加权限</v-btn>
            </template>
            <template v-slot:item.status="{ item }">
                <h-table-item-status :type="item.status"></h-table-item-status>
            </template>
            <template v-slot:item.reserved="{ item }">
                <h-table-item-chip :status="item.reserved"></h-table-item-chip>
            </template>
            <template v-slot:item.actions="{ item }">
                <h-table-item-btn color="warning" icon="mdi-pencil-box-multiple" icon-class="mr-2" tooltip="编辑" @click="editItem(item)"></h-table-item-btn>
                <h-table-item-btn v-if="!item.reserved" color="error" icon="mdi-delete-sweep" tooltip="删除" @click="deleteItem(item)"></h-table-item-btn>
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

const itemModel = {
    authorityId: '',
    authorityCode: '',
    authorityName: '',
    authorityType: '',
    parentId: '',
    requestMethod: '',
    serviceId: '',
    url: '',
    description: '',
    ranking: 0,
    reversion: 0,
    reserved: false,
    createTime: '',
    updateTime: '',
    status: 1
};

export default {
    components: {
        HTable,
        HTableItemBtn,
        HTableItemChip,
        HTableItemStatus,
        HDetail
    },
    data: () => ({
        // 以下为 Table相关内容
        tableTitle: '权限平台信息',
        tableHeaders: [
            { text: '权限名称', align: 'center', value: 'authorityName' },
            { text: '权限代码', align: 'center', value: 'authorityCode' },
            { text: '权限类型', align: 'center', value: 'authorityType' },
            { text: 'Request Method', align: 'center', value: 'requestMethod' },
            { text: '服务ID', align: 'center', value: 'serviceId' },
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
        itemKey: 'authorityId',

        // 以下为 编辑或新增Dialog相关内容
        editedIndex: -1,
        editedItem: itemModel
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? '添加信息' : '编辑信息';
        }
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
            this.$api.upms.sysAuthority
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
                });
        },

        deleteItem (item) {
            this.$api.upms.sysAuthority.delete(item.authorityId).then(result => {
                this.findItemsByPage();
            });
        },

        goToDetail (name) {
            this.$utils.navigation.goToDetail(name, this.editedItem);
        },

        editItem (item) {
            this.editedIndex = this.tableItems.indexOf(item);
            this.editedItem = item;
            this.goToDetail("SysAuthorityContent");
        },

        createItem () {
            this.editedIndex = -1;
            this.editedItem = itemModel;
            this.goToDetail("SysAuthorityContent");
        },

        save () {
            this.$refs.observer.validate().then(validateResulte => {
                if (validateResulte) {

                    this.$api.upms.sysAuthority.saveOrUpdate(this.editedItem).then(result => {
                        this.findItemsByPage();
                        this.close();
                    });
                }
            });
        }
    }
};
</script>
