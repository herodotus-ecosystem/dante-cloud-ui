<template>
  <h-dense-icon-button :color="color" :icon="icon" :tooltip="tooltip"></h-dense-icon-button>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, computed } from 'vue';

import { CONSTANTS } from '@/configurations';

import HDenseIconButton from './HDenseIconButton.vue';
import { isEmpty } from 'lodash-es';
import type { Dictionary } from '@/composables/declarations';

export default defineComponent({
  name: 'HStatusColumn',

  components: {
    HDenseIconButton,
  },

  props: {
    type: { type: String, defalut: '0', required: true },
    options: { type: Array as PropType<Array<Dictionary>>, required: true },
  },

  setup(props) {
    const color = computed(() => {
      return CONSTANTS.DATA_ITEM_STATUS[Number(props.type)]!.color;
    });

    const icon = computed(() => {
      return CONSTANTS.DATA_ITEM_STATUS[Number(props.type)]!.icon;
    });

    const tooltip = computed(() => {
      if (!isEmpty(props.options)) {
        return props.options[Number(props.type)]!.label;
      } else {
        return '';
      }
    });

    return {
      color,
      icon,
      tooltip,
    };
  },
});
</script>
