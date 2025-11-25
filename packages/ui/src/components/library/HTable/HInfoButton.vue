<template>
  <h-dense-icon-button color="info" icon="mdi-clipboard-text" tooltip="查看信息"></h-dense-icon-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import HDenseIconButton from './HDenseIconButton.vue';

export default defineComponent({
  name: 'HInfoButton',

  components: {
    HDenseIconButton,
  },
});
</script>
