import { DataTableHeader } from 'vuetify';
import { Vue } from 'vue-property-decorator';
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
export default class HTable extends Vue {
    readonly tableHeaders: DataTableHeader[];
    readonly tableItems: any[];
    readonly pageSize: number;
    readonly totalItems?: number;
    readonly tableLoading?: boolean;
    readonly externalPagination?: boolean;
    readonly disablePagination?: boolean;
    readonly singleSelect?: boolean;
    readonly showSelect?: boolean;
    readonly itemKey?: string;
    readonly groupBy?: string[];
    readonly groupDesc?: string[];
    readonly sortBy?: string[];
    readonly sortDesc?: string[];
    readonly totalPages?: number;
    readonly totalVisible?: number;
    readonly boilerplate?: boolean;
    readonly tile?: boolean;
    readonly type?: string;
    readonly tableTitle: string;
    readonly columnSlots?: string[];
    readonly skeletonLoading?: boolean;
    selectedItems?: any[];
    pageNumber: number;
    onSelectItem(e: Event): Event;
    onSelectAllItems(e: Event): Event;
    onPagination(e: Event): Event;
    get isShowExternalPagination(): boolean;
    get isHideDefaultPagination(): boolean;
    excludeSlots: string[];
    dynamicSlotNames: string[];
    mounted(): void;
    initColumnSlots(): void;
}
//# sourceMappingURL=HTable.vue?rollup-plugin-vue=script.d.ts.map