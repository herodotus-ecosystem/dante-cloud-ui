<template>
  <div>
    <h-table
      :rows="tableRows"
      :columns="columns"
      :row-key="rowKey"
      selection="multiple"
      v-model:selected="selected"
      :loading="loading"
      :show-all="true"
      status
      reserved
    >
      <template #top-left>
        <h-button
          color="green"
          label="大文件上传"
          icon="mdi-cloud-upload"
          @click="openChunkUploadDialog = true"
        />
        <h-button
          color="primary"
          label="上传"
          icon="mdi-cloud-upload"
          class="q-ml-sm"
          @click="openSimpleUploadDialog = true"
        />
        <h-button
          color="red"
          label="批量删除"
          icon="mdi-delete-forever"
          :disable="isDisableBatchDelete"
          class="q-ml-sm"
          @click="onBatchDeleteObjects()"
        />
      </template>
      <template #body-cell-actions="props">
        <q-td key="actions" :props="props">
          <h-dense-icon-button
            color="secondary"
            icon="mdi-download-box"
            tooltip="下载"
            @click="onDownload(props.row)"
          ></h-dense-icon-button>
          <h-dense-icon-button
            v-if="!props.row.dir"
            color="black"
            icon="mdi-cog-outline"
            tooltip="详情"
            @click="toSetting(props.row)"
          ></h-dense-icon-button>
          <h-dense-icon-button
            v-if="props.row.dir"
            color="orange"
            icon="mdi-folder-open"
            tooltip="打开"
            @click="toFolder(props.row)"
          ></h-dense-icon-button>
          <h-delete-button tooltip="删除" @click="onDelete(props.row)"></h-delete-button>
        </q-td>
      </template>
    </h-table>
    <h-dialog
      v-model="openChunkUploadDialog"
      title="分片上传"
      hide-confirm
      hide-cancel
      @close="onFinishChunkUpload"
    >
      <h-chunk-uploader v-model="bucketName"></h-chunk-uploader>
    </h-dialog>
    <h-dialog
      v-model="openSimpleUploadDialog"
      title="文件上传"
      hide-confirm
      hide-cancel
      @close="onFinishSimpleUpload"
    >
      <h-simple-uploader
        v-model="hasNewUploadedFiles"
        :bucket-name="bucketName"
      ></h-simple-uploader>
    </h-dialog>
  </div>
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { defineComponent, ref, computed } from 'vue';
import { format, useQuasar } from 'quasar';

import type {
  AxiosProgressEvent,
  QNotifyPosition,
  QTableColumnProps,
  ObjectDomain,
  ObjectDomainProps,
  ObjectDomainConditions,
  ObjectListingDomain,
  DeleteObjectDomain,
} from '/@/lib/declarations';

import {
  HDeleteButton,
  HDenseIconButton,
  HTable,
  HChunkUploader,
  HSimpleUploader,
} from '/@/components';
import { useBaseTable } from '/@/hooks';
import { ComponentNameEnum } from '/@/lib/enums';
import { ossApi, lodash, toast, standardDeleteNotify } from '/@/lib/utils';

