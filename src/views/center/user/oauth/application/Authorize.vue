<template>
    <v-container grid-list-xl fluid>
        <v-row>
            <v-col cols="8">
                <v-overlay :value="overlay">
                    <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
                </v-overlay>
                <v-card>
                    <v-data-table :headers="tableHeaders" :items="tableItems" item-key="authorityId" group-by="serviceId" sort-by="url" show-select show-group-by class="elevation-1" :items-per-page="pageSize" @item-selected="selectItem($event)" @toggle-select-all="selectAllItems($event)">
                        <template v-slot:top>
                            <v-toolbar flat color="white">
                                <v-toolbar-title>服务接口列表</v-toolbar-title>
                                <v-divider class="mx-4" inset vertical></v-divider>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-divider></v-divider>
                        </template>
                        <template v-slot:item.requestMethod="{ item }">
                            <v-alert dense text :type="colorSwitcher(item.requestMethod)" class="mb-0">
                                <template v-slot:prepend>
                                    <v-btn x-small width="70" :color="colorSwitcher(item.requestMethod)" dark class="mr-4">
                                        {{item.requestMethod}}
                                    </v-btn>
                                </template>
                                <span class="ml-2">{{item.url}}</span>

                                <template v-slot:append>
                                    <span>{{item.authorityName}}</span>
                                </template>
                            </v-alert>
                        </template>
                        <template v-slot:item.data-table-select="{ item, isSelected, select }">
                            <v-simple-checkbox :ripple="tableItemCheckboxRipple" :value="item.isSelected" @input="select($event)"></v-simple-checkbox>
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
                            <v-list-item v-for="item in selectedItems" :key="item.authorityId">
                                <v-list-item-avatar>
                                    <v-icon :class="colorSwitcher(item.requestMethod) + ' white--text'">{{iconSwitcher(item.requestMethod)}}</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>{{item.url}}</v-list-item-title>
                                    <v-list-item-subtitle>{{item.serviceId}} -- {{item.authorityName}}</v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn icon>
                                        <v-icon color="red" @click="removeItem(item)">mdi-delete</v-icon>
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

const itemStyles = {
    PUT: { color: 'warning', icon: 'mdi-book-minus-multiple' },
    DELETE: { color: 'error', icon: 'mdi-book-remove-multiple' },
    POST: { color: 'success', icon: 'mdi-book-plus-multiple' },
    GET: { color: 'info', icon: 'mdi-book-multiple' }
};

const defaultItemStyle = { color: 'success', icon: 'mdi-book-multiple' };

export default {
    data: () => ({
        tableHeaders: [
            {
                text: '接口详情',
                align: 'start',
                value: 'requestMethod',
            },
            { text: '微服务ID', value: 'serviceId', align: 'center' }

        ],
        tableItems: [],
        tableItemCheckboxRipple: false,
        pageSize: 100,
        selectedItems: [],
        currentItem: {},
        overlay: false
    }),

    created () {
        let item = this.$route.params;
        this.currentItem = item;
        if (item && item.authorities) {
            this.selectedItems = item.authorities;
        }
    },

    mounted () {
        this.initialize();
    },

    methods: {
        styleSwitcher (requestMethod, property) {
            let type = itemStyles[requestMethod];
            if (type) {
                return type[property];
            } else {
                return defaultItemStyle[property];
            }
        },
        colorSwitcher (requestMethod) {
            return this.styleSwitcher(requestMethod, 'color')
        },

        iconSwitcher (requestMethod) {
            return this.styleSwitcher(requestMethod, 'icon')
        },

        initialize () {
            this.findItems();
        },

        findItems () {
            this.$api.upms.sysAuthority.fetchAuthorityApis().then(result => {
                let checkedItems = [];
                if (result) {
                    checkedItems = result.map(item => {
                        item.isSelected = false;
                        if (this.selectedItems && this.selectedItems.length > 0) {
                            if (this.selectedItems.find(selectedItem => selectedItem.authorityId === item.authorityId)) {
                                item.isSelected = true;
                            }
                        }
                        return item;
                    })
                }
                this.tableItems = checkedItems;
            });
        },

        itemFilter (value, search, item) {
            return item.parentId === '0'
        },

        clearItems () {
            this.selectedItems = [];
        },

        selectAllItems (e) {
            if (e.value) {
                this.selectedItems = e.items;
            } else {
                this.clearItems();
            }
            let tableItems = this.tableItems.map(tableItem => {
                tableItem.isSelected = e.value;
                return tableItem;
            })
        },
        selectItem (e) {
            let item = e.item;
            let isSelected = e.value;
            if (isSelected) {
                this.selectedItems.push(item);
            } else {
                this.removeItem(item);
            }
            let selectedItem = this.tableItems.find(tableItem => tableItem.authorityId === item.authorityId);
            selectedItem.isSelected = isSelected;
        },
        removeItem (item) {
            this.$utils.array.remove(this.selectedItems, item);
        },
        save () {
            if (this.selectedItems && this.selectedItems.length > 0) {
                this.overlay = true;
                let scopeId = this.currentItem.scopeId;
                let authorities = this.selectedItems.map(item => item.authorityId);
                this.$api.upms.oauthScopes.assignAuthority({ scopeId: scopeId, authorities: authorities }).then(result => {
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
