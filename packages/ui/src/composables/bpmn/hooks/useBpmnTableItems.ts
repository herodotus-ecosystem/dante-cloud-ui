import { watch, onMounted } from 'vue';

import type {
  BpmnQueryByGetService,
  BpmnSortable,
  BpmnListEntity,
  BpmnListQueryParams,
  BpmnDeleteQueryParams,
  Page,
  QTableOnRequestProps,
  QTableOnRequestParameter,
} from '@/lib/declarations';

import { toast, standardDeleteNotify } from '@herodotus-cloud/core';

import { useBaseTable } from '@/composables/hooks';

export default function useBpmnTableItems<
  E extends BpmnListEntity,
  Q extends BpmnListQueryParams,
  S,
  D extends BpmnDeleteQueryParams = BpmnDeleteQueryParams,
>(
  AbstractService: BpmnQueryByGetService<E, Q, S, D>,
  sortable: BpmnSortable<S>,
  queryParams = {} as Q,
  loadOnMount = true,
  name = '',
) {
  const {
    loading,
    tableRows,
    totalPages,
    conditions,
    pagination,
    setPagination,
    showLoading,
    hideLoading,
    toCreate,
    toEdit,
    toAuthorize,
    addRoutePushParam,
  } = useBaseTable<E, Q>(name, 'updateTime', true);

  conditions.value = queryParams;

  const findItemsByPage = (pageNumber = 1, pageSize = 10, params = {} as Q) => {
    showLoading();
    AbstractService.getByPage(
      {
        pageNumber: pageNumber - 1,
        pageSize: pageSize,
        ...sortable,
      },
      params,
    )
      .then((result) => {
        const data = result as Page<E>;
        // 无结果时也要更新列表数据
        if (data) {
          tableRows.value = data.content;
          totalPages.value = data.totalPages;
          pagination.value.rowsNumber = parseInt(data.totalElements, 0);
        } else {
          tableRows.value = [];
          totalPages.value = 0;
          pagination.value.rowsNumber = 0;
        }
        hideLoading();
      })
      .catch(() => {
        hideLoading();
      });
  };

  const findItems: QTableOnRequestProps = (props: QTableOnRequestParameter) => {
    setPagination(props);
    findItemsByPage(pagination.value.page, pagination.value.rowsPerPage, conditions.value);
  };

  const refresh = () => {
    findItems({ pagination: pagination.value, getCellValue: (col: any, row: any) => {} });
  };

  const deleteItemById = (id: string, params = {} as D) => {
    standardDeleteNotify(() => {
      AbstractService.delete(id, params)
        .then((response) => {
          findItemsByPage(pagination.value.page, pagination.value.rowsPerPage);
          toast.success('删除成功');
        })
        .catch(() => {
          toast.error('删除失败');
        });
    });
  };

  const onDeleteItemById = (id: string) => {
    deleteItemById(id);
  };

  onMounted(() => {
    if (loadOnMount) {
      findItems({ pagination: pagination.value, getCellValue: (col: any, row: any) => {} });
    }
  });

  watch(
    () => pagination.value.page,
    (newValue: number) => {
      if (newValue) {
        findItemsByPage(newValue, pagination.value.rowsPerPage, conditions.value);
      }
    },
  );

  watch(conditions, (newValue) => {
    if (newValue) {
      //防止不在第一页时发两遍请求
      if ((pagination.value.page as number) > 1) {
        pagination.value.page = 1;
      } else {
        findItemsByPage(pagination.value.page, pagination.value.rowsPerPage, newValue);
      }
    }
  });

  return {
    pagination,
    tableRows,
    loading,
    totalPages,
    conditions,
    findItemsByPage,
    findItems,
    deleteItemById,
    refresh,
    toCreate,
    toEdit,
    toAuthorize,
    addRoutePushParam,
    onDeleteItemById,
  };
}
