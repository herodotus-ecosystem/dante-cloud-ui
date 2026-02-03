<template>
  <q-icon
    :name="isShowPassword ? 'visibility' : 'visibility_off'"
    class="cursor-pointer"
    @click="isShowPassword = !isShowPassword"
  />
</template>

<script setup lang="ts">
import { QIcon } from 'quasar';

defineOptions({ name: 'HVisibilityButton', components: { QIcon } });

const isShowPassword = defineModel({
  type: Boolean,
});
</script>
