<template>
  <q-card>
    <q-card-section>
      <h-label size="h6" text="扫码登录" align="left"></h-label>
    </q-card-section>

    <q-card-section class="q-gutter-y-lg">
      <q-card>
        <q-card-section>
          <q-img :src="url" spinner-color="primary" style="height: 320px; max-width: 320px" />
        </q-card-section>
      </q-card>

      <q-btn
        rounded
        unelevated
        outline
        class="full-width"
        label="返回"
        @click="application.switchToAccountPanel()"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { useApplicationStore } from '@herodotus-cloud/framework-kernel';

export default defineComponent({
  name: 'ScanPanel',

  setup() {
    const application = useApplicationStore();

    const url = ref('https://placeimg.com/500/300/nature');

    return {
      application,
      url,
    };
  },
});
</script>
