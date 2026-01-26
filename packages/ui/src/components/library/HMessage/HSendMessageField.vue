<template>
  <div>
    <h-text-field
      v-model="text"
      label="消息内容"
      type="textarea"
      placeholder="文明发言，真诚提问，请输入要发送的内容"
      :rules="[(val: string) => !!val || '发送内容不能为空']"
    ></h-text-field>
    <h-button label="发送" :disable="isDisabled" @click="onSend()" color="primary" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

import type { DialogueDetailEntity } from '@/lib/declarations';

import { isEmpty } from 'lodash-es';
import { useWebSocketMessage } from '@/composables/hooks';
import { useAuthenticationStore } from '@herodotus-cloud/framework-kernel';

export default defineComponent({
  name: 'HSendMessageField',

  props: {
    receiverId: { type: String, default: '' },
    receiverName: { type: String, default: '' },
    receiverAvatar: { type: String, default: '' },
    dialogueId: { type: String, default: '' },
  },

  emits: ['send'],

  setup(props, { emit }) {
    const text = ref('');

    const { sendToUser } = useWebSocketMessage();
    const authentication = useAuthenticationStore();

    const sendMessage = () => {
      const data = {
        receiverId: props.receiverId,
        receiverName: props.receiverName,
        receiverAvatar: props.receiverAvatar,
        content: text.value,
        dialogueId: props.dialogueId,
        senderId: authentication.userId,
        senderName: authentication.username,
      } as DialogueDetailEntity;

      sendToUser(data);
    };

    const isDisabled = computed(() => {
      return isEmpty(text.value);
    });

    const onSend = () => {
      sendMessage();
      emit('send');
    };

    return {
      text,
      onSend,
      isDisabled,
    };
  },
});
</script>
