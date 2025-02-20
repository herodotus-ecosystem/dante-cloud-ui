import type { Ref } from 'vue';
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import type {
  BpmnQueryByGetService,
  BpmnSortable,
  BpmnListEntity,
  BpmnListQueryParams,
  BpmnDeleteQueryParams,
  Page,
  QTableRequestProp,
} from '@/lib/declarations';

import { OperationEnum } from '@/lib/enums';
import { useRouteStore } from '@/stores';
import { Swal, toast, standardDeleteNotify } from '@/lib/utils';

export default function useBpmnTableItems<
  E extends BpmnListEntity,
  Q extends BpmnListQueryParams,
  S,
  D extends BpmnDeleteQueryParams = BpmnDeleteQueryParams,
>(
  baseService: BpmnQueryByGetService<E, Q, S, D>,
  sortable: BpmnSortable<S>,
  queryParams = {} as Q,
  loadOnMount = true,
) {
  const loading = ref(false);
  const tableRows = ref([]) as Ref<E[]>;
  const totalPages = ref(0);
  const conditions = ref(queryParams) as Ref<Q>;
  const pagination = ref({
    sortBy: 'updateTime',
    descending: true,
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 0,
  });

  const findItemsByPage = (pageNumber = 1, pageSize = 10, params = {} as Q) => {
    loading.value = true;
    baseService
      .getByPage(
        {
          pageNumber: pageNumber,
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
        loading.value = false;
      })
      .catch(() => {
        loading.value = false;
      });
  };

  const findItems = (props: QTableRequestProp) => {
    const { page, rowsPerPage, sortBy, descending } = props.pagination;
    pagination.value.page = page;
    pagination.value.rowsPerPage = rowsPerPage;
    pagination.value.sortBy = sortBy;
    pagination.value.descending = descending;
    findItemsByPage(pagination.value.page, pagination.value.rowsPerPage, conditions.value);
  };

  const refresh = () => {
    findItems({ pagination: pagination.value });
  };

  const deleteItemById = (id: string, params = {} as D) => {
    standardDeleteNotify(() => {
      baseService
        .delete(id, params)
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

  const router = useRouter();
  const store = useRouteStore();

  const toEdit = (item: E) => {
    const routeName = name + 'Content';
    store.addRoutePushParam(routeName, {
      item: JSON.stringify(item),
      operation: OperationEnum.EDIT,
    });
    router.push({ name: routeName });
  };

  const toCreate = () => {
    const routeName = name + 'Content';
    store.addRoutePushParam(routeName, {
      item: JSON.stringify({}),
      operation: OperationEnum.CREATE,
    });
    router.push({ name: routeName });
  };

  const toAuthorize = (item: E) => {
    const routeName = name + 'Authorize';
    store.addRoutePushParam(routeName, {
      item: JSON.stringify(item),
      operation: OperationEnum.AUTHORIZE,
    });
    router.push({ name: routeName });
  };

  onMounted(() => {
    if (loadOnMount) {
      findItems({ pagination: pagination.value });
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
      if (pagination.value.page > 1) {
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
    onDeleteItemById,
  };
}
