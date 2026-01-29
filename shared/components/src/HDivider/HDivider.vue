<template>
  <h-container mode="three" :offset="offset" :wider="wider" align="center">
    <template #left><q-separator /></template>
    <h-label :text="label" :weight="weight"></h-label>
    <template #right>
      <q-separator />
    </template>
  </h-container>
</template>

<script setup lang="ts">
import { HContainer } from '../HGrid';
import { HLabel } from '../HForm';
import { QSeparator } from 'quasar';

defineOptions({
  name: 'HDivider',
  components: {
    HContainer,
    HLabel,
    QSeparator,
  },
});

interface Props {
  wider?: 'start' | 'center' | 'end';
  weight?: 'thin' | 'light' | 'regular' | 'medium' | 'bold' | 'bolder';
  offset?: number;
  label?: string;
}

withDefaults(defineProps<Props>(), {
  wider: 'center',
  weight: 'medium',
  offset: 0,
  label: '',
});
</script>
