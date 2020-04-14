<template>
    <v-container grid-list-xl fluid>
        <v-row>
            <v-col cols="8">
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
                            <v-alert dense text :type="itemStyles[item.requestMethod] ? itemStyles[item.requestMethod] : 'success'" class="mb-0">
                                <template v-slot:prepend>
                                    <v-btn x-small width="70" :color="itemStyles[item.requestMethod] ? itemStyles[item.requestMethod] : 'success'" dark class="mr-4">
                                        {{item.requestMethod}}
                                    </v-btn>
                                </template>
                                <span class="ml-2">{{item.url}}</span>

                                <template v-slot:append>
                                    <span>{{item.authorityName}}</span>
                                </template>
                            </v-alert>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card>

                    <v-toolbar color="teal" dark>
                        <v-app-bar-nav-icon></v-app-bar-nav-icon>
                        <v-toolbar-title>Settings</v-toolbar-title>
                    </v-toolbar>

                    <v-list subheader two-line flat>
                        <v-subheader>已配置的权限</v-subheader>

                        <v-list-item-group multiple>
                            <v-list-item v-for="item in selectedItems" :key="item.name">
                                <v-list-item-content>
                                    <v-list-item-title>{{item.url}}</v-list-item-title>
                                    <v-list-item-subtitle>{{item.authorityName}}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
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
        pageSize: 100,
        selectedItems: [],
        selectedItemKeys: [],
        currentItem: {},
        itemStyles: { PUT: 'warning', DELETE: 'error', POST: 'success', GET: 'info' },

    }),

    mounted () {
        this.initialize();
    },

    methods: {
        initialize () {
            this.findItems();
        },

        initializeCurrentItem () {
            let item = this.$route.params;
            this.currentItem = item;
            if (item.authorities) {
                this.selectedItems = item.authorities;
                this.selectedItemKeys = item.authorities.map(authority => authority.authorityId);
            }
        },

        findItems () {
            this.$api.upms.sysAuthority.fetchAuthorityApis().then(result => {
                this.tableItems = result;
                this.initializeCurrentItem();
            });
        },

        itemFilter (value, search, item) {
            return item.parentId === '0'
        },

        selectAllItems (e) {
            if (e.value) {
                this.selectedItems = e.items;
            } else {
                this.selectedItems = [];
            }
        },
        selectItem (e) {
            let item = e.item;
            let isSelected = e.value;
            if (isSelected) {
                this.selectedItems.push(item);
            } else {
                this.removeSelectedItem(this.selectedItems, item);
            }
        },
        removeSelectedItem (array, item) {
            const index = array.findIndex(text => text.name === item.name);
            array.splice(index, 1);
        }
    }
}
</script>
