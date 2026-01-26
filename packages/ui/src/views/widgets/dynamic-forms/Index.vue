<template>
  <h-dynamic-forms
    container
    title="Dynamic Forms"
    :instance="instance"
    :item="editedItem"
    @close="onFinish"
  />
</template>

<script setup lang="ts">
import { CONSTANTS, API } from '@/configurations';
import { useBaseTableItem } from '@/composables/hooks';
import { useEditFinish } from '@herodotus-cloud/framework-kernel';

defineOptions({
  name: CONSTANTS.ComponentName.WIDGETS_DYNAMIC_FORM,
});

const instance = API.bpmnStorage;
const { onFinish } = useEditFinish();
const { editedItem } = useBaseTableItem();
</script>
