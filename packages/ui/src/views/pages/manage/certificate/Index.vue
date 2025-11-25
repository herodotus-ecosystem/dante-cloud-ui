<template>
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
    status
    reserved
    @request="findItems"
  >
    <template #top-left>
      <h-button color="primary" label="新建证书" @click="toCreate" />
    </template>

    <template #body-cell-keystoreName="props">
      <q-td key="keystoreName" :props="props">
        <h-button
          :label="props.row.keystoreName"
          tooltip="点击下载"
          color="primary"
          flat
          no-caps
          @click="onDownload(props.row.bucketName, props.row.keystoreName)"
        ></h-button>
      </q-td>
    </template>

    <template #body-cell-pemName="props">
      <q-td key="pemName" :props="props">
        <h-button
          v-if="props.row.pemName"
          :label="props.row.pemName"
          color="primary"
          flat
          no-caps
          tooltip="点击下载"
          @click="onDownload(props.row.bucketName, props.row.pemName)"
        ></h-button>
      </q-td>
    </template>

    <template #body-cell-distinguishedName="props">
      <q-td key="distinguishedName" :props="props">
        <h-dense-icon-button
          color="info"
          icon="mdi-information-variant-box"
          :tooltip="props.row.distinguishedName"
        ></h-dense-icon-button>
      </q-td>
    </template>

    <template #body-cell-actions="props">
      <q-td key="actions" :props="props">
        <h-delete-button
          v-if="!props.row.reserved"
          @click="deleteItemById(props.row[rowKey])"
        ></h-delete-button>
      </q-td>
    </template>
  </h-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type {
  MgtCertificateEntity,
  MgtCertificateConditions,
  MgtCertificateProps,
  QTableColumnProps,
} from '@/lib/declarations';

import { CONSTANTS, API } from '@/configurations';

import { useTable } from '@/hooks';

import { HDeleteButton, HTable } from '@/components';
import { useOssDownload } from '@/composables/oss';

export default defineComponent({
  name: CONSTANTS.ComponentName.MGT_CERTIFICATE,

  components: { HDeleteButton, HTable },

  setup() {
    const {
      tableRows,
      totalPages,
      pagination,
      loading,
      toEdit,
      toCreate,
      toAuthorize,
      findItems,
      deleteItemById,
    } = useTable<MgtCertificateEntity, MgtCertificateConditions>(
      API.core.mgtCertificate(),
      CONSTANTS.ComponentName.MGT_CERTIFICATE,
    );
    const { download } = useOssDownload();

    const selected = ref([]);
    const rowKey: MgtCertificateProps = 'certId';

    const columns: QTableColumnProps = [
      { name: 'alias', field: 'alias', align: 'center', label: '证书名称' },
      {name: 'certificateCategory',field: 'certificateCategory',align: 'center',label: '证书类别',},
      { name: 'commonName', field: 'commonName', align: 'center', label: '公共名称' },
      { name: 'distinguishedName', field: 'distinguishedName', align: 'center', label: '区分名' },
      { name: 'startTime', field: 'startTime', align: 'center', label: '开始时间' },
      { name: 'endTime', field: 'endTime', align: 'center', label: '结束时间' },
      { name: 'password', field: 'password', align: 'center', label: '密码' },
      { name: 'bucketName', field: 'bucketName', align: 'center', label: '存储桶名称' },
      { name: 'keystoreName', field: 'keystoreName', align: 'center', label: 'KeyStore' },
      { name: 'pemName', field: 'pemName', align: 'center', label: 'PEM' },
      { name: 'description', field: 'description', align: 'center', label: '备注' },
      { name: 'reserved', field: 'reserved', align: 'center', label: '保留数据' },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' },
    ];

    const onDownload = (bucketName: string, objectName: string) => {
      download(bucketName, objectName);
    };

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
      findItems,
      deleteItemById,
      onDownload,
    };
  },
});
</script>
