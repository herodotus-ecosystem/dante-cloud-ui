import { ref, Ref } from 'vue';
import { useRouter } from 'vue-router';

import type { Conditions, Entity, Page, QTablePaginationProps, QTableRequestProps } from '/@/lib/declarations';

import { useRouteStore } from '/@/stores';
import { OperationEnum } from '/@/lib/enums';

export default function useTable<E extends Entity, C extends Conditions>() {
  const loading = ref<boolean>(false);
  const totalPages = ref<number>(0);
  const tableRows = ref([]) as Ref<Array<E>>;
  const conditions = ref({}) as Ref<C>;
  const pagination = ref<QTablePaginationProps>({
    sortBy: 'updateTime',
    descending: false,
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 0
  });

  const store = useRouteStore();
  const router = useRouter();

  /**
   * 进入 Table 详情页(三级路由页面)传递的参数
   * @param componentName 详情页(三级路由页面) 对应的组件名称
   * @param operation 对应的操作类型 {@link OperationEnum}
   * @param item 传递的数据
   */
  const addRoutePushParam = (componentName: string, operation: OperationEnum, item: E = {} as E) => {
    store.addRoutePushParam(componentName, { item: JSON.stringify(item), operation: operation });
    router.push({ name: componentName });
  };

  /**
   * 设置分页信息
   * @param request Quasar Table onRequest 传递的参数 {@link QTableRequestProps}
   */
  const setPagination = (request: QTableRequestProps) => {
    const { descending, page, rowsNumber, rowsPerPage, sortBy } = request.pagination;
    pagination.value.descending = descending;
    pagination.value.page = page;
    pagination.value.rowsNumber = rowsNumber;
    pagination.value.rowsPerPage = rowsPerPage;
    pagination.value.sortBy = sortBy;
  };

  /**
   * 分页查询返回的结果数据
   * @param data
   */
  const setPageData = (data: Page<E>) => {
    tableRows.value = data.content;
    totalPages.value = data.totalPages;
    pagination.value.rowsNumber = parseInt(data.totalElements, 0);
  };

  /**
   * 显示 Loading 状态
   */
  const showLoading = () => {
    loading.value = true;
  };

  /**
   * 隐藏 Loading 状态
   */
  const hideLoading = () => {
    loading.value = false;
  };

  return {
    conditions,
    loading,
    tableRows,
    totalPages,
    pagination,
    addRoutePushParam,
    setPagination,
    setPageData,
    showLoading,
    hideLoading
  };
}
