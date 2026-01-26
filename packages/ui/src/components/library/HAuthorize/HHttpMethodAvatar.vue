<template>
  <q-item-section avatar>
    <q-avatar :color="color(method)" text-color="white" :icon="icon(method)"></q-avatar>
  </q-item-section>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

import type { HttpMethod } from '@/composables/declarations';

import { useDisplayElement } from '@/composables/hooks';
import { CONSTANTS } from '@/configurations';

export default defineComponent({
  name: 'HHttpMethodAvatar',

  props: {
    method: { type: String as PropType<HttpMethod>, required: true },
  },

  setup() {
    const { icon, color } = useDisplayElement(CONSTANTS.HTTP_METHOD_STYLE_GROUP);

    return {
      color,
      icon,
    };
  },
});
</script>
