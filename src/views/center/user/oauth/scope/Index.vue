<template>
    <h-detail>
        <h-data-table :table-headers="tableHeaders" :table-items="tableItems" :column-slots="['actions', 'status', 'reserved']" :page-number="pageNumber" :total-items="totalItems" :total-pages="totalPages" item-key="name" :table-title="title" :table-loading="tableLoading" :skeleton-loading="skeletonLoading" @pagination="pagination" @initialize="initialize">
            <template v-slot:top>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2 mr-2" v-on="on">添加授权范围</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                            <ValidationObserver ref="observer">
                                <v-container grid-list-md>
                                    <ValidationProvider v-slot="{ errors }" name="授权范围代码" rules="required">
                                        <v-text-field outlined clearable label="授权范围代码 * " placeholder="请使用小写英文单词编写的授权范围代码，例如：all、read_user等" v-model="editedItem.scopeCode" :error-messages="errors" required></v-text-field>
                                    </ValidationProvider>
                                    <v-text-field outlined clearable label="授权范围名称" placeholder="请输入授权范围名称" v-model="editedItem.scopeName"></v-text-field>
                                    <v-text-field outlined clearable label="说明" placeholder="请输入该授权范围的说明" v-model="editedItem.description"></v-text-field>
                                    <v-select outlined v-model="editedItem.status" :items="upmsConstants.status" label="数据状态"></v-select>
                                    <v-divider></v-divider>
                                    <v-switch v-model="editedItem.reserved" label="是否是保留数据" color="primary"></v-switch>
                                </v-container>
                            </ValidationObserver>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="error" @click="close">取消</v-btn>
                            <v-btn color="primary" @click="save">保存</v-btn>
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
                        <v-btn class="mr-2" fab dark x-small color="purple" v-on="on" @click="goToAuthorizeDetail(item)">
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
            <v-dialog v-model="authorityDialog" scrollable max-width="300px">
                <v-card>
                    <v-card-title><span class="headline">授权</span></v-card-title>
                    <v-divider></v-divider>
                    <v-card-text style="height: 300px;">
                        <v-treeview dense hoverable activatable selectable selected-color="primary" open-all :items="treeNodes" v-model="selectionTreeNodes" selection-type="independent"></v-treeview>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="closeAuthorityDialog()">取消</v-btn>
                        <v-btn color="primary" @click="saveAssignAuthority()">保存</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </h-data-table>
    </h-detail>
</template>

<script>
import HDataTable from '@/components/widgets/HDataTable.vue';
import HDetail from '@/components/widgets/HDetail.vue';

const itemModel={
    scopeId: '',
    scopeCode: '',
    scopeName: '',
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
        tableLoading: true,
        skeletonLoading: false,
        tableItems: [],
        pageSize: 10,
        pageNumber: 1,
        totalItems: 0,
        totalPages: 0,
        totalVisible: 7,
        tableHeaders: [
            { text: '范围代码',align: 'center',value: 'scopeCode' },
            { text: '范围名称',align: 'center',value: 'scopeName' },
            { text: '说明',align: 'center',value: 'description' },
            { text: '保留数据',align: 'center',value: 'reserved' },
            { text: '状态',align: 'center',value: 'status' },
            { text: '操作',align: 'center',value: 'actions',sortable: false }
        ],

        // 以下为 编辑或新增Dialog相关内容
        dialog: false,
        editedIndex: -1,
        editedItem: itemModel,
        defaultItem: itemModel,
        authorityDialog: false,
        treeNodes: [],
        selectionTreeNodes: [],
        selectionScopeId: ''
    }),

    computed: {
        formTitle () {
            return this.editedIndex===-1? '添加授权范围':'编辑授权范围';
        }
    },

    watch: {
        dialog (val) {
            val||this.close();
        }
    },

    created () { },

    mounted () {
        this.skeletonLoading=true;
        this.initialize();
    },

    methods: {
        pagination (pageNumber) {
            this.pageNumber=pageNumber;
            this.findItemsByPage();
        },
        editItem (item) {
            this.editedIndex=this.tableItems.indexOf(item);
            this.editedItem=Object.assign({},item);
            this.dialog=true;
        },

        close () {
            this.dialog=false;
            setTimeout(() => {
                this.editedItem=Object.assign({},this.defaultItem);
                this.editedIndex=-1;
            },300);
        },

        findItemsByPage () {
            this.tableLoading=true;
            this.$api.upms.oauthScopes
                .fetch({
                    pageNumber: this.pageNumber-1,
                    pageSize: this.pageSize
                })
                .then(result => {
                    this.tableLoading=false;
                    this.tableItems=result.content;
                    this.totalPages=result.totalPages;
                    this.totalItems=parseInt(result.totalElements,0);
                    if(this.skeletonLoading) {
                        this.skeletonLoading=false;
                    }
                });
        },

        initialize () {
            this.$storage.getItem('constants').then((constants) => {
                this.upmsConstants=JSON.parse(constants);
                this.statusDisplay=this.$utils.constants.statusDisplay;
                this.findItemsByPage();
            });

        },

        deleteItem (item) {
            this.$api.upms.oauthScopes.delete(item.scopeId).then(result => {
                this.findItemsByPage();
            });
        },

        save () {
            this.$refs.observer.validate().then(validateResulte => {
                if(validateResulte) {
                    this.$api.upms.oauthScopes.saveOrUpdate(this.editedItem).then(result => {
                        this.findItemsByPage();
                        this.close();
                    });
                }
            });
        },

        showAssignAuthority (item) {
            this.authorityDialog=true;
            let selectionTreeNodes=item.authorities.map(authority => {
                return authority.authorityId;
            });

            this.selectionScopeId=item.scopeId;
            if(selectionTreeNodes) {
                this.selectionTreeNodes=selectionTreeNodes;
            }
        },

        closeAuthorityDialog () {
            this.authorityDialog=false;
            setTimeout(() => {
                this.selectionTreeNodes='';
            },300);
        },

        saveAssignAuthority () {
            this.$api.upms.oauthScopes.assignAuthority({ scopeId: this.selectionScopeId,authorities: this.selectionTreeNodes }).then(result => {
                this.findItemsByPage();
                this.closeAuthorityDialog();
            });
        },
        goToAuthorizeDetail (item) {
            this.$router.replace({
                name: "OauthScopesAuthorize",
                params: item
            })
        }

    }
};
</script>
