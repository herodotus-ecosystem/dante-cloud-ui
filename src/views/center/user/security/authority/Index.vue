<template>
    <h-data-table :table-headers="tableHeaders" :table-items="tableItems" :column-slots="['actions', 'status', 'reserved']" :page-number="pageNumber" :total-items="totalItems" :total-pages="totalPages" item-key="name" :table-title="title" :table-loading="tableLoading" :skeleton-loading="skeletonLoading" @pagination="pagination" @initialize="initialize">
        <template v-slot:top>
            <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark class="mb-2 mr-2" v-on="on">添加角色</v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                        <ValidationObserver ref="observer">
                            <v-form>
                                <v-container grid-list-md>
                                    <ValidationProvider v-slot="{ errors }" name="权限名称" rules="required">
                                        <v-text-field outlined clearable label="权限名称 * " placeholder="请输权限名称" v-model="editedItem.authorityName" :error-messages="errors" required></v-text-field>
                                    </ValidationProvider>
                                    <v-text-field outlined clearable label="权限代码" placeholder="请输入权限代码" v-model="editedItem.authorityCode"></v-text-field>
                                    <v-text-field outlined clearable label="说明" placeholder="请输入该权限的说明" v-model="editedItem.description"></v-text-field>
                                    <v-select outlined v-model="editedItem.status" :items="upmsConstants.status" label="数据状态"></v-select>
                                    <v-divider></v-divider>
                                    <v-switch v-model="editedItem.reserved" label="是否是保留数据" color="primary"></v-switch>
                                </v-container>
                            </v-form>
                        </ValidationObserver>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-2" text @click="close">取消</v-btn>
                        <v-btn color="blue darken-2" text @click="save">保存</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
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
                    <v-btn class="mx-2" fab dark x-small color="warning" v-on="on" @click="editItem(item)">
                        <v-icon>edit</v-icon>
                    </v-btn>
                </template>
                <span>编辑</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-if="!item.reserved" v-slot:activator="{ on }">
                    <v-btn fab dark x-small color="error" v-on="on" @click="deleteItem(item)">
                        <v-icon>delete</v-icon>
                    </v-btn>
                </template>
                <span>删除</span>
            </v-tooltip>
            <slot name="actionButton"></slot>
        </template>
    </h-data-table>

</template>

<script>
import HDataTable from '@/components/widgets/HDataTable.vue';
export default {
    components: {
        HDataTable
    },
    data: () => ({
        title: '权限平台信息',
        upmsConstants: {},
        statusDisplay: [],

        // 以下为 Table相关内容
        tableLoading: true,
        skeletonLoading: false,
        tableItems: [],
        pageSize: 10,
        pageNumber: 1,
        totalItems: 0,
        totalPages: 0,
        totalVisible: 7,
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

        // 以下为 编辑或新增Dialog相关内容
        dialog: false,
        editedIndex: -1,
        editedItem: {
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
            reserved: false,
            createTime: '',
            updateTime: '',
            status: 1
        },
        defaultItem: {
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
            reserved: false,
            createTime: '',
            updateTime: '',
            status: 1
        }
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? '添加信息' : '编辑信息';
        }
    },

    watch: {
        dialog (val) {
            val || this.close();
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
        editItem (item) {
            this.editedIndex = this.tableItems.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        close () {
            this.dialog = false;
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            }, 300);
        },

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

        initialize () {
            this.$storage.getItem('constants').then((constants) => {
                this.upmsConstants = JSON.parse(constants);
                this.statusDisplay = this.$utils.constants.statusDisplay;
                this.findItemsByPage();
            });
        },

        deleteItem (item) {
            this.$api.upms.sysAuthority.delete(item.authorityId).then(result => {
                this.findItemsByPage();
            });
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
