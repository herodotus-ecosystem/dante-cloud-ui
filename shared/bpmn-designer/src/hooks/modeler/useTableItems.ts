import type { Ref } from 'vue';
import { ref, watch, onMounted } from 'vue';

import type {
  BpmnSortable,
  BpmnListEntity,
  BpmnListQueryParams,
  BpmnDeleteQueryParams,
  Page,
  QTableOnRequestParameter,
  QTablePaginationProps,
  QTableOnRequestProps,
} from '@/declarations';

import { BpmnQueryByGetService } from '@/lib/logic';

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
) {
  const loading = ref(false);
  const tableRows = ref([]) as Ref<E[]>;
  const totalPages = ref(0);
  const conditions = ref(queryParams) as Ref<Q>;
  const pagination = ref<QTablePaginationProps>({
    sortBy: 'updateTime',
    descending: true,
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 0,
  });

  const findItemsByPage = (pageNumber = 1, pageSize = 10, params = {} as Q) => {
    loading.value = true;
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
        if (data) {
          tableRows.value = data.content;
          totalPages.value = data.totalPages;
          pagination.value.rowsNumber = parseInt(data.totalElements, 0);
        }
        loading.value = false;
      })
      .catch(() => {
        loading.value = false;
      });
  };

  const findItems: QTableOnRequestProps = (props: QTableOnRequestParameter): void => {
    const { page, rowsPerPage, sortBy, descending } = props.pagination;
    pagination.value.page = page;
    pagination.value.rowsPerPage = rowsPerPage;
    pagination.value.sortBy = sortBy;
    pagination.value.descending = descending;
    findItemsByPage(pagination.value.page, pagination.value.rowsPerPage, conditions.value);
  };

  onMounted(() => {
    if (loadOnMount) {
      // @ts-ignore
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

  watch(
    conditions,
    (newValue) => {
      if (newValue) {
        //防止不在第一页时发两遍请求
        if ((pagination.value.page as number) > 1) {
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
    findItemsByPage,
    findItems,
  };
}
