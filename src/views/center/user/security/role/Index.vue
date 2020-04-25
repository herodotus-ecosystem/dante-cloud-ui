<template>
    <h-detail :detail-title="formTitle">
        <h-data-table :table-headers="tableHeaders" :table-items="tableItems" :page-number="pageNumber" :page-size="pageSize" :total-items="totalItems" :total-pages="totalPages" :table-title="title" :table-loading="tableLoading" :skeleton-loading="skeletonLoading" :column-slots="columnSlots" :item-key="itemKey" @pagination="pagination" @initialize="initialize">
            <template v-slot:top>
                <v-btn color="primary" dark class="mb-2 mr-2" @click="createItem()">添加角色</v-btn>
            </template>
            <template v-slot:item.status="{ item }">
                <template>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-icon :color="statusDisplay[item.status].color" v-on="on">{{statusDisplay[item.status].icon}}</v-icon>
                        </template>
                        <span>{{upmsConstants.status[item.status].text}}</span>
                    </v-tooltip>
                </template>
            </template>
            <template v-slot:item.reserved="{ item }">
                <template v-if="item.reserved">
                    <v-chip color="red" dark small>保留数据</v-chip>
                </template>
                <template v-else>
                    <v-chip color="green" dark small>非保留数据</v-chip>
                </template>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn class="mr-2" fab dark x-small color="purple" v-on="on" @click.stop="showAssignAuthority(item)">
                            <v-icon>assignment_turned_in</v-icon>
                        </v-btn>
                    </template>
                    <span>分配权限</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn class="mr-2" fab dark x-small color="warning" v-on="on" @click="editItem(item)">
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </template>
                    <span>编辑</span>
                </v-tooltip>
                <v-tooltip v-if="!item.reserved" bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn fab dark x-small color="error" v-on="on" @click="deleteItem(item)">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </template>
                    <span>删除</span>
                </v-tooltip>
            </template>
        </h-data-table>
    </h-detail>
</template>

<script>
import HDataTable from '@/components/widgets/HDataTable.vue';
import HDetail from '@/components/widgets/HDetail.vue';

const itemModel = {
    roleId: '',
    roleCode: '',
    roleName: '',
    description: '',
    ranking: 0,
    reserved: false,
    createTime: '',
    updateTime: '',
    status: 1
};

export default {
    components: {
        HDataTable,
        HDetail
    },
    data: () => ({
        title: '平台角色信息',
        upmsConstants: {},
        statusDisplay: [],

        // 以下为 Table相关内容
        tableHeaders: [
            { text: '角色名称', align: 'center', value: 'roleName' },
            { text: '角色代码', align: 'center', value: 'roleCode' },
            { text: '说明', align: 'center', value: 'description' },
            { text: '保留数据', align: 'center', value: 'reserved' },
            { text: '状态', align: 'center', value: 'status' },
            { text: '操作', align: 'left', value: 'actions', sortable: false }
        ],
        tableItems: [],
        pageSize: 10,
        pageNumber: 1,
        totalItems: 0,
        totalPages: 0,
        tableLoading: true,
        skeletonLoading: false,
        columnSlots: ['actions', 'status', 'reserved'],
        itemKey: 'roleId',

        // 以下为 编辑或新增Dialog相关内容
        editedIndex: -1,
        editedItem: itemModel
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? '添加角色' : '编辑角色';
        }
    },

    mounted () {
        this.skeletonLoading = true;
        this.initialize();
    },

    methods: {
        pagination (pageNumber) {
            this.pageNumber = pageNumber;
            this.findItemsByPage();
        },

        initialize () {
            this.$storage.getItem('constants').then((constants) => {
                this.upmsConstants = JSON.parse(constants);
                this.statusDisplay = this.$utils.constants.statusDisplay;
                this.findItemsByPage();
                this.$api.upms.sysAuthority.fetchAuthorityTree().then(result => {
                    this.treeNodes = result.data;
                });
            });
        },

        findItemsByPage () {
            this.tableLoading = true;
            this.$api.upms.sysRole
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
            this.$api.upms.sysRole.delete(item.roleId).then(result => {
                this.findItemsByPage();
            });
        },

        goToDetail (name) {
            this.$utils.navigation.goToDetail(name, this.editedItem);
        },

        editItem (item) {
            this.editedIndex = this.tableItems.indexOf(item);
            this.editedItem = item;
            this.goToDetail("SysRoleContent");
        },

        createItem () {
            this.editedIndex = -1;
            this.editedItem = itemModel;
            this.goToDetail("SysRoleContent");
        },

        authorizeItem (item) {
            this.editedItem = item;
            this.goToDetail("SysRoleAuthorize");
        },
    }
};
</script>
