<template>
  <h-expansion-item icon="mdi-account-cog" label="启动发起人">
    <h-text-field v-model="initiator" dense label="创建者" @update:model-value="updateInitiator" />
  </h-expansion-item>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue';

import { useDesignerStore } from '@/stores';
import { useStartInitiatorProperties } from '@/hooks';

import { HExpansionItem } from '@/components/widgets';
import { HTextField } from '@/components/base';

export default defineComponent({
  name: 'HStartInitiatorPanel',

  components: {
    HExpansionItem,
    HTextField,
  },

  setup() {
    const designer = useDesignerStore();

    const { getInitiatorValue, setInitiatorValue } = useStartInitiatorProperties();

    const initiator = ref<string>('');

    const updateInitiator = (value: string | number | null) => {
      setInitiatorValue(designer.activeElement, value as string);
    };

    const loading = () => {
      initiator.value = getInitiatorValue(designer.activeElement);
    };

    watch(
      () => designer.activeElement.id,
      () => {
        loading();
      },
      { immediate: true, deep: true },
    );

    return {
      initiator,
      updateInitiator,
    };
  },
});
</script>
