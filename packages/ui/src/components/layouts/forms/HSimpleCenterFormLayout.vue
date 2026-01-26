<template>
  <h-detail-container :title="title" :overlay="overlay">
    <h-container :offset="4">
      <slot></slot>
      <div class="q-mt-sm">
        <q-btn color="red" @click="onFinish()">取消</q-btn>
        <q-btn v-if="!hideSave" color="primary" class="q-ml-sm" @click="onSave()">保存</q-btn>
        <slot name="button"></slot>
      </div>
    </h-container>
  </h-detail-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HDetailContainer from './HDetailContainer.vue';

import { useEditFinish } from '@herodotus-cloud/framework-kernel';

export default defineComponent({
  name: 'HOssFormLayout',

  components: {
    HDetailContainer,
  },

  emits: ['save'],

  props: {
    overlay: { type: Boolean, default: false },
    title: { type: String, default: '' },
    hideSave: { type: Boolean, default: false },
  },

  setup(props, { emit }) {
    const { onFinish } = useEditFinish();

    const onSave = async () => {
      emit('save');
    };

    return {
      onFinish,
      onSave,
    };
  },
});
</script>
