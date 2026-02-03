<template>
  <q-select
    v-model="selectedValue"
    :option-label="optionLabel"
    :option-value="optionValue"
    outlined
    clearable
    emit-value
    map-options
    transition-show="scale"
    transition-hide="scale"
    :bottom-slots="hasError"
    :error="hasError"
    :error-message="errorMessage"
    v-bind="$attrs"
  ></q-select>
</template>

<script setup lang="ts">
import { QSelect } from 'quasar';
import { computed } from 'vue';

defineOptions({ name: 'HSelect', components: { QSelect } });

interface Props {
  optionLabel?: string;
  optionValue?: string;
  errorMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  optionLabel: 'text',
  optionValue: 'value',
});

const selectedValue = defineModel();

const hasError = computed(() => {
  return props.errorMessage ? true : false;
});
</script>
