<template>
  <q-drawer v-model="application.leftDrawer" show-if-above bordered :width="240">
    <q-scroll-area class="fit"> <h-app-menu></h-app-menu> </q-scroll-area>
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useApplicationStore } from '@herodotus-cloud/framework-kernel';

import HAppMenu from './HAppMenu.vue';

export default defineComponent({
  name: 'HAppLeftDrawer',

  components: {
    HAppMenu,
  },

  setup() {
    const application = useApplicationStore();

    return {
      application,
    };
  },
});
</script>