export default defineComponent({
  name: 'HOssObjectList',

  components: {
    HDeleteButton,
    HDenseIconButton,
    HTable,
    HChunkUploader,
    HSimpleUploader,
  },

  props: {
    bucketName: { type: String, required: true },
    folderName: { type: String, default: '' },
    version: { type: Number },
  },

  setup(props) {
    const { humanStorageSize } = format;
    const $q = useQuasar();
    const { tableRows, loading, toEdit, toAuthorize, hideLoading, showLoading } = useBaseTable<
      ObjectDomain,
      ObjectDomainConditions
    >(ComponentNameEnum.OSS_OBJECT, '', false, true);

    const columns: QTableColumnProps = [
      {
        name: 'objectName',
        field: 'objectName',
        align: 'center',
        label: '文件名',
        format: (value) => (value ? displayedObjectName(value) : ''),
      },
      { name: 'etag', field: 'etag', align: 'center', label: 'ETAG' },
      {
        name: 'size',
        field: 'size',
        align: 'center',
        label: '大小',
        format: (value) => (value ? humanStorageSize(Number(value)) : ''),
      },
      { name: 'lastModified', field: 'lastModified', align: 'center', label: '最后更新时间' },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' },
    ];

    const rowKey: ObjectDomainProps = 'objectName';
    const selected = ref([]) as Ref<Array<ObjectDomain>>;

    const openChunkUploadDialog = ref<boolean>(false);
    const openSimpleUploadDialog = ref<boolean>(false);
    const hasNewUploadedFiles = ref<boolean>(false);
    const loadProgress = ref<number>(0);

    const isDisableBatchDelete = computed(() => {
      return lodash.isEmpty(selected.value);
    });

    const isShowOpenFolderAction = computed(() => (isDir: boolean) => {
      return isDir && !props.folderName;
    });

    const fetchObjects = (bucketName: string, folderName = '') => {
      showLoading();
      ossApi
        .object()
        .listObjects({ bucketName: bucketName, prefix: folderName })
        .then((result) => {
          const data = result.data as ObjectListingDomain;
          tableRows.value = data ? data.summaries : [];
          hideLoading();
        })
        .catch(() => {
          hideLoading();
        });
    };

    /**
     * ObjectDomain 数组转换为 DeleteObjectDomain 数组
     * @param objects Table 中已选择的 ObjectDomain
     * @returns DeleteObjectDomain
     */
    const toDeleteObjectDomain = (objects: Array<ObjectDomain>): Array<DeleteObjectDomain> => {
      const deleteObjects = objects.map((object) => {
        const deleteObject: DeleteObjectDomain = { objectName: object.objectName };
        return deleteObject;
      });
      return deleteObjects;
    };

    const displayedObjectName = (realObjectName: string) => {
      if (lodash.endsWith(realObjectName, '/')) {
        return lodash.trimEnd(realObjectName, '/');
      } else {
        if (realObjectName.indexOf('/') !== -1) {
          const names = lodash.split(realObjectName, '/');
          return names[names.length - 1];
        } else {
          return realObjectName;
        }
      }
    };

    /**
     * 批量删除对象
     * @param bucketName 存储桶名称
     * @param objects 选中的、待删除对象
     * @param onSuccess 删除成功操作
     */
    const batchDeleteObjects = (
      bucketName: string,
      objects: Array<ObjectDomain>,
      onSuccess: () => void,
    ) => {
      standardDeleteNotify(() => {
        ossApi
          .object()
          .batchDelete({ bucketName: bucketName, objects: toDeleteObjectDomain(objects) })
          .then(() => {
            toast.success('删除成功');
            onSuccess();
          })
          .catch((error) => {
            if (error.message) {
              toast.error(error.message);
            } else {
              toast.error('删除失败');
            }
          });
      });
    };

    /**
     * 单独删除对象
     * @param bucketName 存储桶名称
     * @param objectName 对象名称
     * @param onSuccess 删除成功后操作
     */
    const deleteObject = (bucketName: string, objectName: string, onSuccess: () => void) => {
      standardDeleteNotify(() => {
        ossApi
          .object()
          .delete({ bucketName: bucketName, objectName: objectName })
          .then(() => {
            toast.success('删除成功');
            onSuccess();
          })
          .catch((error) => {
            if (error.message) {
              toast.error(error.message);
            } else {
              toast.error('删除失败');
            }
          });
      });
    };

    const toFolder = (item: ObjectDomain) => {
      toEdit(item, { bucketName: props.bucketName });
    };

    const toSetting = (item: ObjectDomain) => {
      toAuthorize(item, { bucketName: props.bucketName });
    };

    /**
     * 查询数据操作
     */
    const onFetchObjects = () => {
      fetchObjects(props.bucketName, props.folderName);
    };

    /**
     * 批量删除对象操作
     */
    const onBatchDeleteObjects = () => {
      batchDeleteObjects(props.bucketName, selected.value, () => {
        onFetchObjects();
      });
    };

    /**
     * 删除对象操作
     * @param item 选中的对象条目实体
     */
    const onDelete = (item: ObjectDomain) => {
      deleteObject(props.bucketName, item.objectName, () => {
        onFetchObjects();
      });
    };

    /**
     * 下载对象文件
     * @param bucketName 存储桶名称
     * @param objectName 对象名称
     */
    const download = (bucketName: string, objectName: string, size: number) => {
      showDownLoadProgress('下载');
      ossApi
        .objectStream()
        .download(
          { bucketName: bucketName, objectName: objectName },
          (progressEvent: AxiosProgressEvent) => {
            loadProgress.value = (progressEvent.loaded / size) * 100;
          },
        )
        .then((response) => {
          const data = response as Blob;
          const blob = new Blob([data], { type: 'application/x-download' });
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

    const showDownLoadProgress = (label: string, position: QNotifyPosition = 'center') => {
      loadProgress.value = 0;
      const notify = $q.notify({
        group: false,
        timeout: 0,
        spinner: true,
        position: position,
        message: `文件${label}中...`,
        caption: '0%',
      });

      const interval = setInterval(() => {
        // we update the dialog
        notify({
          caption: `${loadProgress.value}%`,
        });

        if (loadProgress.value === 100) {
          notify({
            type: 'positive',
            icon: 'done',
            spinner: false,
            message: `${label}完成!`,
            timeout: 2000,
          });
          clearInterval(interval);
          loadProgress.value = 0;
        }
      }, 500);
    };

    const onDownload = (item: ObjectDomain) => {
      download(props.bucketName, item.objectName, item.size);
    };

    const onFinishSimpleUpload = () => {
      if (hasNewUploadedFiles.value) {
        onFetchObjects();
      }
    };

    const onFinishChunkUpload = () => {
      onFetchObjects();
    };

    watch(
      () => props.version,
      () => {
        onFetchObjects();
      },
    );

    onMounted(() => {
      onFetchObjects();
    });

    return {
      tableRows,
      columns,
      rowKey,
      selected,
      loading,
      openChunkUploadDialog,
      openSimpleUploadDialog,
      hasNewUploadedFiles,
      isDisableBatchDelete,
      isShowOpenFolderAction,
      toFolder,
      toSetting,
      onDownload,
      onBatchDeleteObjects,
      onDelete,
      onFinishChunkUpload,
      onFinishSimpleUpload,
    };
  },
});
</script>
