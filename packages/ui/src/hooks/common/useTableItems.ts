import { ref, Ref, watch, onMounted } from 'vue';

import type {
  Page,
  Sort,
  Entity,
  Conditions,
  QTableRequestProp,
  BaseService,
  HttpResult,
  SweetAlertResult
} from '/@/lib/declarations';
import { useRouter } from 'vue-router';
import { Swal, toast } from '/@/lib/utils';
import { OperationEnum } from '/@/lib/enums';
import { useRouteStore } from '/@/stores';

export default function useTableItems<T extends Entity, C extends Conditions>(
  baseService: BaseService<T>,
  name: string,
  isFindAll = false,
  sort = {} as Sort,
  loadOnMount = true
) {
  const loading = ref(false);
  const tableRows = ref([]) as Ref<T[]>;
  const totalPages = ref(0);
  const conditions = ref({}) as Ref<C>;
  const pagination = ref({
    sortBy: 'updateTime',
    descending: true,
    page: 1,
    rowsPerPage: isFindAll ? 0 : 10,
    rowsNumber: 0
  });
  const store = useRouteStore();
  const router = useRouter();

  const findItems = (props: QTableRequestProp) => {
    if (isFindAll) {
      findAllItems();
    } else {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      pagination.value.page = page;
      pagination.value.rowsPerPage = rowsPerPage;
      pagination.value.sortBy = sortBy;
      pagination.value.descending = descending;
      findItemsByPage(pagination.value.page, pagination.value.rowsPerPage, conditions.value);
    }
  };

  const findAllItems = () => {
    loading.value = true;
    baseService
      .fetchAll({
        ...sort
      })
      .then(result => {
        const data = result.data as Array<T>;
        tableRows.value = data;
        loading.value = false;
        pagination.value.rowsNumber = data.length;
      })
      .catch(() => {
        loading.value = false;
      });
  };

  const findItemsByPage = (pageNumber = 1, pageSize = 10, others = {}) => {
    loading.value = true;
    baseService
      .fetchByPage(
        {
          pageNumber: pageNumber - 1,
          pageSize: pageSize,
          ...sort
        },
        others
      )
      .then(result => {
        const data = result.data as Page<T>;
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
        loading.value = false;
      })
      .catch(() => {
        loading.value = false;
      });
  };

  const deleteItemById = (id: string) => {
    Swal.fire({
      title: '确定删除?',
      text: '您将无法恢复此操作！',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '是的, 删除!',
      cancelButtonText: '取消'
    }).then((confirm: SweetAlertResult) => {
      if (confirm.value) {
        baseService
          .delete(id)
          .then(response => {
            const result = response as HttpResult<string>;
            if (result.message) {
              toast.success(result.message);
            } else {
              toast.success('删除成功');
            }

            findItemsByPage(pagination.value.page, pagination.value.rowsPerPage);
          })
          .catch(() => {
            toast.error('删除失败');
          });
      }
    });
  };

  const toEdit = (item: T) => {
    const routeName = name + 'Content';
    store.addRoutePushParam(routeName, { item: JSON.stringify(item), operation: OperationEnum.EDIT });
    router.push({ name: routeName });
  };

  const toCreate = () => {
    const routeName = name + 'Content';
    store.addRoutePushParam(routeName, { item: JSON.stringify({}), operation: OperationEnum.CREATE });
    router.push({ name: routeName });
  };

  const toAuthorize = (item: T) => {
    const routeName = name + 'Authorize';
    store.addRoutePushParam(routeName, { item: JSON.stringify(item), operation: OperationEnum.AUTHORIZE });
    router.push({ name: routeName });
  };

  const refresh = () => {
    findItems({ pagination: pagination.value });
  };

  onMounted(() => {
    if (loadOnMount) findItems({ pagination: pagination.value });
  });

  watch(
    () => pagination.value.page,
    (newValue: number) => {
      if (newValue && !isFindAll) {
        findItemsByPage(newValue, pagination.value.rowsPerPage, conditions.value);
      }
    }
  );

  watch(
    conditions,
    newValue => {
      if (newValue && !isFindAll) {
        //防止不在第一页时发两遍请求
        if (pagination.value.page > 1) pagination.value.page = 1;
        else findItemsByPage(pagination.value.page, pagination.value.rowsPerPage, newValue);
      }
    },
    { deep: true }
  );

  return {
    pagination,
    tableRows,
    loading,
    totalPages,
    findItems,
    toCreate,
    toEdit,
    toAuthorize,
    conditions,
    findItemsByPage,
    deleteItemById,
    refresh
  };
}
