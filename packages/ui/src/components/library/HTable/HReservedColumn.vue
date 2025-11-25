<template>
  <h-dense-icon-button
    v-if="status"
    color="negative"
    icon="mdi-delete-forever"
    tooltip="不允许删除的数据"
  ></h-dense-icon-button>
  <h-dense-icon-button
    v-else
    color="positive"
    icon="mdi-delete-empty"
    tooltip="允许删除的数据"
  ></h-dense-icon-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useSettingsStore } from '@herodotus-cloud/framework-kernel';

import HDenseIconButton from './HDenseIconButton.vue';

export default defineComponent({
  name: 'HReservedColumn',

  components: {
    HDenseIconButton,
  },

  props: {
    status: { type: Boolean, default: false },
  },

  setup(props) {
    const settings = useSettingsStore();
    return {
      settings,
    };
  },
});
</script>
