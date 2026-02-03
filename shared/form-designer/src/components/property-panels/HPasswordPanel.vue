<template>
  <q-list bordered>
    <h-expansion-item icon="mdi-information" label="常规" default-opened>
      <h-text-field v-model="models.modelValue!.name" dense label="名称" />
      <h-text-field v-model="properties.label" dense label="Label" />
    </h-expansion-item>
    <h-expansion-item icon="mdi-eject-circle" label="状态">
      <div class="q-gutter-y-sm column">
        <h-switch v-model="properties.disable" label="Disable"></h-switch>
        <h-switch v-model="properties.readonly" label="Readonly"></h-switch>
      </div>
    </h-expansion-item>
    <h-expansion-item icon="mdi-image-edit" label="外观">
      <div class="q-gutter-y-sm column">
        <h-switch v-model="properties.dark" label="Dark"></h-switch>
        <h-switch v-model="properties.filled" label="Filled"></h-switch>
        <h-switch v-model="properties.outlined" label="Outlined"></h-switch>
        <h-switch v-model="properties.borderless" label="Borderless"></h-switch>
        <h-switch v-model="properties.standout" label="Standout"></h-switch>
        <h-switch
          v-model="properties[ATTRIBUTES.HideBottomSpace]"
          label="Hide Bottom Space"
        ></h-switch>
        <h-switch v-model="properties.rounded" label="Rounded"></h-switch>
        <h-switch v-model="properties.square" label="Square"></h-switch>
        <h-switch v-model="properties.dense" label="Dense"></h-switch>
        <h-switch v-model="properties[ATTRIBUTES.ItemAligned]" label="Item Aligned"></h-switch>
      </div>
    </h-expansion-item>
  </q-list>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { Schema } from '@/declarations';

import { Attributes } from '@/lib';

import { HSwitch, HTextField, HExpansionItem } from '../library';

defineOptions({
  name: 'HPasswordPanel',

  components: {
    HExpansionItem,
    HSwitch,
    HTextField,
  },
});

interface Props {
  schema: Schema;
}

const props = defineProps<Props>();

const ATTRIBUTES = Attributes;
const properties = computed(() => {
  return props.schema.attrs;
});

const models = computed(() => {
  return props.schema.models;
});
</script>
