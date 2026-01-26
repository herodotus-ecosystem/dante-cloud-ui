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
    reserved
  >
    <template #top-left>
      <h-button color="primary" label="新建存储桶" @click="toCreate" />
    </template>

    <template #body-cell-actions="props">
      <q-td key="actions" :props="props">
        <!-- <h-dense-icon-button
          color="black"
          icon="mdi-cog-outline"
          tooltip="设置"
          @click="toAuthorize(props.row)"></h-dense-icon-button> -->
        <h-delete-button
          v-if="!props.row.reserved"
          @click="remove(props.row[rowKey])"
        ></h-delete-button>
      </q-td>
    </template>
  </h-table>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

import type {
  HttpResult,
  QTableColumnProps,
  BucketDomain,
  BucketDomainProps,
  BucketDomainConditions,
  DeleteBucketResult,
} from '@/lib/declarations';

import { CONSTANTS, API } from '@/configurations';
import { moment, toast, standardDeleteNotify } from '@/lib/utils';

import { useBaseTable } from '@/composables/hooks';

import { HDeleteButton, HTable, HDenseIconButton } from '@/components';

export default defineComponent({
  name: CONSTANTS.ComponentName.OSS_BUCKET,

  components: { HDeleteButton, HTable, HDenseIconButton },

  setup() {
    const {
      tableRows,
      totalPages,
      pagination,
      loading,
      toEdit,
      toCreate,
      toAuthorize,
      hideLoading,
      showLoading,
    } = useBaseTable<BucketDomain, BucketDomainConditions>(
      CONSTANTS.ComponentName.OSS_BUCKET,
      '',
      false,
      true,
    );

    const selected = ref([]);
    const rowKey: BucketDomainProps = 'bucketName';

    const columns: QTableColumnProps = [
      { name: 'bucketName', field: 'bucketName', align: 'center', label: 'Bucket名称' },
      {
        name: 'creationDate',
        field: 'creationDate',
        align: 'center',
        label: '创建时间',
        format: (value) => (value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : ''),
      },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' },
    ];

    const list = () => {
      API.oss
        .bucket()
        .listBuckets()
        .then((result) => {
          const data = result.data.buckets as Array<BucketDomain>;
          tableRows.value = data;
          hideLoading();
        })
        .catch(() => {
          hideLoading();
        });
    };

    const remove = (bucketName: string) => {
      standardDeleteNotify(() => {
        API.oss
          .bucket()
          .deleteBucket({ bucketName: bucketName })
          .then((response) => {
            const result = response.data as HttpResult<DeleteBucketResult>;
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
      remove,
    };
  },
});
</script>
