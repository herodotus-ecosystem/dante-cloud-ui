import type { Page, Domain, Conditions, HttpResult, AbstractService } from '@herodotus-cloud/core';

import type {
  Sort,
  QTableOnRequestProps,
  QTableOnRequestParameter,
} from '@/composables/declarations';

import { toast, standardDeleteNotify } from '@herodotus-cloud/core';
import { isEmpty, pickBy } from 'lodash-es';
import useBaseTable from './useBaseTable';

export default function useTable<C extends Conditions, I extends Domain, O extends Domain = I>(
  service: AbstractService<I, O>,
  name: string,
  isFetchAll = false,
  sort = {} as Sort,
  loadOnMount = true,
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
    toInfo,
  } = useBaseTable<C, I, O>(name, 'updateTime', isFetchAll);

  const findItems: QTableOnRequestProps = (props: QTableOnRequestParameter) => {
    if (isFetchAll) {
      findAllItems();
    } else {
      setPagination(props);
      findItemsByPage(pagination.value.page, pagination.value.rowsPerPage, conditions.value);
    }
  };

  const findAllItems = () => {
    showLoading();
    service
      .fetchAll({
        ...sort,
        ...conditions.value,
      })
      .then((result) => {
        const data = result.data as Array<O>;

        if (!isEmpty(data)) {
          tableRows.value = data;
          pagination.value.rowsNumber = data.length;
        } else {
          tableRows.value = [];
        }
        hideLoading();
      })
      .catch((error) => {
        hideLoading();
      });
  };

  const findItemsByPage = (pageNumber = 1, pageSize = 10, others = {}) => {
    showLoading();
    const params = pickBy(others);
    service
      .fetchByPage(
        {
          pageNumber: pageNumber - 1,
          pageSize: pageSize,
          ...sort,
        },
        params,
      )
      .then((result) => {
        const data = result.data as Page<O>;
        // 用户文档列表中无结果时也要更新列表数据
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

  const deleteItemById = (id: string) => {
    standardDeleteNotify(() => {
      service
        .delete(id)
        .then((response) => {
          const result = response as HttpResult<string>;
          if (result.message) {
            toast.success(result.message);
          } else {
            toast.success('删除成功');
          }

          findItemsByPage(pagination.value.page, pagination.value.rowsPerPage);
        })
        .catch((error) => {
          if (error.message) {
            toast.error(error.message);
          } else {
            toast.error('删除失败');
          }
        });
    });
  };

  const refresh = () => {
    findItems({ pagination: pagination.value, getCellValue: (col: any, row: any) => {} });
  };

  onMounted(() => {
    if (loadOnMount)
      findItems({ pagination: pagination.value, getCellValue: (col: any, row: any) => {} });
  });

  watch(
    () => pagination.value.page,
    (newValue: number) => {
      if (newValue && !isFetchAll) {
        findItemsByPage(newValue, pagination.value.rowsPerPage, conditions.value);
      }
    },
  );

  watch(
    conditions,
    (newValue) => {
      if (newValue && !isFetchAll) {
        //防止不在第一页时发两遍请求
        if (pagination.value.page > 1) {
          pagination.value.page = 1;
        } else {
          findItemsByPage(pagination.value.page, pagination.value.rowsPerPage, newValue);
        }
      }
    },
    { deep: true },
  );

  return {
    pagination,
    tableRows,
    loading,
    totalPages,
    conditions,
    findItems,
    toCreate,
    toEdit,
    toAuthorize,
    toInfo,
    findItemsByPage,
    deleteItemById,
    refresh,
  };
}
