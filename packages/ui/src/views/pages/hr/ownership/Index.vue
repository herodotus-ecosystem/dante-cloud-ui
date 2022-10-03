<template>
  <q-card>
    <h-row gutter="md" gutter-col horizontal>
      <h-column lg="3" md="3" sm="6" xs="12">
        <h-organization-tree v-model:selected="organizationId"></h-organization-tree>
      </h-column>
      <h-column lg="3" md="3" sm="6" xs="12">
        <h-department-tree v-model:selected="departmentId" :organizationId="organizationId"></h-department-tree>
      </h-column>
      <h-column lg="6" md="6" sm="6" xs="12">
        <h-table
          :rows="tableRows"
          :columns="columns"
          :row-key="rowKey"
          selection="single"
          v-model:selected="selected"
          v-model:pagination="pagination"
          v-model:pageNumber="pagination.page"
          :totalPages="totalPages"
          :loading="loading"
          @request="findItems">
          <template #top-left>
            <q-btn v-if="isShowOperation" color="primary" label="配置人员归属" @click="toAllocatable" />
          </template>

          <template #body-cell-identity="props">
            <q-td key="identity" :props="props">
              {{ parseIdentity(props.row) }}
            </q-td>
          </template>

          <template #body-cell-actions="props">
            <q-td key="actions" :props="props">
              <h-delete-button tooltip="删除归属" @click="deleteAllocatable(props.row)"></h-delete-button>
            </q-td>
          </template>
        </h-table>
      </h-column>
    </h-row>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch, computed } from 'vue';
import type { QTableProps } from 'quasar';
import type { SysEmployee, Page, QTableRequestProp, Sort } from '/@/lib/declarations';

import { useRouter } from 'vue-router';
import { OperationEnum } from '/@/lib/enums';

import { useHrApi } from '/@/apis';
import { useEmployeeDisplay } from '/@/hooks';
import { useRouteStore } from '/@/stores';

import { HDeleteButton, HDepartmentTree, HTable, HOrganizationTree } from '/@/components';

export default defineComponent({
  name: 'SysOwnership',

  components: {
    HDeleteButton,
    HDepartmentTree,
    HTable,
    HOrganizationTree
  },

  setup(props) {
    const organizationId = ref('');
    const departmentId = ref('');
    const loading = ref(false);
    const pagination = ref({
      sortBy: 'updateTime',
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0
    });
    const tableRows = ref([]) as Ref<Array<SysEmployee>>;
    const totalPages = ref(0);
    const selected = ref([]);
    const rowKey = 'employeeId' as keyof SysEmployee;
    const router = useRouter();
    const store = useRouteStore();

    const { parseIdentity } = useEmployeeDisplay();

    const columns: QTableProps['columns'] = [
      { name: 'employeeName', field: 'employeeName', align: 'center', label: '姓名' },
      { name: 'identity', field: 'identity', align: 'center', label: '身份' },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' }
    ];

    const api = useHrApi();
    const sort = {} as Sort;

    const fetchAssignedByPage = (pageNumber = 1, pageSize: number, departmentId: string) => {
      api.employee
        .fetchAssignedByPage(
          {
            pageNumber: pageNumber - 1,
            pageSize: pageSize,
            ...sort
          },
          { departmentId }
        )
        .then(result => {
          const data = result.data as Page<SysEmployee>;
          loading.value = false;
          tableRows.value = data.content;
          totalPages.value = data.totalPages;
          pagination.value.rowsNumber = parseInt(data.totalElements, 0);
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
      fetchAssignedByPage(pagination.value.page, pagination.value.rowsPerPage, departmentId.value);
    };

    const deleteAllocatable = (item: SysEmployee) => {
      api.employee
        .deleteAllocatable({
          organizationId: organizationId.value,
          departmentId: departmentId.value,
          employeeId: item.employeeId
        })
        .then(() => {
          fetchAssignedByPage(pagination.value.page, pagination.value.rowsPerPage, departmentId.value);
        });
    };

    watch(
      () => departmentId.value,
      newValue => {
        fetchAssignedByPage(pagination.value.page, pagination.value.rowsPerPage, newValue);
      }
    );

    watch(
      () => pagination.value.page,
      newValue => {
        fetchAssignedByPage(newValue, pagination.value.rowsPerPage, departmentId.value);
      }
    );

    const isShowOperation = computed(() => {
      return organizationId.value && departmentId.value;
    });

    const toAllocatable = () => {
      const routeName = 'SysOwnershipContent';
      store.addRoutePushParam(routeName, {
        item: JSON.stringify({ organizationId: organizationId.value, departmentId: departmentId.value }),
        operation: OperationEnum.AUTHORIZE
      });
      router.push({ name: routeName });
    };

    return {
      rowKey,
      organizationId,
      departmentId,
      tableRows,
      columns,
      pagination,
      selected,
      loading,
      totalPages,
      findItems,
      deleteAllocatable,
      parseIdentity,
      toAllocatable,
      isShowOperation
    };
  }
});
</script>
