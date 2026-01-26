import type { Ref } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import type {
  Conditions,
  Entity,
  Page,
  QTablePaginationProps,
  QTableOnRequestParameter,
} from '@/lib/declarations';

import { useRouterStore } from '@herodotus-cloud/framework-kernel';
import { OperationEnum } from '@/lib/definitions';

export default function useBaseTableItems<E extends Entity, C extends Conditions>(
  name: string,
  sortBy: string,
  descending = false,
  isFetchAll = false,
) {
  const loading = ref<boolean>(false);
  const totalPages = ref<number>(0);
  const tableRows = ref([]) as Ref<Array<E>>;
  const conditions = ref({}) as Ref<C>;
  const pagination = ref<QTablePaginationProps>({
    sortBy: sortBy,
    descending: descending,
    page: 1,
    rowsPerPage: isFetchAll ? 0 : 10,
    rowsNumber: 0,
  });

  const store = useRouterStore();
  const router = useRouter();

  /**
   * 进入 Table 详情页(三级路由页面)传递的参数
   * @param componentName 详情页(三级路由页面) 对应的组件名称
   * @param operation 对应的操作类型 {@link OperationEnum}
   * @param item 传递的数据
   */
  const addRoutePushParam = (
    componentName: string,
    operation: OperationEnum,
    item: E = {} as E,
    additional: Record<string, unknown> = {},
  ) => {
    store.addRoutePushParam(componentName, {
      item: JSON.stringify(item),
      operation: operation,
      additional: JSON.stringify(additional),
    });
    router.push({ name: componentName });
  };

  const appendSuffix = (name: string, suffix: string, withSuffix = true) => {
    return withSuffix ? name + suffix : name;
  };

  const toEdit = (item: E, additional: Record<string, unknown> = {}, withSuffix = true) => {
    const componentName = appendSuffix(name, 'Content', withSuffix);
    addRoutePushParam(componentName, OperationEnum.EDIT, item, additional);
  };

  const toCreate = (additional: Record<string, unknown> = {}, withSuffix = true) => {
    const componentName = appendSuffix(name, 'Content', withSuffix);
    addRoutePushParam(componentName, OperationEnum.CREATE, {} as E, additional);
  };

  const toAuthorize = (item: E, additional: Record<string, unknown> = {}, withSuffix = true) => {
    const componentName = appendSuffix(name, 'Authorize', withSuffix);
    addRoutePushParam(componentName, OperationEnum.AUTHORIZE, item, additional);
  };

  const toInfo = (item: E, additional: Record<string, unknown> = {}, withSuffix = true) => {
    const componentName = appendSuffix(name, 'Info', withSuffix);
    addRoutePushParam(componentName, OperationEnum.INFO, item, additional);
  };

  const toSetup = (item: E, additional: Record<string, unknown> = {}, withSuffix = true) => {
    const componentName = appendSuffix(name, 'Setup', withSuffix);
    addRoutePushParam(componentName, OperationEnum.SETUP, item, additional);
  };

  const toInvoke = (item: E, additional: Record<string, unknown> = {}, withSuffix = true) => {
    const componentName = appendSuffix(name, 'Invoke', withSuffix);
    addRoutePushParam(componentName, OperationEnum.INVOKE, item, additional);
  };

  /**
   * 设置分页信息
   * @param request Quasar Table onRequest 传递的参数 {@link QTableRequestProps}
   */
  const setPagination = (request: QTableOnRequestParameter) => {
    const { descending, page, rowsPerPage, sortBy } = request.pagination;
    pagination.value.descending = descending;
    pagination.value.page = page;
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
    hideLoading,
    toAuthorize,
    toCreate,
    toEdit,
    toInfo,
    toSetup,
    toInvoke,
  };
}
