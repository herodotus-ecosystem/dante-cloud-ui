import { ref } from 'vue';
import { useQuasar } from 'quasar';

import type { AxiosProgressEvent, QNotifyPosition } from '@/lib/declarations';

import { toast } from '@/lib/utils';
import { API } from '@/configurations';

export default function useOssDownload() {
  const $q = useQuasar();
  const loadProgress = ref<number>(0);

  const process = (response: Blob, objectName: string) => {
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
  };
  /**
   * 下载对象文件
   * @param bucketName 存储桶名称
   * @param objectName 对象名称
   */
  const download = (bucketName: string, objectName: string, size?: number) => {
    if (size) {
      showDownLoadProgress('下载');
      API.oss
        .object()
        .download(
          { bucketName: bucketName, objectName: objectName },
          (progressEvent: AxiosProgressEvent) => {
            loadProgress.value = (progressEvent.loaded / size) * 100;
          },
        )
        .then((response) => {
          const data = response as Blob;
          process(data, objectName);
        })
        .catch(() => {
          toast.error('下载失败');
        });
    } else {
      API.oss
        .object()
        .download({ bucketName: bucketName, objectName: objectName })
        .then((response) => {
          const data = response as Blob;
          process(data, objectName);
        })
        .catch(() => {
          toast.error('下载失败');
        });
    }
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

  return {
    download,
  };
}
