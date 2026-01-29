<template>
  <q-item clickable v-close-popup v-ripple>
    <q-item-section avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>{{ label }}</q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { ClosePopup, QIcon, QItem, QItemSection, Ripple } from 'quasar';

defineOptions({
  name: 'HListItem',
  components: {
    QItem,
    QItemSection,
    QIcon,
  },
  directives: {
    ClosePopup,
    Ripple,
  },
});

interface Props {
  label?: string;
  icon?: string;
}

defineProps<Props>();
</script>
