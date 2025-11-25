<template>
  <q-card>
    <q-tabs
      v-model="tab"
      shrink
      inline-label
      outside-arrows
      mobile-arrows
      dense
      active-color="red"
      align="left"
      :class="[$q.dark.isActive ? 'bg-dark text-white q-pt-xs' : 'bg-white text-grey-8 q-pt-xs']">
      <q-tab name="configuration" label="通知设置" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="configuration">
        <div class="text-h6">通知设置</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MessageSetting',

  setup(props) {
    const tab = ref('configuration');
    return { tab };
  }
});
</script>
