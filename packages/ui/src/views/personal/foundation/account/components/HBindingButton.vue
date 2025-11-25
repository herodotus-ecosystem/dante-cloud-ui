<template>
  <div v-if="item.bound">
    <q-btn
      outline
      color="red"
      label="解除绑定"
      :dense="settings.display.table.dense"
      :size="settings.display.table.dense ? 'sm' : 'md'"
    ></q-btn>
  </div>
  <div v-else>
    <q-btn
      v-if="item.oauth2"
      outline
      color="green"
      label="绑定"
      :dense="settings.display.table.dense"
      :size="settings.display.table.dense ? 'sm' : 'md'"
      :href="item.authorizeUrl"
      target="_blank"
    ></q-btn>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

import { useSettingsStore } from '@herodotus-cloud/framework-kernel';

import type { AccessSourceEntity } from '@/lib/declarations';

export default defineComponent({
  name: 'HBindingStatusColumn',

  props: {
    item: { type: Object as PropType<AccessSourceEntity>, required: true },
  },

  setup(props) {
    const settings = useSettingsStore();
    return {
      settings,
    };
  },
});
</script>
