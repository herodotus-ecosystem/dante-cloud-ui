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
      <q-tab name="account" label="账号信息" />
      <q-tab name="realname" label="实名认证" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="account">
        <div class="text-h6">账号信息</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>

      <q-tab-panel name="realname">
        <div class="text-h6">实名认证</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FoundationAccount',

  setup(props) {
    const tab = ref('account');
    return { tab };
  }
});
</script>
