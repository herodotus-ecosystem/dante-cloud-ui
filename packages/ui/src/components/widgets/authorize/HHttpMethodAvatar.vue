<template>
  <q-item-section avatar>
    <q-avatar :color="color(method)" text-color="white" :icon="icon(method)"></q-avatar>
  </q-item-section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import type { HttpMethod } from '/@/lib/declarations';

import { useDisplayElement } from '/@/hooks';
import { HTTP_METHOD_STYLE_GROUP } from '/@/settings';

export default defineComponent({
  name: 'HHttpMethodAvatar',

  props: {
    method: { type: String as PropType<HttpMethod>, required: true }
  },

  setup() {
    const { icon, color } = useDisplayElement(HTTP_METHOD_STYLE_GROUP);

    return {
      color,
      icon
    };
  }
});
</script>
