<template>
  <h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @save="onSave()">
    <h-text-field
      v-model.lazy="v.editedItem.roleName.$model"
      label="角色名称 *"
      placeholder="请输入角色名称"
      :error="v.editedItem.roleName.$error"
      :error-message="
        v.editedItem.roleName.$errors[0] ? v.editedItem.roleName.$errors[0].$message : ''
      "
    ></h-text-field>

    <h-text-field
      v-model.lazy="v.editedItem.roleCode.$model"
      name="roleCode"
      label="角色代码 * "
      placeholder="请输入角色代码"
      debounce="5000"
      :error="v.editedItem.roleCode.$error"
      :error-message="
        v.editedItem.roleCode.$errors[0] ? v.editedItem.roleCode.$errors[0].$message : ''
      "
    ></h-text-field>
  </h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import type { SysRoleEntity } from '@/lib/declarations';

import { api } from '@/lib/utils';
import { useTableItem } from '@/hooks';

import { HCenterFormLayout } from '@/components';

export default defineComponent({
  name: 'SysRoleContent',

  components: {
    HCenterFormLayout,
  },

  setup(props) {
    const { editedItem, operation, title, saveOrUpdate } = useTableItem<SysRoleEntity>(
      api.sysRole(),
    );

    const isUnique = () => {
      let roleCode = editedItem.value.roleCode;

      return new Promise((resolve, reject) => {
        if (roleCode) {
          api
            .sysRole()
            .fetchByRoleCode(roleCode)
            .then((result) => {
              let role = result.data as SysRoleEntity;
              // 如果能够查询到roleCode
              // 如果该roleCode 对应的 roleId 与当前 editedItem中的roleId相同
              // 则认为是编辑状态，而且employeeName 没有变化，那么就校验通过。
              // 目前能想到的解决新建空值、编辑是原值等校验问题的最优解
              resolve(!(role && role.roleId !== editedItem.value.roleId));
            });
        } else {
          reject(false);
        }
      });
    };

    const rules = {
      editedItem: {
        roleName: {
          required: helpers.withMessage('角色名称不能为空', required),
        },
        roleCode: {
          required: helpers.withMessage('角色代码不能为空', required),
          isUnique: helpers.withMessage(
            '角色代码已存在，请使用其它代码',
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
