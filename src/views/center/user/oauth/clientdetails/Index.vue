<template>
    <h-detail>
        <h-data-table :table-headers="tableHeaders" :table-items="tableItems" :page-number="pageNumber" :page-size="pageSize" :total-items="totalItems" :total-pages="totalPages" :table-title="title" :table-loading="tableLoading" :skeleton-loading="skeletonLoading" :column-slots="columnSlots" :item-key="itemKey" @pagination="pagination" @initialize="initialize">
            <template v-slot:top>
                <v-btn color="primary" dark class="mb-2 mr-2" @click="createItem()">申请APP_KEY</v-btn>
            </template>
            <template v-slot:item.access_token_validity="{ item }">
                <v-chip color="teal" text-color="white">
                    {{timeDisplay(item.access_token_validity)}}
                </v-chip>
            </template>
            <template v-slot:item.refresh_token_validity="{ item }">
                <v-chip color="teal" text-color="white">
                    {{timeDisplay(item.refresh_token_validity)}}
                </v-chip>
            </template>
            <template v-slot:item.redirect_uri="{ item }">
                <v-menu open-on-hover top offset-y>
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
                    <v-tooltip bottom :key="index">
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
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon class="mr-2" color="warning" v-on="on" @click="editItem(item)">
                            mdi-pencil-box-multiple
                        </v-icon>
                    </template>
                    <span>编辑</span>
                </v-tooltip>
                <v-tooltip v-if="!item.reserved" bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon color="error" v-on="on" @click="deleteItem(item)">
                            mdi-delete-empty
                        </v-icon>
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
        HDataTable,
        HDetail
    },
    data: () => ({
        title: '终端授权范围信息',
        upmsConstants: {},
        statusDisplay: [],

        // 以下为 Table相关内容
        tableHeaders: [
            { text: 'APP_KEY', align: 'center', value: 'client_id' },
            { text: '应用名称', align: 'center', value: 'additional_information.appName' },
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
        this.initialize();
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

        initialize () {
            this.$storage.getItem('constants').then((constants) => {
                this.upmsConstants = JSON.parse(constants);
                this.statusDisplay = this.$utils.constants.statusDisplay;
                this.findItemsByPage();
            });
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
    }
};
</script>
