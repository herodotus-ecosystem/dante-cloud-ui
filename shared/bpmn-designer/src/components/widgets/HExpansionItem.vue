<template>
  <q-expansion-item
    expand-separator
    :default-opened="defaultOpend"
    header-class="text-primary"
    expand-icon-class="text-primary">
    <template v-slot:header>
      <q-item-section avatar>
        <q-icon :name="icon" />
      </q-item-section>

      <q-item-section>{{ label }}</q-item-section>

      <q-item-section v-if="badge" side>
        <q-badge :color="badgeColor">{{ count }}</q-badge>
      </q-item-section>
    </template>
    <template v-slot:default>
      <q-card>
        <q-card-section><slot></slot></q-card-section>
      </q-card>
    </template>
  </q-expansion-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HExpansionItem',

  props: {
    icon: { type: String, default: '' },
    label: { type: String, default: '' },
    badge: { type: Boolean, default: false },
    badgeColor: { type: String, default: 'red' },
    count: { type: Number, default: 0 },
    defaultOpend: { type: Boolean, default: false }
  }
});
</script>
