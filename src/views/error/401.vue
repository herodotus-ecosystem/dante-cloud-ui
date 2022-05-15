<template>
<icon-not-found></icon-not-found>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import IconNotFound from '~icons/custom/not-found';

export default defineComponent({
	name: '401',

  components: {
    IconNotFound
  }
});
</script>
