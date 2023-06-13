import { defineStore } from 'pinia';
import { reactive, toRefs, computed } from 'vue';

import type { BucketSettingBusiness, ObjectSettingBusiness } from '/@/lib/declarations';
import { ThemeModeEnum, LayoutModeEnum } from '/@/lib/enums';
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
    isBucketSelected: state => !lodash.isEmpty(state.bucketName)
  },

  actions: {
    async loadBucketSetting(bucketName: string) {
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
