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
      <q-tab name="private" icon="mdi-message-bulleted" label="私信" />
      <q-tab name="notice" icon="mdi-message-badge" label="@我" />
      <q-tab name="public" icon="mdi-bullhorn-variant" label="公告" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="private">
        <h-information-list></h-information-list>
      </q-tab-panel>

      <q-tab-panel name="public">
        <div class="text-h6">Alarms</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import HInformationList from './DialogueContact.vue';

export default defineComponent({
  name: 'MessageInformation',

  components: { HInformationList },

  setup(props) {
    const tab = ref('private');

    return {
      tab,
    };
  },
});
</script>
