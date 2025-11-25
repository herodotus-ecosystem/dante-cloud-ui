<template>
  <q-item>
    <q-item-section v-if="item.avatar" avatar>
      <q-avatar>
        <img :src="item.avatar" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ item.detail }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

import { useSettingsStore } from '@herodotus-cloud/framework-kernel';

import type { AccessSourceEntity } from '@/lib/declarations';

export default defineComponent({
  name: 'HBindingDetailColumn',

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
