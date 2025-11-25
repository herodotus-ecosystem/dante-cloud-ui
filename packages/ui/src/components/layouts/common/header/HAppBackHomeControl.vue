<template>
  <q-btn round dense flat color="red" icon="mdi-arrow-left-box" :to="homePath">
    <q-tooltip>返回首页</q-tooltip>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { CONSTANTS } from '@/configurations';

export default defineComponent({
  name: 'HAppBackHomeControl',

  setup(props) {
    const homePath = CONSTANTS.Path.HOME;

    return {
      homePath,
    };
  },
});
</script>
