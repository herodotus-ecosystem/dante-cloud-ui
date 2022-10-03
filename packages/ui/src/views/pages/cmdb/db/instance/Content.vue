<template>
  <h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @save="onSave()">
    <h-dictionary-select
      v-model="editedItem.dbType"
      dictionary="database"
      label="数据库类型 * "
      placeholder="数据库类型"
      :error="v.editedItem.dbType.$error"
      :error-message="v.editedItem.dbType.$errors[0] ? v.editedItem.dbType.$errors[0].$message : ''"
      @blur="v.editedItem.dbType.$validate()"></h-dictionary-select>
    <h-text-field v-model="editedItem.dbVersion" label="数据库版本" placeholder="请输入数据库版本"></h-text-field>
    <h-text-field
      v-model="editedItem.dbPorts"
      name="dbPorts"
      label="数据库端口 * "
      placeholder="请输入数据库端口"
      :error="v.editedItem.dbPorts.$error"
      :error-message="v.editedItem.dbPorts.$errors[0] ? v.editedItem.dbPorts.$errors[0].$message : ''"
      @blur="v.editedItem.dbPorts.$validate()"></h-text-field>
    <h-text-field
      v-model="selectedServerIp"
      name="actualIp"
      label="所在服务器 "
      placeholder="请选择所在服务器"
      @clear="onIpClear">
      <template v-slot:after><q-btn round dense flat icon="mdi-text-box-search" @click="open = !open" /></template>
    </h-text-field>
    <h-choose-server v-model="editedItem.assetServer" v-model:open="open"></h-choose-server>
  </h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import type { DatabaseInstance, AssetServer } from '/@/lib/declarations';
import { api } from '/@/lib/utils';
import { useTableItem } from '/@/hooks';

import { HCenterFormLayout, HChooseServer } from '/@/components';

export default defineComponent({
  name: 'DatabaseInstanceContent',

  components: {
    HCenterFormLayout,
    HChooseServer
  },

  setup(props) {
    const { editedItem, operation, title, saveOrUpdate } = useTableItem<DatabaseInstance>(api.dbInstance());

    const open = ref(false);

    const rules = {
      editedItem: {
        dbType: {
          required: helpers.withMessage('数据库类型不能为空', required)
        },
        dbPorts: {
          required: helpers.withMessage('数据库端口不能为空', required)
        }
      }
    };

    const selectedServerIp = computed({
      get: () => (editedItem.value.assetServer ? editedItem.value.assetServer.actualIp : ''),
      set: newValue => {
        editedItem.value.assetServer.actualIp = newValue;
      }
    });

    const v = useVuelidate(rules, { editedItem }, { $lazy: true });

    const onSave = () => {
      v.value.$validate().then(result => {
        if (result) {
          saveOrUpdate();
        }
      });
    };

    const onIpClear = () => {
      editedItem.value.assetServer = {} as AssetServer;
    };

    return {
      editedItem,
      operation,
      title,
      v,
      open,
      selectedServerIp,
      onSave,
      onIpClear
    };
  }
});
</script>
