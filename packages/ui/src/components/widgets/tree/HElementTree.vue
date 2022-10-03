<template>
  <q-input v-model="nodeName" :label="label" outlined clearable bottom-slots>
    <q-popup-proxy v-model="isPopup">
      <q-card>
        <q-card-section>
          <q-tree
            ref="treeRef"
            :nodes="treeItems"
            node-key="id"
            label-key="name"
            selected-color="primary"
            v-model:selected="selectedValue" />
        </q-card-section>
      </q-card>
    </q-popup-proxy>
  </q-input>
</template>

<script lang="ts">
import { defineComponent, ref, watch, Ref, onMounted } from 'vue';

import type { QTree } from 'quasar';
import type { SysElement, SysElementConditions } from '/@/lib/declarations';
import { api } from '/@/lib/utils';
import { useTreeItems } from '/@/hooks';

export default defineComponent({
  name: 'HElementTree',

  props: {
    selected: { type: String },
    label: { type: String },
    value: { type: String }
  },

  emits: ['update:selected'],

  setup(props, { emit }) {
    const { treeItems, conditions } = useTreeItems<SysElement, SysElementConditions>(api.sysElement());

    const selectedValue = ref('');
    const treeRef = ref(null) as Ref<QTree | null>;
    const nodeName = ref('');
    const isPopup = ref(false);

    watch(
      () => props.selected,
      newValue => {
        if (newValue) {
          selectedValue.value = newValue;
        }
      },
      {
        immediate: true
      }
    );

    watch(
      () => props.value,
      newValue => {
        if (newValue) {
          nodeName.value = props.value as string;
        }
      },
      {
        immediate: true
      }
    );

    watch(
      () => selectedValue.value,
      (newValue: string) => {
        emit('update:selected', newValue);
        if (newValue) {
          const node = treeRef.value?.getNodeByKey(newValue);
          if (node) {
            nodeName.value = node.name;
            isPopup.value = false;
          }
        }
      },
      {
        immediate: true
      }
    );

    const onClear = () => {
      nodeName.value = '';
      selectedValue.value = '';
    };

    return {
      treeItems,
      selectedValue,
      conditions,
      nodeName,
      treeRef,
      isPopup
    };
  }
});
</script>
