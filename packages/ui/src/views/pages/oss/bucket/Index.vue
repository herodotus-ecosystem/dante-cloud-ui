<template>
  <h-table
    :rows="tableRows"
    :columns="columns"
    :row-key="rowKey"
    selection="single"
    v-model:selected="selected"
    :loading="loading"
    :show-all="true"
    status
    reserved>
    <template #top-left>
      <h-button color="primary" label="新建Bucket" @click="toCreate" />
    </template>

    <template #body-cell-actions="props">
      <q-td key="actions" :props="props">
        <h-delete-button v-if="!props.row.reserved" @click="remove(props.row[rowKey])"></h-delete-button>
      </q-td>
    </template>
  </h-table>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

import type {
  BucketResponse,
  BucketConditions,
  BucketResponseProps,
  QTableColumnProps,
  SweetAlertResult,
  HttpResult
} from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';
import { api, moment, Swal, toast } from '/@/lib/utils';

import { useBaseTableItems } from '/@/hooks';

import { HDeleteButton, HTable } from '/@/components';

export default defineComponent({
  name: ComponentNameEnum.OSS_BUCKET,

  components: { HDeleteButton, HTable },

  setup() {
    const { tableRows, totalPages, pagination, loading, toEdit, toCreate, toAuthorize, hideLoading, showLoading } =
      useBaseTableItems<BucketResponse, BucketConditions>(ComponentNameEnum.OSS_BUCKET, '', false, true);

    const selected = ref([]);
    const rowKey: BucketResponseProps = 'name';

    const columns: QTableColumnProps = [
      { name: 'name', field: 'name', align: 'center', label: 'Bucket名称' },
      {
        name: 'creationDate',
        field: 'creationDate',
        align: 'center',
        label: '创建时间',
        format: value => (value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '')
      },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' }
    ];

    const list = () => {
      api
        .ossBucket()
        .list()
        .then(result => {
          const data = result.data as Array<BucketResponse>;
          tableRows.value = data;
          hideLoading();
        })
        .catch(() => {
          hideLoading();
        });
    };

    const remove = (bucketName: string) => {
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
            .ossBucket()
            .remove({ bucketName: bucketName })
            .then(response => {
              const result = response as HttpResult<boolean>;
              if (result.message) {
                toast.success(result.message);
              } else {
                toast.success('删除成功');
              }

              list();
            })
            .catch(() => {
              toast.error('删除失败');
            });
        }
      });
    };

    onMounted(() => {
      list();
    });

    return {
      rowKey,
      selected,
      pagination,
      columns,
      tableRows,
      totalPages,
      loading,
      toCreate,
      toEdit,
      toAuthorize,
      remove
    };
  }
});
</script>
