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

<script setup lang="ts">
import type { Tree } from '@/lib/declarations';

import { ref, watch, shallowRef } from 'vue';

import { isEmpty, find } from 'lodash-es';
import { QCard, QCardSection, QInput, QPopupProxy, QTree } from 'quasar';

defineOptions({
  name: 'HTreeField',
  components: { QInput, QPopupProxy, QCard, QCardSection, QTree },
});

interface Props {
  items: Tree[];
  label?: string;
  value?: string;
}

const props = defineProps<Props>();

const selectedValue = defineModel<string>({
  required: true,
});

const treeNodes = ref<Tree[]>([]);
const treeRef = ref<QTree | null>(null);
const nodeName = shallowRef('');
const isPopup = shallowRef(false);

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
  if (!isEmpty(tree) && isEmpty(treeNodes.value)) {
    treeNodes.value = treeToArray(tree);
    const item = find(treeNodes.value, (i) => i.id == selectedValue.value);
    nodeName.value = item?.name as string;
  }
};

watch(
  () => props.items,
  (newValue) => {
    if (!isEmpty(newValue)) {
      init(newValue);
    }
  },
  {
    immediate: true,
  },
);

watch(
  selectedValue,
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
</script>
