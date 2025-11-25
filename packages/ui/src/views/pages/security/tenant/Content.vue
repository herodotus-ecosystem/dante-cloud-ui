<template>
  <h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @save="onSave()">
    <h-text-field
      v-model.lazy="v.editedItem.tenantId.$model"
      name="tenantId"
      label="租户标识ID * "
      placeholder="请输入租户标识ID"
      debounce="5000"
      :error="v.editedItem.tenantId.$error"
      :error-message="
        v.editedItem.tenantId.$errors[0] ? v.editedItem.tenantId.$errors[0].$message : ''
      "
    ></h-text-field>
    <h-text-field
      v-model.lazy="v.editedItem.username.$model"
      label="数据库用户名 *"
      placeholder="请输入数据库用户名"
      :error="v.editedItem.username.$error"
      :error-message="
        v.editedItem.username.$errors[0] ? v.editedItem.username.$errors[0].$message : ''
      "
    ></h-text-field>
    <h-text-field
      v-model.lazy="v.editedItem.password.$model"
      label="数据库密码 *"
      placeholder="请输入数据库密码"
      :error="v.editedItem.password.$error"
      :error-message="
        v.editedItem.password.$errors[0] ? v.editedItem.password.$errors[0].$message : ''
      "
    ></h-text-field>
    <h-text-field
      v-model.lazy="v.editedItem.driverClassName.$model"
      label="数据库驱动 *"
      placeholder="请输入数据库驱动"
      :error="v.editedItem.driverClassName.$error"
      :error-message="
        v.editedItem.driverClassName.$errors[0]
          ? v.editedItem.driverClassName.$errors[0].$message
          : ''
      "
    ></h-text-field>
    <h-text-field
      v-model.lazy="v.editedItem.url.$model"
      label="数据库url *"
      placeholder="请输入数据库url"
      :error="v.editedItem.url.$error"
      :error-message="v.editedItem.url.$errors[0] ? v.editedItem.url.$errors[0].$message : ''"
    ></h-text-field>
  </h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import type { SysTenantDataSourceEntity } from '@/lib/declarations';

import { API } from '@/configurations';
import { useTableItem } from '@/hooks';

import { HCenterFormLayout } from '@/components';

export default defineComponent({
  name: 'SysTenantDataSourceContent',

  components: {
    HCenterFormLayout,
  },

  setup(props) {
    const { editedItem, operation, title, saveOrUpdate } = useTableItem<SysTenantDataSourceEntity>(
      API.core.sysTenantDataSource(),
    );

    const isUnique = () => {
      let tenantId = editedItem.value.tenantId;

      return new Promise((resolve, reject) => {
        if (tenantId) {
          API.core
            .sysTenantDataSource()
            .fetchByTenantId(tenantId)
            .then((result) => {
              let tenant = result.data as SysTenantDataSourceEntity;
              // 如果能够查询到roleCode
              // 如果该roleCode 对应的 roleId 与当前 editedItem中的roleId相同
              // 则认为是编辑状态，而且employeeName 没有变化，那么就校验通过。
              // 目前能想到的解决新建空值、编辑是原值等校验问题的最优解
              resolve(!(tenant && tenant.tenantId !== editedItem.value.tenantId));
            });
        } else {
          reject(false);
        }
      });
    };

    const rules = {
      editedItem: {
        tenantId: {
          required: helpers.withMessage('租户标识ID不能为空', required),
          isUnique: helpers.withMessage(
            '租户标识ID已存在，请使用其它标识ID',
            helpers.withAsync(isUnique),
          ),
        },
        username: {
          required: helpers.withMessage('数据库用户名不能为空', required),
        },
        password: {
          required: helpers.withMessage('数据库密码不能为空', required),
        },
        driverClassName: {
          required: helpers.withMessage('数据库驱动不能为空', required),
        },
        url: {
          required: helpers.withMessage('数据库url不能为空', required),
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
