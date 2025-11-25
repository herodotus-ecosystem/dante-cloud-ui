<template>
  <h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @save="onSave()">
    <h-text-field
      v-model.lazy="v.editedItem.scopeCode.$model"
      name="scopeCode"
      label="范围代码 * "
      placeholder="请使用小写英文单词编写的范围代码，例如：all、read_user等"
      debounce="5000"
      :error="v.editedItem.scopeCode.$error"
      :error-message="
        v.editedItem.scopeCode.$errors[0] ? v.editedItem.scopeCode.$errors[0].$message : ''
      "
    ></h-text-field>
    <h-text-field
      v-model="editedItem.scopeName"
      label="范围名称"
      placeholder="请输入范围名称"
    ></h-text-field>
  </h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import type { OAuth2ScopeEntity } from '@/lib/declarations';
import { API } from '@/configurations';
import { useTableItem } from '@/hooks';
import { HCenterFormLayout } from '@/components';

export default defineComponent({
  name: 'OAuth2ScopeContent',

  components: {
    HCenterFormLayout,
  },

  setup(props) {
    const { editedItem, operation, title, saveOrUpdate } = useTableItem<OAuth2ScopeEntity>(
      API.core.oauth2Scope(),
    );

    const isUnique = () => {
      let scopeCode = editedItem.value.scopeCode;

      return new Promise((resolve, reject) => {
        if (scopeCode) {
          API.core
            .oauth2Scope()
            .fetchByScopeCode(scopeCode)
            .then((result) => {
              let scope = result.data as OAuth2ScopeEntity;
              // 如果能够查询到scopeCode

              // 如果该scopeCode 对应的 scopeId 与当前 editedItem中的scopeId相同
              // 则认为是编辑状态，而且scopeCode 没有变化，那么就校验通过。
              // 目前能想到的解决新建空值、编辑是原值等校验问题的最优解

              resolve(!(scope && scope.scopeId !== editedItem.value.scopeId));
            });
        } else {
          reject(false);
        }
      });
    };

    const rules = {
      editedItem: {
        scopeCode: {
          required: helpers.withMessage('范围代码不能为空', required),
          isUnique: helpers.withMessage(
            '范围代码已存在，请使用其它代码',
            helpers.withAsync(isUnique),
          ),
        },
      },
    };

    const v = useVuelidate(rules, { editedItem }, { $lazy: true });

    const onSave = () => {
      v.value.$validate().then((result) => {
        if (result) {
          saveOrUpdate();
        }
      });
    };

    return {
      editedItem,
      operation,
      title,
      v,
      onSave,
    };
  },
});
</script>
