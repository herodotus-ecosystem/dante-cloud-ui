<template>
  <h-simple-center-form-layout
    :entity="editedItem"
    :title="title"
    :operation="operation"
    @save="onSave()"
  >
    <h-text-field
      v-model.lazy="v.editedItem.bucketName.$model"
      name="name"
      label="存储桶名称* "
      placeholder="存储桶名称"
      debounce="5000"
      :error="v.editedItem.bucketName.$error"
      :error-message="
        v.editedItem.bucketName.$errors[0] ? v.editedItem.bucketName.$errors[0].$message : ''
      "
    ></h-text-field>
    <h-text-field
      v-model="region"
      name="region"
      label="区域"
      placeholder="请输入区域"
      disable
    ></h-text-field>
    <div class="column q-mb-sm">
      <h-switch v-model="objectLock" label="是否锁定对象" disable></h-switch>
    </div>
  </h-simple-center-form-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import type { BucketDomain, HttpResult, CreateBucketResult } from '@/lib/declarations';

import { toast } from '@/lib/utils';
import { useBaseTableItem } from '@/hooks';

import { HSimpleCenterFormLayout } from '@/components';
import { API } from '@/configurations';

export default defineComponent({
  name: 'OssBucketContent',

  components: {
    HSimpleCenterFormLayout,
  },

  setup(props) {
    const { editedItem, operation, title, overlay, onFinish } = useBaseTableItem<BucketDomain>();

    const region = ref<string>('');
    const objectLock = ref<boolean>(false);

    const rules = {
      editedItem: {
        bucketName: {
          required: helpers.withMessage('存储桶名称不能为空', required),
        },
      },
    };

    const v = useVuelidate(rules, { editedItem }, { $lazy: true });

    const onSave = () => {
      v.value.$validate().then((vResult) => {
        if (vResult) {
          API.oss
            .bucket()
            .createBucket({
              bucketName: editedItem.value.bucketName,
              objectLockEnabledForBucket: objectLock.value,
            })
            .then((response) => {
              const result = response as HttpResult<CreateBucketResult>;
              overlay.value = false;
              onFinish();
              if (result.message) {
                toast.success(result.message);
              } else {
                toast.success('保存成功');
              }
            })
            .catch(() => {
              overlay.value = false;
              onFinish();
              toast.error('保存失败');
            });
        }
      });
    };

    return {
      editedItem,
      operation,
      title,
      v,
      onSave,
      region,
      objectLock,
    };
  },
});
</script>
