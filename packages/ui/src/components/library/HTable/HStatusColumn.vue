<template>
  <h-dense-icon-button :color="color" :icon="icon" :tooltip="tooltip"></h-dense-icon-button>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, reactive } from 'vue';
import type { ConstantDictionary } from '@/lib/declarations';

import { useConstantsStore } from '@/stores';
import { DATA_ITEM_STATUS } from '@/settings';

import HDenseIconButton from './HDenseIconButton.vue';
import { lodash } from '@/lib/utils';

export default defineComponent({
  name: 'HStatusColumn',

  components: {
    HDenseIconButton,
  },

  props: {
    type: { type: Number, defalut: '0', required: true },
  },

  setup(props) {
    const state = reactive({
      items: [] as Array<ConstantDictionary>,
    });

    const constants = useConstantsStore();

    const initialize = () => {
      if (lodash.isEmpty(state.items)) {
        state.items = constants.getDictionary('status');
      }
    };

    onMounted(() => {
      initialize();
    });

    watch(
      () => props.type,
      () => {
        initialize();
      },
      { immediate: true },
    );

    const color = computed(() => {
      return DATA_ITEM_STATUS[props.type].color;
    });

    const icon = computed(() => {
      return DATA_ITEM_STATUS[props.type].icon;
    });

    const tooltip = computed(() => {
      if (!lodash.isEmpty(state.items)) {
        return state.items[props.type].text;
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
