<template>
  <h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @save="onSave()">
    <h-text-field
      v-model.lazy="v.editedItem.productKey.$model"
      name="productKey"
      label="productKey * "
      placeholder="请输入租户标识ID"
      debounce="5000"
      :error="v.editedItem.productKey.$error"
      :error-message="
        v.editedItem.productKey.$errors[0] ? v.editedItem.productKey.$errors[0].$message : ''
      "></h-text-field>
  </h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import type { OAuth2ProductEntity } from '/@/lib/declarations';

import { api } from '/@/lib/utils';
import { useTableItem } from '/@/hooks';

import { HCenterFormLayout } from '/@/components';

export default defineComponent({
  name: 'SysTenantDataSourceContent',

  components: {
    HCenterFormLayout
  },

  setup(props) {
    const { editedItem, operation, title, saveOrUpdate } = useTableItem<OAuth2ProductEntity>(api.oauth2Product());

    // const isUnique = () => {
    //   let productKey = editedItem.value.productKey;

    //   return new Promise((resolve, reject) => {
    //     if (productKey) {
    //       api
    //         .oauth2Product()
    //         .fetchByTenantId(productKey)
    //         .then(result => {
    //           let tenant = result.data as OAuth2ProductEntity;
    //           // 如果能够查询到roleCode
    //           // 如果该roleCode 对应的 roleId 与当前 editedItem中的roleId相同
    //           // 则认为是编辑状态，而且employeeName 没有变化，那么就校验通过。
    //           // 目前能想到的解决新建空值、编辑是原值等校验问题的最优解
    //           resolve(!(tenant && tenant.tenantId !== editedItem.value.tenantId));
    //         });
    //     } else {
    //       reject(false);
    //     }
    //   });
    // };

    const rules = {
      editedItem: {
        productId: {
          required: helpers.withMessage('租户标识ID不能为空', required)
          // isUnique: helpers.withMessage('租户标识ID已存在，请使用其它标识ID', helpers.withAsync(isUnique))
        }
      }
    };

    const v = useVuelidate(rules, { editedItem }, { $lazy: true });

    const onSave = () => {
      v.value.$validate().then(result => {
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
      onSave
    };
  }
});
</script>
