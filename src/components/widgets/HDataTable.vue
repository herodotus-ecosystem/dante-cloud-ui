<template>
    <div class="list-table">
        <v-container class="pt-0" fluid>
            <v-row>
                <v-col class="pt-0">
                    <v-card v-if="skeletonLoading">
                        <v-skeleton-loader :boilerplate="boilerplate" :type="type" :tile="tile"></v-skeleton-loader>
                    </v-card>
                    <v-card v-else>
                        <v-data-table :headers="tableHeaders" :items="tableItems" :page.sync="page" :items-per-page="pageSize" :server-items-length="totalItems" :loading="tableLoading" hide-default-footer :single-select="false" show-select :item-key="itemKey" class="elevation-1">
                            <slot></slot>
                            <template v-slot:top>
                                <v-toolbar flat color="white">
                                    <v-toolbar-title>{{tableTitle}}</v-toolbar-title>
                                    <v-divider class="mx-4" inset vertical></v-divider>
                                    <v-spacer></v-spacer>
                                    <slot name="top"></slot>
                                </v-toolbar>
                                <v-divider></v-divider>
                            </template>
                            <template v-for="dynamicSlotName in dynamicSlotNames" v-slot:[dynamicSlotName]="{ item }">
                                <slot :name="dynamicSlotName" :item="item"></slot>
                            </template>
                        </v-data-table>
                        <div class="text-lg-right pt-2 pb-2">
                            <v-pagination v-model="page" :length="totalPages" :total-visible="totalVisible" @input="handlePagination"></v-pagination>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    name: 'HDataTable',

    props: {
        tableHeaders: {
            type: Array,
            default: () => []
        },
        tableItems: {
            type: Array,
            default: () => []
        },
        columnSlots: {
            type: Array,
            default: () => []
        },
        pageSize: {
            type: Number,
            default: 10
        },
        pageNumber: {
            type: Number,
            default: 1
        },
        totalItems: {
            type: Number,
            default: 0
        },
        totalPages: {
            type: Number,
            default: 0
        },
        totalVisible: {
            type: Number,
            default: 7
        },
        tableLoading: {
            type: Boolean,
            default: false
        },
        skeletonLoading:
        {
            type: Boolean,
            default: false
        },
        itemKey: String,
        tableTitle: String
    },

    data: () => ({
        boilerplate: false,
        tile: false,
        type: 'table',
        dynamicSlotNames: [],
        page: 0
    }),

    mounted () {
        for (let columnSlot of this.columnSlots) {
            if (columnSlot) {
                if (columnSlot.search('item.') === -1) {
                    this.dynamicSlotNames.push('item.' + columnSlot);
                } else {
                    this.dynamicSlotNames.push(columnSlot);
                }
            }
        }
        this.page = this.pageNumber;

    },
    methods: {
        handlePagination () {
            this.$emit('pagination', this.page);
        },
        handleRefresh () {
            this.$emit('initialize');
        }
    }
}
</script>
