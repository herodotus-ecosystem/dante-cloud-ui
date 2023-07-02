import { defineStore } from 'pinia';
import { format } from 'quasar';

import type { BucketSettingBusiness, ObjectSettingBusiness } from '/@/lib/declarations';

import { api, lodash } from '/@/lib/utils';

export const useOssStore = defineStore('OssSettings', {
  state: () => ({
    // 当前存储桶
    bucketName: '',
    // 当前对象
    objectName: '',
    // 当前存储桶设置
    bucketSetting: {} as BucketSettingBusiness,
    // 当前对象设置
    objectSetting: {} as ObjectSettingBusiness
  }),

  getters: {
    isBucketSelected: state => !lodash.isEmpty(state.bucketName),
    isBucketObjectLock: state =>
      !lodash.isEmpty(state.bucketSetting) && !lodash.isEmpty(state.bucketSetting.objectLock) ? '开启' : '关闭',
    bucketQuota: state => {
      const { humanStorageSize } = format;
      return !lodash.isEmpty(state.bucketSetting) && !lodash.isEmpty(state.bucketSetting.quota)
        ? humanStorageSize(state.bucketSetting.quota)
        : 0;
    }
  },

  actions: {
    async loadBucketSetting(bucketName: string) {
      this.$reset();
      const result = await api.ossBucketSetting().get(bucketName);
      this.bucketSetting = result.data;
    },

    async loadObjectSetting() {
      if (this.bucketName && this.objectName) {
        const result = await api.ossObjectSetting().get(this.bucketName, this.objectName);
        this.objectSetting = result.data;
      }
    },

    fetchObjectList(bucketName: string) {
      return api.ossObject().list({ bucketName: bucketName });
    }
  }
});
