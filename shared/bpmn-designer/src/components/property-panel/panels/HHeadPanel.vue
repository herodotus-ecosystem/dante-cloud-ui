<template>
  <q-item class="bg-grey-3">
    <q-item-section avatar>
      <q-avatar rounded>
        <img :src="icon" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-weight-bolder">{{ title }}</q-item-label>
      <q-item-label v-if="name" caption>{{ name }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'HHeadPanel',

  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    name: { type: String }
  },
});
</script>
