<template>
  <q-card>
    <h-row gutter="md" gutter-col horizontal>
      <h-column lg="3" md="3" sm="6" xs="12">
        <h-oss-bucket-list v-model="bucketName"></h-oss-bucket-list>
      </h-column>
      <h-column lg="9" md="9" sm="6" xs="12">
        <h-multipart-uploader v-model="bucketName"></h-multipart-uploader>
        <!-- <h-table
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
        </h-table>-->
      </h-column>
    </h-row>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch, computed } from 'vue';

import type {
  SysEmployeeEntity,
  SysEmployeeProps,
  Page,
  Sort,
  QTableColumnProps,
  QTableOnRequestParameter
} from '/@/lib/declarations';

import { useRouter } from 'vue-router';
import { OperationEnum } from '/@/lib/enums';
import { api } from '/@/lib/utils';
import { useEmployeeDisplay } from '/@/hooks';
import { useRouteStore } from '/@/stores';

import { HDeleteButton, HTable, HOssBucketList, HMultipartUploader } from '/@/components';

export default defineComponent({
  name: 'SysOwnership',

  components: {
    HDeleteButton,
    HTable,
    HOssBucketList,
    HMultipartUploader
  },

  setup(props) {
    const bucketName = ref<string>('');

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
    const tableRows = ref([]) as Ref<Array<SysEmployeeEntity>>;
    const totalPages = ref(0);
    const selected = ref([]);
    const rowKey: SysEmployeeProps = 'employeeId';
    const router = useRouter();
    const store = useRouteStore();

    const { parseIdentity } = useEmployeeDisplay();

    const columns: QTableColumnProps = [
      { name: 'employeeName', field: 'employeeName', align: 'center', label: '姓名' },
      { name: 'identity', field: 'identity', align: 'center', label: '身份' },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' }
    ];

    const sort = {} as Sort;

    

    const isShowOperation = computed(() => {
      return organizationId.value && departmentId.value;
    });

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

      parseIdentity,
      isShowOperation,

      bucketName
    };
  }
});
</script>
