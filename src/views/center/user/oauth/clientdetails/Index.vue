<template>
    <h-detail :detail-title="formTitle">
        <h-table :table-headers="tableHeaders" :table-items="tableItems" :page-number="pageNumber" :page-size="pageSize" :total-items="totalItems" :total-pages="totalPages" :table-title="tableTitle" :table-loading="tableLoading" :skeleton-loading="skeletonLoading" :column-slots="columnSlots" :item-key="itemKey" @pagination="pagination">
            <template v-slot:top>
                <v-btn color="primary" dark class="mb-2 mr-2" @click="createItem()">申请APP_KEY</v-btn>
            </template>
            <template v-slot:item.access_token_validity="{ item }">
                <v-chip v-if="!isServiceTypeDataItem(item)" color="teal" dark small text-color="white">
                    {{timeDisplay(item.access_token_validity)}}
                </v-chip>
            </template>
            <template v-slot:item.refresh_token_validity="{ item }">
                <v-chip v-if="!isServiceTypeDataItem(item)" color="teal" dark small text-color="white">
                    {{timeDisplay(item.refresh_token_validity)}}
                </v-chip>
            </template>
            <template v-slot:item.redirect_uri="{ item }">
                <v-menu v-if="!isServiceTypeDataItem(item)" open-on-hover top offset-y>
                    <template v-slot:activator="{ on }">
                        <v-icon color="primary" dark v-on="on">
                            mdi-shuffle-variant
                        </v-icon>
                    </template>
                    <v-list dense>
                        <v-list-item v-for="(data, index) in item.redirect_uri" :key="index">
                            <v-list-item-title>{{ data }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>
            <template v-slot:item.authorized_grant_types="{ item }">
                <template v-for="(data, index) in item.authorized_grant_types">
                    <v-tooltip v-if="!isServiceTypeDataItem(item)" bottom :key="index">
                        <template v-slot:activator="{ on }">
                            <v-icon :class="index ? 'ml-2' : ''" :color="colorSwitcher(data)" v-on="on">
                                {{iconSwitcher(data)}}
                            </v-icon>
                        </template>
                        <span>{{textSwitcher(data)}}</span>
                    </v-tooltip>
                </template>
            </template>
            <template v-slot:item.actions="{ item }">
                <h-table-item-button v-if="isServiceTypeDataItem(item)" color="indigo" icon="mdi-file-upload" icon-class="mr-2" tooltip="发布配置" @click="publishItem(item)"></h-table-item-button>
                <h-table-item-button v-if="isServiceTypeDataItem(item)" color="purple" icon="mdi-file-undo" icon-class="mr-2" tooltip="撤销发布" @click="undoItem(item)"></h-table-item-button>
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

const typeStyles = {
    authorization_code: { color: 'pink', icon: 'mdi-server-security', text: '授权码模式' },
    client_credentials: { color: 'teal', icon: 'mdi-smart-card', text: '客户端凭证模式' },
    password: { color: 'cyan', icon: 'mdi-book-plus-multiple', text: '密码模式' },
    implicit: { color: 'purple', icon: 'mdi-sign-real-estate', text: '隐式/简化模式' },
    refresh_token: { color: 'indigo', icon: 'mdi-shield-sync', text: '刷新模式' }
};

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
        // 以下为 Table相关内容
        tableTitle: '终端授权范围信息',
        tableHeaders: [
            { text: 'APP_KEY', align: 'center', value: 'client_id' },
            { text: '应用名称', align: 'center', value: 'additional_information.appName' },
            { text: '应用类型', align: 'center', value: 'additional_information.applicationType' },
            { text: 'Token有效时间', align: 'center', value: 'access_token_validity' },
            { text: 'Token刷新时间', align: 'center', value: 'refresh_token_validity' },
            { text: '授权类型', align: 'center', value: 'authorized_grant_types' },
            { text: '地址', align: 'center', value: 'redirect_uri' },
            { text: '操作', align: 'center', value: 'actions', sortable: false }
        ],
        tableItems: [],
        pageSize: 10,
        pageNumber: 1,
        totalItems: 0,
        totalPages: 0,
        tableLoading: true,
        skeletonLoading: false,
        columnSlots: ['actions', 'redirect_uri', 'authorized_grant_types', 'access_token_validity', 'refresh_token_validity'],
        itemKey: 'client_id',

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
        this.findItemsByPage();
    },

    methods: {
        styleSwitcher (grantType, property) {
            let type = typeStyles[grantType];
            if (type) {
                return type[property];
            }
        },
        colorSwitcher (grantType) {
            return this.styleSwitcher(grantType, 'color')
        },

        iconSwitcher (grantType) {
            return this.styleSwitcher(grantType, 'icon')
        },

        textSwitcher (grantType) {
            return this.styleSwitcher(grantType, 'text')
        },

        timeDisplay (time) {
            if (time === 0) {
                return '0';
            } else {
                return this.$moment.duration(time, 'second').humanize();
            }
        },

        pagination (pageNumber) {
            this.pageNumber = pageNumber;
            this.findItemsByPage();
        },

        findItemsByPage () {
            this.tableLoading = true;
            this.$api.upms.oauthClientDetails
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
            this.$api.upms.oauthClientDetails.delete(item.client_id).then(result => {
                this.findItemsByPage();
            });
        },

        goToDetail (name) {
            this.$utils.navigation.goToDetail(name, this.editedItem);
        },

        editItem (item) {
            this.editedIndex = this.tableItems.indexOf(item);
            this.editedItem = item;
            this.goToDetail("OauthClientDetailContent");
        },

        publishItem (item) {
            this.$api.upms.oauthClientDetails.publishConfig({ clientId: item.client_id });
        },

        undoItem (item) {
            this.$api.upms.oauthClientDetails.removeConfig(item.client_id);
        },

        isServiceTypeDataItem (item) {
            let object = item.additional_information;
            if (object && object.applicationType && object.applicationType === 'SERVICE') {
                return true;
            }
            return false;
        }
    }
};
</script>
