<template>
  <q-card>
    <h-row gutter="md" gutter-col horizontal>
      <h-column lg="2" md="2" sm="6" xs="12">
        <h-oss-bucket-list @fetch="onFetchObjects"></h-oss-bucket-list>
      </h-column>
      <h-column lg="10" md="10" sm="6" xs="12">
        <h-table
          :rows="tableRows"
          :columns="columns"
          :row-key="rowKey"
          selection="multiple"
          v-model:selected="selected"
          :loading="loading"
          :show-all="true"
          status
          reserved>
          <template #top-left>
            <h-button
              color="green"
              label="大文件上传"
              icon="mdi-cloud-upload"
              :disable="isDisableOperations"
              @click="openDialog = true" />
            <h-button
              color="primary"
              label="上传"
              icon="mdi-cloud-upload"
              class="q-ml-sm"
              :disable="isDisableOperations"
              @click="onUpload" />
            <h-button
              color="red"
              label="批量删除"
              icon="mdi-delete-forever"
              :disable="isDisableBatchDelete"
              class="q-ml-sm"
              @click="onBatchDelete" />
          </template>
          <template #body-cell-actions="props">
            <q-td key="actions" :props="props">
              <h-dense-icon-button
                color="secondary"
                icon="mdi-download-box"
                tooltip="下载"
                @click="onDownload(props.row)"></h-dense-icon-button>
              <h-dense-icon-button
                color="black"
                icon="mdi-cog-outline"
                tooltip="详情"
                @click="toSetting(props.row)"></h-dense-icon-button>
              <h-delete-button tooltip="删除" @click="onDelete(props.row)"></h-delete-button>
            </q-td>
          </template>
        </h-table>
      </h-column>
    </h-row>
    <h-dialog v-model="openDialog" v-model:loading="dialogLoading" title="高级上传" hide-save>
      <h-multipart-uploader v-model="bucketName"></h-multipart-uploader>
    </h-dialog>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';
import { format } from 'quasar';
import type {
  HttpResult,
  ObjectDomain,
  ObjectConditions,
  ObjectDomainProps,
  QTableColumnProps,
  DeleteObjectDomain,
  DeleteErrorDomain
} from '/@/lib/declarations';

import { useOssStore } from '/@/stores';
import { ComponentNameEnum } from '/@/lib/enums';
import { api, lodash, toast, standardDeleteNotify } from '/@/lib/utils';
import { useBaseTableItems } from '/@/hooks';

import { HDenseIconButton, HDeleteButton, HTable, HOssBucketList, HMultipartUploader } from '/@/components';

export default defineComponent({
  name: ComponentNameEnum.OSS_OBJECT,

  components: {
    HDeleteButton,
    HDenseIconButton,
    HTable,
    HOssBucketList,
    HMultipartUploader
  },

  setup(props) {
    const oss = useOssStore();
    const { humanStorageSize } = format;

    const bucketName = ref<string>('');

    const { tableRows, totalPages, pagination, loading, toAuthorize, hideLoading, showLoading } = useBaseTableItems<
      ObjectDomain,
      ObjectConditions
    >(ComponentNameEnum.OSS_OBJECT, '', false, true);

    const selected = ref([]) as Ref<Array<ObjectDomain>>;
    const rowKey: ObjectDomainProps = 'objectName';

    const columns: QTableColumnProps = [
      { name: 'objectName', field: 'objectName', align: 'center', label: '文件名' },
      { name: 'etag', field: 'etag', align: 'center', label: 'ETAG' },
      {
        name: 'size',
        field: 'size',
        align: 'center',
        label: '大小',
        format: value => humanStorageSize(value)
      },
      { name: 'lastModified', field: 'lastModified', align: 'center', label: '最后更新时间' },
      { name: 'latest', field: 'latest', align: 'center', label: '是否最新' },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' }
    ];

    const openDialog = ref<boolean>(false);
    const dialogLoading = ref<boolean>(false);

    const fetchObjects = (bucketName: string) => {
      showLoading();
      oss
        .fetchObjectList(bucketName)
        .then(result => {
          const data = result.data as Array<ObjectDomain>;
          tableRows.value = data ? data : [];
          hideLoading();
        })
        .catch(() => {
          hideLoading();
        });
    };

    const deleteObject = (bucketName: string, objectName: string) => {
      api
        .ossObject()
        .delete({ bucketName: bucketName, objectName: objectName })
        .then(() => {
          toast.success('删除成功');
          fetchObjects(bucketName);
        })
        .catch(error => {
          if (error.message) {
            toast.error(error.message);
          } else {
            toast.error('删除失败');
          }
        });
    };

    const batchDeleteObjects = (bucketName: string, items: Array<ObjectDomain>) => {
      const selectedObjects = items.map(item => {
        const deleteObject: DeleteObjectDomain = { name: item.objectName };
        return deleteObject;
      });

      api
        .ossObject()
        .batchDelete({ bucketName: bucketName, objects: selectedObjects })
        .then(() => {
          toast.success('删除成功');
          fetchObjects(bucketName);
        })
        .catch(error => {
          if (error.message) {
            toast.error(error.message);
          } else {
            toast.error('删除失败');
          }
        });
    };

    const download = (bucketName: string, objectName: string) => {
      api
        .ossObjectStream()
        .download({ bucketName: bucketName, objectName: objectName })
        .then(response => {
          const data = response as Blob;
          let blob = new Blob([data], { type: 'application/x-download' });
          // 创建元素
          const link = document.createElement('a');
          link.style.display = 'none';
          // 创建下载的链接
          link.href = URL.createObjectURL(blob);
          // 给下载后的文件命名
          link.setAttribute('download', objectName);
          document.body.appendChild(link);
          // 点击下载
          link.click();
          // 下载完成移除元素
          document.body.removeChild(link);
          // 释放掉blob对象
          window.URL.revokeObjectURL(link.href);
        })
        .catch(() => {
          toast.error('下载失败');
        });
    };

    const isDisableOperations = computed(() => {
      return !oss.isBucketSelected || lodash.isEmpty(tableRows.value);
    });

    const isDisableBatchDelete = computed(() => {
      return lodash.isEmpty(selected.value);
    });

    const toSetting = (item: ObjectDomain) => {
      showLoading();
      oss.objectName = item.objectName;
      oss.loadObjectSetting();
      hideLoading();
      toAuthorize(item);
    };

    const onFetchObjects = () => {
      fetchObjects(oss.bucketName);
    };

    const onDelete = (item: ObjectDomain) => {
      standardDeleteNotify(() => {
        deleteObject(oss.bucketName, item.objectName);
      });
    };

    const onBatchDelete = () => {
      standardDeleteNotify(() => {
        batchDeleteObjects(oss.bucketName, selected.value);
      });
    };

    const onDownload = (item: ObjectDomain) => {
      download(oss.bucketName, item.objectName);
    };

    const onUpload = () => {};

    return {
      rowKey,
      tableRows,
      columns,
      pagination,
      selected,
      loading,
      totalPages,
      bucketName,
      isDisableOperations,
      isDisableBatchDelete,
      openDialog,
      dialogLoading,
      toSetting,
      onFetchObjects,
      onDelete,
      onBatchDelete,
      onDownload,
      onUpload
    };
  }
});
</script>
