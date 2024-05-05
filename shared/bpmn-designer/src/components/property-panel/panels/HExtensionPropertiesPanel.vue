<template>
  <h-expansion-item icon="mdi-note-plus" label="扩展属性" badge :count="count">
    <q-table
      :rows="tableRows"
      :columns="tableColumns"
      row-key="name"
      dense
      flat
      bordered
      hide-pagination
      no-data-label="尚未设置"
      card-container-class="q-ml-2">
      <template v-slot:top-right>
        <q-space />
        <q-btn
          rounded
          size="sm"
          icon="mdi-plus-circle-outline"
          color="primary"
          label="新建"
          @click="openDialog = true"></q-btn>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="label" :props="props">
            {{ props.row.label }}
            <q-popup-edit
              v-model="props.row.label"
              title="修改标签"
              buttons
              label-set="确定"
              label-cancel="取消"
              v-slot="scope"
              @update:model-value="onModify">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="value" :props="props">
            {{ props.row.value }}
            <q-popup-edit
              v-model="props.row.value"
              title="修改属性值"
              buttons
              label-set="确定"
              label-cancel="取消"
              v-slot="scope"
              @update:model-value="onModify">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="actions" :props="props">
            <h-table-item-delete-button @click="onDelete(props.row)" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <h-extension-property-dialog v-model="openDialog" @save="onCreate"></h-extension-property-dialog>
  </h-expansion-item>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, computed, watch } from 'vue';

import type { QTableProps } from 'quasar';
import type { ExtensionProperty } from '/@/declarations';

import { lodash } from '/@/lib/utils';
import { useExtensionProperties } from '/@/hooks';
import { useDesignerStore } from '/@/stores';

import { HExpansionItem, HTableItemDeleteButton } from '../../widgets';
import { HExtensionPropertyDialog } from '../../property-element';

export default defineComponent({
  name: 'HExtensionPropertiesPanel',

  components: {
    HExpansionItem,
    HTableItemDeleteButton,
    HExtensionPropertyDialog
  },

  setup() {
    const designer = useDesignerStore();

    const { getExtensionProperties, modifyExtensionProperty, deleteExtensionProperty } = useExtensionProperties();

    const openDialog = ref<boolean>(false);

    const tableColumns: QTableProps['columns'] = [
      { align: 'center', name: 'name', field: 'calories', label: '名称' },
      { align: 'center', name: 'value', field: 'fat', label: '值' },
      { align: 'center', name: 'actions', field: 'actions', label: '操作' }
    ];

    const tableRows = ref([]) as Ref<Array<ExtensionProperty>>;

    const count = computed(() => {
      return tableRows.value.length;
    });

    const onCreate = (item: ExtensionProperty) => {
      if (!lodash.isEmpty(item)) {
        openDialog.value = false;
        tableRows.value.push(item);
        modifyExtensionProperty(designer.activeElement, tableRows.value);
        loading();
      }
    };

    const onDelete = (item: ExtensionProperty) => {
      if (!lodash.isEmpty(tableRows.value)) {
        deleteExtensionProperty(designer.activeElement, item);
        loading();
      }
    };

    const onModify = () => {
      modifyExtensionProperty(designer.activeElement, tableRows.value);
      loading();
    };

    const loading = () => {
      tableRows.value = getExtensionProperties(designer.activeElement);
    };

    watch(
      () => designer.activeElement.id,
      () => {
        loading();
      },
      { immediate: true }
    );

    return {
      tableRows,
      tableColumns,
      openDialog,
      count,
      onCreate,
      onDelete,
      onModify
    };
  }
});
</script>
