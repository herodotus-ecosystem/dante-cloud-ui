import type { Conditions, Domain, Page } from '@herodotus-cloud/core';

import type { QTablePaginationProps, QTableOnRequestParameter } from '@/composables/declarations';

import { useRouter } from 'vue-router';

import { useRouterStore } from '@herodotus-cloud/framework-kernel';
import { OperationEnum } from '@herodotus-cloud/core';

/**
 * 数据表格基础定义。
 *
 * 主要提供 Table 显示以及向详情编辑(三级路由)页传递参数的通用方法。
 * vue-router 4 push 方法传递参数，推荐使用中间介质传递。
 *
 * @param name 组件名称
 * @param sorted 排序字段
 * @param direction 排除方向
 * @param <I> 输入值类型。传递给三级路由页面操作数据类型。通常为输入和输出为相同的实体类型，也可为非实体的 Dto 类型。
 * @param <O> 输出值类型，数据表格显示接口返回内容数据类型。通常为输入和输出为相同的实体类型，也可为非实体的 Dto 类型。
 * @returns
 */
export default function useBaseTableItems<
  C extends Conditions,
  I extends Domain,
  O extends Domain = I,
>(name: string, sortBy: string, descending = false, isFetchAll = false) {
  const loading = ref<boolean>(false);
  const totalPages = ref<number>(0);
  const tableRows = ref([]) as Ref<Array<O>>;
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
    item: I = {} as I,
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

  const toEdit = (item: I, additional: Record<string, unknown> = {}, withSuffix = true) => {
    const componentName = appendSuffix(name, 'Content', withSuffix);
    addRoutePushParam(componentName, OperationEnum.EDIT, item, additional);
  };

  const toCreate = (additional: Record<string, unknown> = {}, withSuffix = true) => {
    const componentName = appendSuffix(name, 'Content', withSuffix);
    addRoutePushParam(componentName, OperationEnum.CREATE, {} as I, additional);
  };

  const toAuthorize = (item: I, additional: Record<string, unknown> = {}, withSuffix = true) => {
    const componentName = appendSuffix(name, 'Authorize', withSuffix);
    addRoutePushParam(componentName, OperationEnum.AUTHORIZE, item, additional);
  };

  const toInfo = (item: I, additional: Record<string, unknown> = {}, withSuffix = true) => {
    const componentName = appendSuffix(name, 'Info', withSuffix);
    addRoutePushParam(componentName, OperationEnum.INFO, item, additional);
  };

  const toSetup = (item: I, additional: Record<string, unknown> = {}, withSuffix = true) => {
    const componentName = appendSuffix(name, 'Setup', withSuffix);
    addRoutePushParam(componentName, OperationEnum.SETUP, item, additional);
  };

  const toInvoke = (item: I, additional: Record<string, unknown> = {}, withSuffix = true) => {
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
  const setPageData = (data: Page<O>) => {
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
