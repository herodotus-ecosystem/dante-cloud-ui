<template>
    <h-detail :detail-title="formTitle">
        <h-table v-model="pageNumber" :table-headers="tableHeaders" :table-items="tableItems" :page-size="pageSize" :total-items="totalItems" :total-pages="totalPages" :table-title="tableTitle" :table-loading="tableLoading" :skeleton-loading="skeletonLoading" :column-slots="columnSlots" :item-key="itemKey">
            <template v-slot:top>
                <v-btn color="primary" class="mb-2 mr-2" @click="createItem()">创建流程</v-btn>
            </template>
            <template v-slot:item.deploymentTime="{ item }">
                {{formatTime(item.deploymentTime)}}
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
import HDetail from '@/components/widgets/HDetail.vue';

export default {
    components: {
        HTable,
        HTableItemBtn,
        HDetail
    },
    data: () => ({
        // 以下为 Table相关内容
        tableTitle: '部署信息',
        tableHeaders: [
            { text: '名称', align: 'center', value: 'name' },
            { text: '部署渠道', align: 'center', value: 'source' },
            { text: '部署时间', align: 'center', value: 'deploymentTime' },
            { text: '租户ID', align: 'center', value: 'tenantId' },
            { text: '操作', align: 'center', value: 'actions', sortable: false },
        ],
        tableItems: [],
        pageSize: 10,
        pageNumber: 1,
        totalItems: 0,
        totalPages: 0,
        tableLoading: true,
        skeletonLoading: false,
        columnSlots: ['actions', 'deploymentTime'],
        itemKey: 'id',
        // 以下为 编辑或新增Dialog相关内容
        editedIndex: -1,
        editedItem: {},
        tableItemModel: {
            id: '',
            name: '',
            source: '',
            deploymentTime: '',
            tenantId: '',
            links: []
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
            this.$api.bpmn.deployment
                .fetchCount()
                .then((value) => {
                    this.$api.bpmn.deployment
                        .fetchList({
                            sortBy: "deploymentTime",
                            sortOrder: "desc",
                            firstResult: this.$utils.bpmnPage.getFirstResult(this.pageNumber, this.pageSize),
                            maxResults: this.$utils.bpmnPage.getMaxResults(this.pageSize)
                        })
                        .then((result) => {
                            this.tableLoading = false;
                            this.tableItems = result;
                            this.totalPages = this.$utils.bpmnPage.getTotalPages(value.count, this.pageSize);
                            this.totalItems = this.$utils.bpmnPage.getTotalItems(value.count);
                            if (this.skeletonLoading) {
                                this.skeletonLoading = false;
                            }
                        });
                });
        },

        deleteItem (item) {
            this.$api.bpmn.deployment.delete(item.id).then((result) => {
                console.log('----------operation delete then');
                console.log(result);
                this.findItemsByPage();
            }).catch((error) => {
                console.log('----------operation delete catch');
                console.log(error);
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
            this.goToDetail("ProcessDeploymentDesigner");
        },

        formatTime (time) {
            return this.$moment(time).format('YYYY-MM-DD HH:mm:ss');
        }
    },
};
</script>
