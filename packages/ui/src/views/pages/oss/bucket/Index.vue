<template>
  <h-table
    :rows="tableRows"
    :columns="columns"
    :row-key="rowKey"
    selection="single"
    v-model:selected="selectedItems"
    v-model:pagination="pagination"
    :loading="loading"
    class="q-mr-md">
    <template #body-cell-actions="props">
      <q-td key="actions" :props="props">
        <h-edit-button @click="toEdit(props.row)"></h-edit-button>
        <h-delete-button @click="remove(props.row.name)"></h-delete-button>
      </q-td>
    </template>
  </h-table>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';

import type { SweetAlertResult } from 'sweetalert2';
import type { Bucket, BucketConditions, HttpResult, QTableProps } from '/@/lib/declarations';

import { toast, Swal, api } from '/@/lib/utils';
import { useTableItems } from '/@/hooks';

export default defineComponent({
  name: 'OssBucket',

  setup(props) {
    const { tableRows, pagination, loading, findItems, toEdit } = useTableItems<Bucket, BucketConditions>(
      api.minioBucket(),
      'OssBucket',
      true
    );

    const columns: QTableProps['columns'] = [
      { name: 'name', field: 'name', align: 'center', label: '名称' },
      { name: 'creationDate', field: 'creationDate', align: 'center', label: '创建时间' },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' }
    ];
    const selectedItems = ref([]) as Ref<Array<Bucket>>;
    const rowKey = 'name' as keyof Bucket;

    const remove = (name: string) => {
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
          api
            .minioBucket()
            .remove({ bucketName: name })
            .then(response => {
              const result = response as HttpResult<string>;
              if (result.message) {
                toast.success(result.message);
              } else {
                toast.success('删除成功');
              }

              findItems({ pagination: pagination.value });
            })
            .catch(() => {
              toast.error('删除失败');
            });
        }
      });
    };

    return {
      tableRows,
      columns,
      pagination,
      selectedItems,
      loading,
      rowKey,
      findItems,
      remove,
      toEdit
    };
  }
});
</script>
