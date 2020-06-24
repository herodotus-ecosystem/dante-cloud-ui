<template>
    <h-detail :detail-title="formTitle">
        <h-table v-model="pageNumber" :table-headers="tableHeaders" :table-items="tableItems" :page-size="pageSize" :total-items="totalItems" :total-pages="totalPages" :table-title="tableTitle" :table-loading="tableLoading" :skeleton-loading="skeletonLoading" :column-slots="columnSlots" :item-key="itemKey">
            <template v-slot:top>
                <v-btn color="primary" class="mb-2 mr-2" @click="createItem()">创建流程</v-btn>
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
        tableTitle: '流程定义信息',
        tableHeaders: [
            { text: '定义Key', align: 'center', value: 'key' },
            { text: '名称', align: 'center', value: 'name' },
            { text: '版本', align: 'center', value: 'version' },
            { text: '版本标签', align: 'center', value: 'versionTag' },
            { text: '资源名称', align: 'center', value: 'resource' },
            { text: '是否挂起', align: 'center', value: 'suspended' },
            { text: '是否可启动', align: 'center', value: 'startableInTasklist' },
            { text: '操作', align: 'center', value: 'actions', sortable: false },
        ],
        tableItems: [],
        pageSize: 10,
        pageNumber: 1,
        totalItems: 0,
        totalPages: 0,
        tableLoading: true,
        skeletonLoading: false,
        columnSlots: ['actions'],
        itemKey: 'id',
        // 以下为 编辑或新增Dialog相关内容
        editedIndex: -1,
        editedItem: {},
        tableItemModel: {
            id: '',
            key: '',
            category: '',
            description: '',
            name: '',
            version: '',
            resource: '',
            deploymentId: '',
            diagram: '',
            suspended: false,
            tenantId: '',
            versionTag: '',
            historyTimeToLive: '',
            startableInTasklist: true
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
            this.$api.bpmn.processDefinition
                .fetchCount()
                .then((value) => {
                    this.$api.bpmn.processDefinition
                        .fetch({
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
            this.goToDetail("ProcessDefinitionDesigner");
        }
    },
};
</script>
