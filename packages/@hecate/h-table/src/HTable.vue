<template>
    <div>
        <v-card v-if="skeletonLoading">
            <v-skeleton-loader :boilerplate="boilerplate" :type="type" :tile="tile"></v-skeleton-loader>
        </v-card>
        <v-card v-else>
            <v-data-table
                v-model="selectedItems"
                class="elevation-1"
                :headers="tableHeaders"
                :items="tableItems"
                :page.sync="pageNumber"
                :items-per-page="pageSize"
                :server-items-length="totalItems"
                :loading="tableLoading"
                :hide-default-footer="externalPagination"
                :single-select="singleSelect"
                :show-select="showSelect"
                :item-key="itemKey"
                :group-by="groupBy"
                :group-desc="groupDesc"
                :sort-by="sortBy"
                :sort-desc="sortDesc"
                @item-selected="onSelectItem($event)"
                @toggle-select-all="onSelectAllItems($event)"
            >
                <slot></slot>
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>{{ tableTitle }}</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <slot name="top"></slot>
                    </v-toolbar>
                    <v-divider></v-divider>
                </template>
                <template v-for="dynamicSlotName in dynamicSlotNames" v-slot:[dynamicSlotName]="{ item }">
                    <slot :name="dynamicSlotName" :item="item"></slot>
                </template>
                <!-- <template v-slot:[`item.data-table-select`]="{ item }">
                    <v-simple-checkbox :ripple="false" v-model="item.isSelected"></v-simple-checkbox>
                </template> -->
            </v-data-table>
            <div v-if="externalPagination" class="text-lg-right pt-2 pb-2">
                <v-pagination
                    :value="pageNumber"
                    :length="totalPages"
                    :total-visible="totalVisible"
                    @input="onPagination($event)"
                ></v-pagination>
            </div>
        </v-card>
    </div>
</template>

<script lang="ts">
import { DataTableHeader } from 'vuetify';
import { Component, Emit, Prop, VModel, Vue } from 'vue-property-decorator';

/**
 * https://blog.csdn.net/qq_41261490/article/details/102605640
 *
 * 1.tsconfig.json配置以下设置，简单粗暴，但是超级不推荐。
 * {
 *      "compilerOptions": {
 *          // 严格属性初始化
 *          "strictPropertyInitialization": false
 *      }
 * }
 *
 * 2.使用非空断言   属性后加“ ！”
 * @Prop() option!: String;
 *
 * 3.使用联合类型
 * @Prop() option: Object | undefined | null;
 *
 * 4.使用可选属性 属性后加“ ? ”
 * @Prop() option?: Object;
 */

@Component
export default class HTable extends Vue {
    // v-table 相关属性
    @Prop({ type: Array, default: () => [] }) readonly tableHeaders!: DataTableHeader[];
    @Prop({ type: Array, default: () => [] }) readonly tableItems!: any[];
    @Prop({ type: Number, default: 10 }) readonly pageSize!: number;
    @Prop({ type: Number, default: -1 }) readonly totalItems?: number;
    @Prop({ type: Boolean, default: false }) readonly tableLoading?: boolean;
    @Prop({ type: Boolean, default: false }) readonly externalPagination?: boolean;
    @Prop({ type: Boolean, default: false }) readonly singleSelect?: boolean;
    @Prop({ type: Boolean, default: false }) readonly showSelect?: boolean;
    @Prop({ type: String, default: 'id' }) readonly itemKey?: string;
    @Prop({ type: Array, default: () => [] }) readonly groupBy?: string[];
    @Prop({ type: Array, default: () => [] }) readonly groupDesc?: string[];
    @Prop({ type: Array, default: () => [] }) readonly sortBy?: string[];
    @Prop({ type: Array, default: () => [] }) readonly sortDesc?: string[];

    // v-pagination 相关属性
    @Prop({ type: Number, default: 0 }) readonly totalPages?: number;
    @Prop({ type: Number, default: 7 }) readonly totalVisible?: number;

    // v-skeleton-loader 相关属性
    @Prop({ type: Boolean, default: false }) readonly boilerplate?: boolean;
    @Prop({ type: Boolean, default: false }) readonly tile?: boolean;
    @Prop({ type: String, default: 'table' }) readonly type?: string;

    // 自定义扩展属性
    @Prop(String) readonly tableTitle!: string;
    @Prop({ type: Array, default: () => [] }) readonly columnSlots?: string[];
    @Prop({ type: Boolean, default: false }) readonly skeletonLoading?: boolean;

    @VModel({ type: Array, default: () => [] }) selectedItems?: any[];

    pageNumber = 1;

    @Emit('selectItem')
    public onSelectItem(e: Event): Event {
        return e;
    }

    @Emit('selectAllItems')
    public onSelectAllItems(e: Event): Event {
        return e;
    }

    @Emit('pagination')
    public onPagination(e: Event): Event {
        if (typeof e === 'number') {
            this.pageNumber = e as number;
        }
        return e;
    }

    excludeSlots: string[] = ['top', 'data-table-select'];
    dynamicSlotNames: string[] = new Array<string>();

    public mounted(): void {
        this.initColumnSlots();
    }

    public initColumnSlots(): void {
        if (this.columnSlots) {
            for (let columnSlot of this.columnSlots) {
                if (columnSlot && !this.excludeSlots.includes(columnSlot)) {
                    if (columnSlot.search('item.') === -1) {
                        this.dynamicSlotNames.push('item.' + columnSlot);
                    } else {
                        this.dynamicSlotNames.push(columnSlot);
                    }
                }
            }
        }
    }
}
</script>
