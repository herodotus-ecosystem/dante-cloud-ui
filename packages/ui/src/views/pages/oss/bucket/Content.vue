<template>
  <h-base-center-form-layout :entity="editedItem" :title="title" :operation="operation" @save="onSave()">
    <h-text-field
      v-model.lazy="v.editedItem.name.$model"
      name="name"
      label="Bucket 名称* "
      placeholder="Bucket 名称"
      debounce="5000"
      :error="v.editedItem.name.$error"
      :error-message="v.editedItem.name.$errors[0] ? v.editedItem.name.$errors[0].$message : ''"></h-text-field>
  </h-base-center-form-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import type { BucketResponse, HttpResult } from '/@/lib/declarations';

import { api, toast } from '/@/lib/utils';
import { useBaseTableItem } from '/@/hooks';

import { HBaseCenterFormLayout } from '/@/components';

export default defineComponent({
  name: 'OssBucketContent',

  components: {
    HBaseCenterFormLayout
  },

  setup(props) {
    const { editedItem, operation, title, overlay, onFinish } = useBaseTableItem<BucketResponse>();

    const isUnique = () => {
      let name = editedItem.value.name;

      return new Promise((resolve, reject) => {
        if (name) {
          api
            .ossBucket()
            .exists({ bucketName: name })
            .then(result => {
              let isExists = result.data as boolean;
              // 如果能够查询到roleCode
              // 如果该roleCode 对应的 roleId 与当前 editedItem中的roleId相同
              // 则认为是编辑状态，而且employeeName 没有变化，那么就校验通过。
              // 目前能想到的解决新建空值、编辑是原值等校验问题的最优解
              if (isExists) {
                reject(false);
              } else {
                resolve(true);
              }
            });
        } else {
          reject(false);
        }
      });
    };

    const rules = {
      editedItem: {
        name: {
          required: helpers.withMessage('Bucket 名不能为空', required),
          isUnique: helpers.withMessage('Bucket 名称已经存在，请使用其它名称', helpers.withAsync(isUnique))
        }
      }
    };

    const v = useVuelidate(rules, { editedItem }, { $lazy: true });

    const onSave = () => {
      v.value.$validate().then(vResult => {
        if (vResult) {
          api
            .ossBucket()
            .make({ bucketName: editedItem.value.name, objectLock: false })
            .then(response => {
              const result = response as HttpResult<boolean>;
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
      onSave
    };
  }
});
</script>
