<template>
  <q-dialog v-model="isOpen" persistent transition-show="scale" transition-hide="scale">
    <q-card style="width: 20vw">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">选择流程</div>
        <q-space />
        <q-btn icon="close" flat round dense @click="isOpen = false" />
      </q-card-section>

      <q-card-section>
        <q-table
          dense
          flat
          :rows="tableRows"
          :columns="columns"
          :row-key="rowKey"
          selection="single"
          v-model:selected="selected"
          v-model:pagination="pagination"
          :loading="loading"
          @request="findItems"
        ></q-table>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="取消" color="red" @click="isOpen = false" />
        <q-btn :disable="isDisabled" label="确定" color="primary" @click="onSave()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { defineComponent, ref, computed } from 'vue';

import type {
  ProcessDefinitionEntity,
  ProcessDefinitionQueryParams,
  ProcessDefinitionSortBy,
  ProcessDefinitionDeleteQueryParams,
  ProcessSpecificsEntity,
  ProcessSpecificsConditions,
  QTableColumnProps,
} from '@/lib/declarations';

import { CONSTANTS, API } from '@/configurations';

import { useBaseTable } from '@/composables/hooks';
import { useBpmnTableItems, useBpmnProcess } from '@/composables/bpmn';
import { isEmpty, isElement } from 'lodash-es';

export default defineComponent({
  name: 'HWorkflowSelectDialog',

  props: {
    modelValue: { type: Boolean, required: true },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const isOpen = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit('update:modelValue', newValue);
      },
    });

    const { tableRows, totalPages, pagination, loading, findItems, conditions } = useBpmnTableItems<
      ProcessDefinitionEntity,
      ProcessDefinitionQueryParams,
      ProcessDefinitionSortBy,
      ProcessDefinitionDeleteQueryParams
    >(API.bpmn.processDefinition(), {
      sortBy: 'id',
      sortOrder: 'desc',
    });
    const { editedItem, createProcessSpecifics } = useBpmnProcess();
    const { toEdit } = useBaseTable<ProcessSpecificsEntity, ProcessSpecificsConditions>(
      CONSTANTS.ComponentName.WORKFLOW_PROCESS_START,
      'updateTime',
    );

    const selected = ref([]) as Ref<Array<ProcessDefinitionEntity>>;
    const rowKey = 'id' as keyof ProcessDefinitionEntity;

    const columns: QTableColumnProps = [
      { name: 'name', field: 'name', align: 'center', label: '模型名称' },
      {
        name: 'suspended',
        field: 'suspended',
        align: 'center',
        label: '是否挂起',
        format: (value) => (value ? '是' : '否'),
      },
      {
        name: 'startableInTasklist',
        field: 'startableInTasklist',
        align: 'center',
        label: '是否可启动',
        format: (value) => (value ? '是' : '否'),
      },
    ];

    const isDisabled = computed(() => {
      return isEmpty(selected.value);
    });

    const onSave = async () => {
      isOpen.value = false;
      const params = selected.value;
      if (!isElement(params)) {
        const item = params[0];
        await createProcessSpecifics(item!.key, item!.tenantId);
        toEdit(editedItem.value, {}, false);
      }
    };

    return {
      isOpen,
      isDisabled,
      onSave,
      tableRows,
      totalPages,
      pagination,
      loading,
      conditions,
      selected,
      rowKey,
      columns,
      findItems,
    };
  },
});
</script>
