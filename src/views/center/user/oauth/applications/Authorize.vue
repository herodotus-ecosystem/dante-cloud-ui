<template>
    <v-container grid-list-xl fluid>
        <v-row>
            <v-col cols="8">
                <v-overlay :value="overlay">
                    <v-progress-circular
                        indeterminate
                        color="primary"
                        size="64"
                    ></v-progress-circular>
                </v-overlay>
                <v-card>
                    <v-data-table
                        :headers="tableHeaders"
                        :items="tableItems"
                        :page.sync="pageNumber"
                        :items-per-page="pageSize"
                        :loading="tableLoading"
                        item-key="scopeId"
                        show-select
                        class="elevation-1"
                        @item-selected="selectItem($event)"
                        @toggle-select-all="selectAllItems($event)"
                    >
                        <template v-slot:top>
                            <v-toolbar flat color="white">
                                <v-toolbar-title>授权范围列表</v-toolbar-title>
                                <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                                ></v-divider>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-divider></v-divider>
                        </template>
                        <template
                            v-slot:[`item.data-table-select`]="{
                                item,
                                isSelected,
                                select,
                            }"
                        >
                            <v-simple-checkbox
                                :ripple="false"
                                :value="item.isSelected"
                                @input="select($event)"
                            ></v-simple-checkbox>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card>
                    <v-toolbar color="teal" dark>
                        <v-app-bar-nav-icon></v-app-bar-nav-icon>
                        <v-toolbar-title>Settings</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="save()">
                                    <v-icon>mdi-content-save-all</v-icon>
                                </v-btn>
                            </template>
                            <span>提交</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="clearItems()">
                                    <v-icon>mdi-delete-empty</v-icon>
                                </v-btn>
                            </template>
                            <span>清空已选</span>
                        </v-tooltip>
                    </v-toolbar>

                    <v-list subheader two-line shaped>
                        <v-subheader>已配置的权限</v-subheader>
                        <v-list-item-group color="primary">
                            <v-list-item
                                v-for="item in selectedItems"
                                :key="item.scopeId"
                            >
                                <v-list-item-content>
                                    <v-list-item-title
                                        >{{ item.scopeCode }} -
                                        {{ item.scopeName }}</v-list-item-title
                                    >
                                    <v-list-item-subtitle>{{
                                        item.scopeId
                                    }}</v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn icon>
                                        <v-icon
                                            color="red"
                                            @click="removeItem(item)"
                                            >mdi-delete</v-icon
                                        >
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

const defaultComparator = 'scopeId';

export default {
    data: () => ({
        tableLoading: false,
        tableHeaders: [
            { text: '范围代码', align: 'center', value: 'scopeCode' },
            { text: '范围名称', align: 'center', value: 'scopeName' },
            { text: '说明', align: 'center', value: 'description' }
        ],
        tableItems: [],
        pageSize: 10,
        pageNumber: 1,
        selectedItems: [],
        currentItem: {},
        overlay: false
    }),

    created () {
        let item = this.$route.params;
        this.currentItem = item;
        if (item && item.scopes) {
            this.selectedItems = item.scopes;
        }
    },

    mounted () {
        this.initialize();
    },

    methods: {
        initialize () {
            this.findItems();
        },

        findItems () {
            this.tableLoading = true;
            this.$api.upms.oauthScopes.fetch({
                pageNumber: this.pageNumber - 1,
                pageSize: this.pageSize
            }).then(result => {
                this.tableLoading = false;
                this.totalPages = result.totalPages;
                this.totalItems = parseInt(result.totalElements, 0);
                let content = result.content;
                let checkedItems = [];
                if (result) {
                    checkedItems = content.map(item => {
                        item.isSelected = false;
                        if (this.selectedItems && this.selectedItems.length > 0) {
                            if (this.$utils.array.find(this.selectedItems, item, defaultComparator)) {
                                item.isSelected = true;
                            }
                        }
                        return item;
                    })
                }
                this.tableItems = checkedItems;
            }).catch(() => {
                this.tableLoading = false;
            });
        },

        changeAllTableItemsStatus (status) {
            this.tableItems = this.tableItems.map(item => {
                item.isSelected = status;
                return item;
            });
        },

        changeTableItemStatus (item, status) {
            let selectedItem = this.$utils.array.find(this.tableItems, item, defaultComparator);
            selectedItem.isSelected = status;
        },

        clearItems () {
            this.selectedItems = [];
            this.changeAllTableItemsStatus(false);
        },

        removeItem (item) {
            this.$utils.array.remove(this.selectedItems, item, defaultComparator)
            this.changeTableItemStatus(item, false);
        },

        selectAllItems (e) {
            if (e.value) {
                this.selectedItems = e.items;
                this.changeAllTableItemsStatus(e.value);
            } else {
                this.clearItems();
            }
        },

        selectItem (e) {
            let item = e.item;
            let isSelected = e.value;
            if (isSelected) {
                this.selectedItems.push(item);
                this.changeTableItemStatus(item, isSelected);
            } else {
                this.removeItem(item);
            }
        },

        save () {
            if (this.selectedItems && this.selectedItems.length > 0) {
                this.overlay = true;
                let appKey = this.currentItem.appKey;
                let scopes = this.selectedItems.map(item => item.scopeId);
                this.$api.upms.oauthApplications.assignScope({ appKey: appKey, scopes: scopes }).then(result => {
                    this.overlay = false;
                    this.$utils.navigation.goBack(this.$route);
                }).catch(() => {
                    this.overlay = false;
                });
            } else {
                this.$notify.warning('您尚未配置任何权限，请完成配置后再进行提交！');
            }
        }
    }
}
</script>
