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
        <h-edit-button @click="toEdit(props.row)"></h-edit-button>
        <!-- <h-delete-button v-if="!props.row.reserved" @click="deleteItemById(props.row[rowKey])"></h-delete-button> -->
      </q-td>
    </template>
  </h-table>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

import type { BucketResponse, BucketConditions, BucketResponseProps, QTableColumnProps } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';
import { api, moment } from '/@/lib/utils';

import { useTableItems, useBaseTableItems } from '/@/hooks';

import { HDeleteButton, HEditButton, HTable } from '/@/components';

export default defineComponent({
  name: ComponentNameEnum.OSS_BUCKET,

  components: { HDeleteButton, HEditButton, HTable },

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
      toAuthorize
    };
  }
});
</script>
