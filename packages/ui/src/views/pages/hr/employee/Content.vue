<template>
  <h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @save="onSave()">
    <h-text-field
      v-model="editedItem.employeeName"
      name="employeeName"
      label="人员姓名 * "
      placeholder="请输入姓名"
      debounce="5000"
      :error="v.editedItem.employeeName.$error"
      :error-message="v.editedItem.employeeName.$errors[0] ? v.editedItem.employeeName.$errors[0].$message : ''"
      @blur="v.editedItem.employeeName.$validate()"></h-text-field>
    <h-text-field v-model="editedItem.employeeNo" label="人员编号" placeholder="请输入人员编号"></h-text-field>
    <h-dictionary-select v-model="editedItem.gender" dictionary="gender" label="性别"></h-dictionary-select>
    <h-dictionary-select v-model="editedItem.identity" dictionary="identity" label="身份"></h-dictionary-select>
    <h-text-field v-model="editedItem.email" label="电子邮件" placeholder="请输入电子邮件"></h-text-field>
    <h-text-field v-model="editedItem.mobilePhoneNumber" label="手机号码" placeholder="请输入手机号码"></h-text-field>
    <h-text-field v-model="editedItem.officePhoneNumber" label="办公电话" placeholder="请输入办公电话"></h-text-field>
  </h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import type { SysEmployee } from '/@/lib/declarations';
import { api } from '/@/lib/utils';
import { useTableItem } from '/@/hooks';
import { HCenterFormLayout, HDictionarySelect } from '/@/components';

export default defineComponent({
  name: 'SysEmployeeContent',

  components: {
    HCenterFormLayout,
    HDictionarySelect
  },

  setup(props) {
    const { editedItem, operation, title, saveOrUpdate } = useTableItem<SysEmployee>(api.sysEmployee());

    const unique = () => {
      let employeeName = editedItem.value.employeeName;

      return new Promise((resolve, reject) => {
        if (employeeName) {
          api
            .sysEmployee()
            .fetchByEmployeeName(employeeName)
            .then(result => {
              let employee = result.data as SysEmployee;
              resolve(!(employee && employee.employeeId));
            });
        } else {
          reject(false);
        }
      });
    };

    const rules = {
      editedItem: {
        employeeName: {
          required: helpers.withMessage('范围代码不能为空', required),
          unique: helpers.withMessage('该人员已存在，请增加区分字符', helpers.withAsync(unique))
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
