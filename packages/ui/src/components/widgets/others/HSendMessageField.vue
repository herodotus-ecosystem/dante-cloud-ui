<template>
  <div>
    <h-text-field
      v-model="text"
      label="消息内容"
      type="textarea"
      placeholder="文明发言，真诚提问，请输入要发送的内容"
      :rules="[(val: string) => !!val || '发送内容不能为空']"></h-text-field>
    <h-button label="发送" :disable="isDisabled" @click="onSend()" color="primary" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type { DialogueDetail } from '/@/lib/declarations';

import { lodash } from '/@/lib/utils';
import { useWebSocketStore } from '/@/stores';

export default defineComponent({
  name: 'HSendMessageField',

  props: {
    receiverId: { type: String, default: '' },
    receiverName: { type: String, default: '' },
    receiverAvatar: { type: String, default: '' },
    dialogueId: { type: String, default: '' }
  },

  emits: ['send'],

  setup(props, { emit }) {
    const text = ref('');

    const webSocketStore = useWebSocketStore();

    const sendMessage = () => {
      const data = {
        receiverId: props.receiverId,
        receiverName: props.receiverName,
        receiverAvatar: props.receiverAvatar,
        content: text.value,
        dialogueId: props.dialogueId
      } as DialogueDetail;

      webSocketStore.sendToUser(data);
    };

    const isDisabled = computed(() => {
      return lodash.isEmpty(text.value);
    });

    const onSend = () => {
      sendMessage();
      emit('send');
    };

    return {
      text,
      onSend,
      isDisabled
    };
  }
});
</script>
