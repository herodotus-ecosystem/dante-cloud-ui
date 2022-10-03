<template>
  <h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @save="onSave()">
    <h-text-field
      v-model="editedItem.catalogName"
      name="catalogName"
      label="数据库名称 * "
      placeholder="请输入数据库名称"
      :error="v.editedItem.catalogName.$error"
      :error-message="v.editedItem.catalogName.$errors[0] ? v.editedItem.catalogName.$errors[0].$message : ''"
      @blur="v.editedItem.catalogName.$validate()"></h-text-field>
  </h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import type { DatabaseCatalog } from '/@/lib/declarations';
import { api } from '/@/lib/utils';
import { useTableItem } from '/@/hooks';
import { HCenterFormLayout } from '/@/components';

export default defineComponent({
  name: 'DatabaseCatalogContent',

  components: {
    HCenterFormLayout
  },

  setup(props) {
    const { editedItem, operation, title, saveOrUpdate } = useTableItem<DatabaseCatalog>(api.dbCatalog());

    const rules = {
      editedItem: {
        catalogName: {
          required: helpers.withMessage('数据库名称不能为空', required)
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
