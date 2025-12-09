<template>
  <h-center-form-layout
    :entity="editedItem"
    :title="title"
    :overlay="overlay"
    :operation="operation"
    @save="onSave()"
  >
    <h-text-field
      v-model.lazy="v.editedItem.employeeName.$model"
      name="employeeName"
      label="人员姓名 * "
      placeholder="请输入姓名"
      debounce="5000"
      :error="v.editedItem.employeeName.$error"
      :error-message="
        v.editedItem.employeeName.$errors[0] ? v.editedItem.employeeName.$errors[0].$message : ''
      "
    ></h-text-field>
    <h-text-field
      v-model="editedItem.employeeNo"
      label="人员编号"
      placeholder="请输入人员编号"
    ></h-text-field>
    <h-dictionary-select
      v-model="editedItem.gender"
      dictionary="Gender"
      label="性别"
    ></h-dictionary-select>
    <h-dictionary-select
      v-model="editedItem.identity"
      dictionary="Identity"
      label="身份"
    ></h-dictionary-select>
    <h-text-field
      v-model="editedItem.email"
      label="电子邮件"
      placeholder="请输入电子邮件"
    ></h-text-field>
    <h-text-field
      v-model="editedItem.mobilePhoneNumber"
      label="手机号码"
      placeholder="请输入手机号码"
    ></h-text-field>
    <h-text-field
      v-model="editedItem.officePhoneNumber"
      label="办公电话"
      placeholder="请输入办公电话"
    ></h-text-field>
  </h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import type { SysEmployeeEntity } from '@/lib/declarations';
import { API } from '@/configurations';
import { useTableItem } from '@/hooks';
import { HCenterFormLayout } from '@/components';
import { HDictionarySelect } from '@/composables/constants';

export default defineComponent({
  name: 'SysEmployeeContent',

  components: {
    HCenterFormLayout,
    HDictionarySelect,
  },

  setup(props) {
    const { editedItem, operation, title, overlay, saveOrUpdate } = useTableItem<SysEmployeeEntity>(
      API.core.sysEmployee(),
    );

    const isUnique = () => {
      let employeeName = editedItem.value.employeeName;

      return new Promise((resolve, reject) => {
        if (employeeName) {
          API.core
            .sysEmployee()
            .fetchByEmployeeName(employeeName)
            .then((result) => {
              let employee = result.data as SysEmployeeEntity;
              // 如果能够查询到employeeName
              // 如果该employeeName 对应的 employeeId 与当前 editedItem中的employeeId相同
              // 则认为是编辑状态，而且employeeName 没有变化，那么就校验通过。
              // 目前能想到的解决新建空值、编辑是原值等校验问题的最优解
              resolve(!(employee && employee.employeeId !== editedItem.value.employeeId));
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
          isUnique: helpers.withMessage(
            '该人员已存在，请增加区分字符',
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
      overlay,
      v,
      onSave,
    };
  },
});
</script>
