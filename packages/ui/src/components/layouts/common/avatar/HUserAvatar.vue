<template>
  <q-avatar v-bind="$attrs">
    <img :src="src" />
  </q-avatar>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { useAuthenticationStore } from '/@/stores';
import { generateFromString } from 'generate-avatar';

export default defineComponent({
  name: 'HUserAvatar',

  setup() {
    const authenticationStore = useAuthenticationStore();

    const src = computed(() => {
      if (authenticationStore.avatar) {
        return authenticationStore.avatar;
      } else {
        return `data:image/svg+xml;utf8,${generateFromString(authenticationStore.userId)}`;
      }
    });

    return {
      src
    };
  }
});
</script>
