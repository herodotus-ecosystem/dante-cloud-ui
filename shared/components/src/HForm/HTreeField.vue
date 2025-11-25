<template>
  <q-input v-model="nodeName" :label="label" outlined clearable v-bind="$attrs">
    <q-popup-proxy v-model="isPopup">
      <q-card>
        <q-card-section>
          <q-tree
            ref="treeRef"
            :nodes="items"
            node-key="id"
            label-key="name"
            selected-color="primary"
            v-model:selected="selectedValue"
          ></q-tree>
        </q-card-section>
      </q-card>
    </q-popup-proxy>
  </q-input>
</template>

<script lang="ts">
import type { PropType, Ref } from 'vue';
import { defineComponent, ref, watch, computed } from 'vue';

import type { QTree, Tree } from '@/lib/declarations';

import { lodash } from '@/lib/utils';

export default defineComponent({
  name: 'HTreeField',

  props: {
    modelValue: { type: String, default: '', required: true },
    items: { type: Array as PropType<Array<Tree>>, required: true },
    label: { type: String },
    value: { type: String },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const selectedValue = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit('update:modelValue', newValue);
      },
    });

    const treeNodes = ref([]) as Ref<Array<Tree>>;
    const treeRef = ref(null) as Ref<QTree | null>;
    const nodeName = ref('');
    const isPopup = ref(false);

    const treeToArray = (tree: Array<Tree>) => {
      let result: Array<Tree> = [];
      for (const item of tree) {
        const { children, ...i } = item;
        if (children && children.length) {
          result = result.concat(treeToArray(children));
        }
        result.push(i);
      }
      return result;
    };

    const init = (tree: Array<Tree>) => {
      if (!lodash.isEmpty(tree) && lodash.isEmpty(treeNodes.value)) {
        treeNodes.value = treeToArray(tree);
        const item = lodash.find(treeNodes.value, (i) => i.id == props.modelValue);
        nodeName.value = item?.name as string;
      }
    };

    watch(
      () => props.items,
      (newValue) => {
        if (!lodash.isEmpty(newValue)) {
          init(newValue);
        }
      },
      {
        immediate: true,
      },
    );

    watch(
      () => selectedValue.value,
      (newValue: string) => {
        if (newValue) {
          const node = treeRef.value?.getNodeByKey(newValue);
          if (node) {
            nodeName.value = node.name;
          }
          isPopup.value = false;
        }
      },
      {
        immediate: true,
      },
    );

    return {
      selectedValue,
      nodeName,
      treeRef,
      isPopup,
    };
  },
});
</script>
