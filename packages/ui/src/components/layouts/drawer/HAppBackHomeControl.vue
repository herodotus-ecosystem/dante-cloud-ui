<template>
  <q-btn round dense flat color="red" icon="mdi-arrow-left-box" :to="homePath">
    <q-tooltip>返回首页</q-tooltip>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { PathEnum } from '/@/lib/enums';

export default defineComponent({
  name: 'HAppBackHomeControl',

  setup(props) {
    const homePath = PathEnum.HOME;

    return {
      homePath
    };
  }
});
</script>
