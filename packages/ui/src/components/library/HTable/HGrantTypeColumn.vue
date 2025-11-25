<template>
  <div>
    <h-dense-icon-button
      v-for="(item, i) in items"
      :key="i"
      :icon="icon(item)"
      :color="color(item)"
      :tooltip="text(item)"
    ></h-dense-icon-button>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

import { useDisplayElement } from '@/hooks';
import { CONSTANTS } from '@/configurations';

import HDenseIconButton from './HDenseIconButton.vue';

export default defineComponent({
  name: 'HGrantTypeColumn',

  components: {
    HDenseIconButton,
  },

  props: {
    items: { type: Array as PropType<Array<string>>, required: true },
  },

  setup(props) {
    const { icon, color, text } = useDisplayElement(CONSTANTS.GRANT_TYPE_STYLE_GROUP);

    return {
      icon,
      color,
      text,
    };
  },
});
</script>
