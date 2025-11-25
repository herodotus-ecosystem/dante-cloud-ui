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
import { useEditFinish, useBaseTableItem } from '@/hooks';

defineOptions({
  name: CONSTANTS.ComponentName.WIDGETS_DYNAMIC_FORM,
});

const instance = API.bpmnStorage;
const { onFinish } = useEditFinish();
const { editedItem } = useBaseTableItem();
</script>
