<template>
    <h-detail :detail-title="formTitle">
        <h-table :table-headers="tableHeaders" :table-items="tableItems" :page-number="pageNumber" :page-size="pageSize" :total-items="totalItems" :total-pages="totalPages" :table-title="title" :table-loading="tableLoading" :skeleton-loading="skeletonLoading" :column-slots="columnSlots" :item-key="itemKey" @pagination="pagination" @initialize="initialize">
            <template v-slot:top>
                <v-btn color="primary" dark class="mb-2 mr-2" @click="createItem()">申请APP_KEY</v-btn>
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
                <h-table-item-button color="purple" icon="mdi-security" icon-class="mr-2" tooltip="分配权限" @click="authorizeItem(item)"></h-table-item-button>
                <h-table-item-button color="warning" icon="mdi-pencil-box-multiple" icon-class="mr-2" tooltip="编辑" @click="editItem(item)"></h-table-item-button>
                <h-table-item-button color="error" icon="mdi-delete-sweep" tooltip="删除" @click="deleteItem(item)"></h-table-item-button>
            </template>
        </h-table>
    </h-detail>
</template>

<script>
import HTable from '@/components/widgets/HTable.vue';
import HTableItemButton from '@/components/widgets/HTableItemButton.vue';
import HDetail from '@/components/widgets/HDetail.vue';

const itemModel = {
    appKey: '',
    appSecret: '',
    appName: '',
    appNameEn: '',
    appIcon: '',
    applicationType: 0,
    technologyType: 0,
    website: '',
    scopes: [],
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
        HDetail
    },
    data: () => ({
        title: '终端授权范围信息',
        upmsConstants: {},
        statusDisplay: [],

        // 以下为 Table相关内容
        tableHeaders: [
            { text: 'APP_KEY', align: 'center', value: 'appKey' },
            { text: 'APP_SECRET', align: 'center', value: 'appSecret' },
            { text: '应用名称', align: 'center', value: 'appName' },
            { text: '应用简写', align: 'center', value: 'appNameEn' },
            { text: '应用图标', align: 'center', value: 'appIcon' },
            { text: '应用类型', align: 'center', value: 'applicationType' },
            { text: '技术类型', align: 'center', value: 'technologyType' },
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
        itemKey: 'scopeId',

        // 以下为 编辑或新增Dialog相关内容
        editedIndex: -1,
        editedItem: itemModel,
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? '添加应用' : '编辑应用';
        }
    },

    created () { },

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
            });
        },

        findItemsByPage () {
            this.tableLoading = true;
            this.$api.upms.oauthApplications
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
            this.$api.upms.oauthApplications.delete(item.appKey).then(result => {
                this.findItemsByPage();
            });
        },

        goToDetail (name) {
            this.$utils.navigation.goToDetail(name, this.editedItem);
        },

        editItem (item) {
            this.editedIndex = this.tableItems.indexOf(item);
            this.editedItem = item;
            this.goToDetail("OauthApplicationsContent");
        },

        createItem () {
            this.editedIndex = -1;
            this.editedItem = itemModel;
            this.goToDetail("OauthApplicationsContent");
        },

        authorizeItem (item) {
            this.editedItem = item;
            this.goToDetail("OauthApplicationsAuthorize");
        }
    }
};
</script>
