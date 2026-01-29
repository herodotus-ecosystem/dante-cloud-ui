<template>
  <q-toggle
    v-model="switchValue"
    :true-value="trueValue"
    :false-value="falseValue"
    :color="color"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { QToggle } from 'quasar';

defineOptions({ name: 'HSwitch', components: { QToggle } });

interface Props {
  trueValue?: boolean | string | number;
  falseValue?: boolean | string | number;
  color?: string;
}

withDefaults(defineProps<Props>(), {
  trueValue: false,
  falseValue: true,
  color: 'primary',
});

const switchValue = defineModel<boolean | string | number>({
  default: false,
});
</script>
