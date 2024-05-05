<template>
  <h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @save="onSave()">
    <h-text-field
      v-model="editedItem.actualIp"
      name="actualIp"
      label="使用IP * "
      placeholder="请输入使用IP"
      :error="v.editedItem.actualIp.$error"
      :error-message="v.editedItem.actualIp.$errors[0] ? v.editedItem.actualIp.$errors[0].$message : ''"
      @blur="v.editedItem.actualIp.$validate()"></h-text-field>
    <h-dictionary-select
      v-model="editedItem.deviceType"
      dictionary="serverDevice"
      label="服务器类型 * "
      multiple
      placeholder="服务器类型"></h-dictionary-select>
    <h-text-field v-model="editedItem.manageIp" label="实体机IP" placeholder="请输入实体机IP"></h-text-field>
    <h-text-field v-model="editedItem.assetId" label="资产编号" placeholder="请输入资产编号"></h-text-field>
    <h-text-field v-model="editedItem.cabinetNumber" label="机柜号" placeholder="请输入机柜号"></h-text-field>
    <h-text-field v-model="editedItem.cabinetOrder" label="机柜中序号" placeholder="请输入机柜中序号"></h-text-field>
    <h-text-field v-model="editedItem.hostName" label="主机名" placeholder="请输入主机名"></h-text-field>
    <h-text-field v-model="editedItem.serialNumber" label="序列号" placeholder="请输入序列号"></h-text-field>
    <h-text-field v-model="editedItem.manufacturer" label="制造商" placeholder="请输入制造商"></h-text-field>
    <h-text-field v-model="editedItem.model" label="型号" placeholder="请输入型号"></h-text-field>
    <h-text-field v-model="editedItem.osPlatform" label="操作系统" placeholder="请输入操作系统"></h-text-field>
    <h-text-field v-model="editedItem.osVersion" label="系统版本" placeholder="请输入系统版本"></h-text-field>
    <h-text-field v-model.number="editedItem.cpuCount" label="CPU 个数" placeholder="请输入CPU个数" type="number" />
    <h-text-field
      v-model.number="editedItem.cpuPhysicalCount"
      label="物理 CPU 个数"
      placeholder="请输入物理 CPU 个数"
      type="number" />
    <h-text-field v-model="editedItem.cpuModel" label="CPU 型号" placeholder="请输入 CPU 型号"></h-text-field>
  </h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import type { AssetServerEntity } from '/@/lib/declarations';
import { api } from '/@/lib/utils';
import { useTableItem } from '/@/hooks';
import { HCenterFormLayout } from '/@/components';

export default defineComponent({
  name: 'AssetServerContent',

  components: {
    HCenterFormLayout
  },

  setup(props) {
    const { editedItem, operation, title, saveOrUpdate } = useTableItem<AssetServerEntity>(api.assetServer());

    const rules = {
      editedItem: {
        actualIp: {
          required: helpers.withMessage('使用IP不能为空', required)
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
