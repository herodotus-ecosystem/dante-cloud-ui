<template>
  <h-expansion-item icon="mdi-file-document-outline" label="附加文档">
    <q-input
      v-model="document"
      dense
      outlined
      type="textarea"
      label="元素文档"
      @update:model-value="updateDocument"
    />
  </h-expansion-item>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

import { useDesignerStore } from '@/stores';
import { useDocumentProperties } from '@/hooks';

import { HExpansionItem } from '@/components/widgets';

export default defineComponent({
  name: 'HDocumentationPanel',

  components: {
    HExpansionItem,
  },

  setup() {
    const designer = useDesignerStore();

    const { getDocumentationValue, setDocumentationValue } = useDocumentProperties();

    const document = ref<string>('');

    const updateDocument = (value: string | number | null) => {
      setDocumentationValue(designer.activeElement, value as string);
    };

    const loading = () => {
      document.value = getDocumentationValue(designer.activeElement) as string;
    };

    watch(
      () => designer.activeElement.id,
      () => {
        loading();
      },
      { immediate: true, deep: true },
    );

    return {
      document,
      updateDocument,
    };
  },
});
</script>
