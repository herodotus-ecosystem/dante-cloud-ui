<template>
  <h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @save="onSave()">
    <h-text-field
      v-model.lazy="v.editedItem.userName.$model"
      name="userName"
      label="用户名 * "
      placeholder="请输入用户名"
      debounce="5000"
      :error="v.editedItem.userName.$error"
      :error-message="v.editedItem.userName.$errors[0] ? v.editedItem.userName.$errors[0].$message : ''"></h-text-field>
    <h-text-field v-model="editedItem.nickName" label="昵称" placeholder="请输入用户昵称"></h-text-field>
  </h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import type { SysUserEntity } from '/@/lib/declarations';
import { api } from '/@/lib/utils';

import { useTableItem } from '/@/hooks';
import { HCenterFormLayout } from '/@/components';

export default defineComponent({
  name: 'SysUserContent',

  components: {
    HCenterFormLayout
  },

  setup(props) {
    const { editedItem, operation, title, saveOrUpdate } = useTableItem<SysUserEntity>(api.sysUser());

    const isUnique = () => {
      let userName = editedItem.value.userName;

      return new Promise((resolve, reject) => {
        if (userName) {
          api
            .sysUser()
            .fetchByUsername(userName)
            .then(result => {
              let user = result.data as SysUserEntity;
              // 如果能够查询到userName
              // 如果该userName 对应的 userId 与当前 editedItem中的userId相同
              // 则认为是编辑状态，而且userName 没有变化，那么就校验通过。
              // 目前能想到的解决新建空值、编辑是原值等校验问题的最优解
              resolve(!(user && user.userId !== editedItem.value.userId));
            });
        } else {
          reject(false);
        }
      });
    };

    const rules = {
      editedItem: {
        userName: {
          required: helpers.withMessage('用户名不能为空', required),
          regex: helpers.withMessage('用户名只能包含字母，数字，下划线，减号', helpers.regex(/^[a-zA-Z0-9_-]{4,16}$/)),
          isUnique: helpers.withMessage('用户名已存在，请使用其它名称', helpers.withAsync(isUnique))
        }
      }
    };

    const v = useVuelidate(rules, { editedItem }, { $lazy: true });

    const onSave = () => {
      if (!v.value.$anyDirty) {
        saveOrUpdate();
      } else {
        v.value.$validate().then(result => {
          if (result) {
            saveOrUpdate();
          }
        });
      }
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
