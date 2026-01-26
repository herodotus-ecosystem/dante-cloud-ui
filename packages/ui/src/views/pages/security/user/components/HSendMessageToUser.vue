<template>
  <q-dialog v-model="showDialog">
    <q-card style="min-width: 500px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">向【{{ name }}】发送消息</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <h-send-message-field
          :receiver-id="id"
          :receiver-name="name"
          :dialogue-id="dialogueId"
          :receiver-avatar="avatar"
          @send="onCloseDialog()"
        ></h-send-message-field>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { HSendMessageField } from '@/components';

export default defineComponent({
  name: 'HSendMessageToUser',

  components: {
    HSendMessageField,
  },

  props: {
    modelValue: { type: Boolean, default: false, required: true },
    id: { type: String, required: true },
    name: { type: String, required: true },
    dialogueId: { type: String, default: '' },
    avatar: { type: String, default: '' },
  },

  setup(props, { emit }) {
    const showDialog = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit('update:modelValue', newValue);
      },
    });

    const onOpenDialog = () => {
      showDialog.value = true;
    };

    const onCloseDialog = () => {
      showDialog.value = false;
    };

    return {
      showDialog,
      onOpenDialog,
      onCloseDialog,
    };
  },
});
</script>
