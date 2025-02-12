<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card class="q-py-none" style="min-width: 1000px">
      <q-card-section class="row items-center">
        <div class="text-h6">选择服务器</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <div class="q-gutter-y-md">
          <h-server-condition v-model:conditions="conditions"></h-server-condition>
          <q-table
            :rows="tableRows"
            :columns="columns"
            row-key="serverId"
            selection="single"
            v-model:selected="selected"
            v-model:pagination="pagination"
            v-model:pageNumber="pagination.page"
            :totalPages="totalPages"
            :loading="loading"
            status
            dense
            reserved
            @request="findItems"
          >
            <template #body-cell-deviceType="props">
              <q-td key="deviceType" :props="props">
                {{ parseServerDevice(props.row) }}
              </q-td>
            </template>
          </q-table>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn label="取消" color="red" v-close-popup />
        <q-btn label="确认" color="primary" @click="onSave()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import type { Ref, PropType } from 'vue';
import { defineComponent, computed, ref } from 'vue';

import type { AssetServerEntity, AssetServerConditions, QTableProps } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';
import { lodash, api } from '/@/lib/utils';
import { useTable, useServerDisplay } from '/@/hooks';

export default defineComponent({
  name: 'HChooseServer',

  props: {
    modelValue: {
      type: Object as PropType<AssetServerEntity>,
      default: () => ({}),
      required: true,
    },
    open: { type: Boolean, required: true },
  },

  emits: ['update:modelValue', 'update:open'],

  setup(props, { emit }) {
    const selectedValue = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit('update:modelValue', newValue);
      },
    });

    const showDialog = computed({
      get: () => props.open,
      set: (newValue) => {
        emit('update:open', newValue);
      },
    });

    const {
      tableRows,
      totalPages,
      pagination,
      toEdit,
      loading,
      toCreate,
      toAuthorize,
      conditions,
      findItems,
      deleteItemById,
    } = useTable<AssetServerEntity, AssetServerConditions>(
      api.assetServer(),
      ComponentNameEnum.ASSET_SERVER,
    );

    const { parseServerDevice } = useServerDisplay();

    const selected = ref([]) as Ref<Array<AssetServerEntity>>;

    const columns: QTableProps['columns'] = [
      { name: 'deviceType', field: 'deviceType', align: 'center', label: '服务器类型' },
      { name: 'assetId', field: 'assetId', align: 'center', label: '资产编号' },
      { name: 'actualIp', field: 'actualIp', align: 'center', label: '实际IP' },
      { name: 'manageIp', field: 'manageIp', align: 'center', label: '实体机IP' },
      { name: 'osPlatform', field: 'osPlatform', align: 'center', label: '操作系统' },
      { name: 'osVersion', field: 'osVersion', align: 'center', label: '系统版本' },
    ];

    onMounted(() => {
      selected.value = [];
    });

    const onSave = () => {
      if (!lodash.isEmpty(selected.value)) {
        selectedValue.value = selected.value[0];
        showDialog.value = false;
      }
    };

    return {
      selectedValue,
      showDialog,
      loading,
      onSave,
      tableRows,
      totalPages,
      pagination,
      toEdit,
      toCreate,
      toAuthorize,
      conditions,
      findItems,
      deleteItemById,
      selected,
      columns,
      parseServerDevice,
    };
  },
});
</script>
