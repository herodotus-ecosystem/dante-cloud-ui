<template>
  <h-expansion-item icon="mdi-shuffle-variant" label="异步属性">
    <q-checkbox v-model="before" label="之前" @update:model-value="updateBefore"></q-checkbox>
    <q-checkbox v-model="after" label="之后" @update:model-value="updateAfter"></q-checkbox>
    <q-checkbox
      v-if="isExclusive"
      v-model="exclusive"
      label="排除"
      @update:model-value="updateExclusive"
    ></q-checkbox>
  </h-expansion-item>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed } from 'vue';

import { useDesignerStore } from '@/stores';
import { useAsynchronousContinuationsProperties } from '@/hooks';

import { HExpansionItem } from '../../widgets';

export default defineComponent({
  name: 'HAsynchronousContinuationsPanel',

  components: {
    HExpansionItem,
  },

  setup() {
    const designer = useDesignerStore();

    const {
      getBeforeValue,
      setBeforeValue,
      getAfterValue,
      setAfterValue,
      getExclusiveValue,
      setExclusiveValue,
    } = useAsynchronousContinuationsProperties();

    const before = ref<boolean>(false);
    const after = ref<boolean>(false);
    const exclusive = ref<boolean>(false);

    const isExclusive = computed(() => {
      return before.value || after.value;
    });

    const updateBefore = (value: boolean) => {
      setBeforeValue(designer.activeElement, value);
      if (value) {
        exclusive.value = true;
      }
    };

    const updateAfter = (value: boolean) => {
      setAfterValue(designer.activeElement, value);
      if (value) {
        exclusive.value = true;
      }
    };

    const updateExclusive = (value: boolean) => {
      setExclusiveValue(designer.activeElement, value);
    };

    const loading = () => {
      before.value = getBeforeValue(designer.activeElement);
      after.value = getAfterValue(designer.activeElement);
      exclusive.value = getExclusiveValue(designer.activeElement);
    };

    watch(
      () => isExclusive.value,
      (newValue) => {
        exclusive.value = newValue;
        updateExclusive(newValue);
      },
    );

    watch(
      () => designer.activeElement.id,
      () => {
        loading();
      },
      { immediate: true },
    );

    return {
      before,
      after,
      exclusive,
      isExclusive,
      updateBefore,
      updateAfter,
      updateExclusive,
    };
  },
});
</script>
