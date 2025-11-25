<template>
  <h-container mode="two" :offset="1" wider="start">
    <h-text-field
      v-model="code"
      label="图形验证码"
      placeholder="请输入验证码"
      dense
      bottom-slots
      :error="hasError"
      error-message="验证码错误！"
      @blur="verifyCaptcha()"
      @clear="onClear()"
    >
      <template #before>
        <q-icon color="primary" name="mdi-barcode-scan" />
      </template>
      <template #append>
        <q-btn v-if="isValid" round dense flat color="green" icon="mdi-check-circle" />
      </template>
    </h-text-field>

    <template #right>
      <div class="q-px-sm">
        <q-img
          :src="graphicImageBase64"
          class="rounded-borders"
          spinner-size="20px"
          spinner-color="primary"
          style="height: 40px"
          :img-style="{ border: '1px solid black' }"
          fit="fill"
          alt="点击图片刷新"
          @click="onRefresh()"
        />
      </div>
    </template>
  </h-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';

import type { GraphicCaptcha } from '@herodotus-cloud/framework-kernel';

import { useCryptoStore, SecurityApiResources, CaptchaCategoryEnum } from '@herodotus-cloud/framework-kernel';
import { VARIABLES } from '@/configurations';

export default defineComponent({
  name: 'HGraphicCaptcha',

  props: {
    modelValue: { type: Boolean },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const crypto = useCryptoStore();

    const graphicImageBase64 = ref('');
    const code = ref('');
    const hasError = ref(false);

    const isValid = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit('update:modelValue', newValue);
      },
    });

    const createCaptcha = async () => {
      const response = await SecurityApiResources.getInstance()
        .open()
        .createCaptcha(crypto.sessionId, VARIABLES.getCaptcha());

      if (
        !(
          VARIABLES.getCaptcha() === CaptchaCategoryEnum.JIGSAW &&
          VARIABLES.getCaptcha() === CaptchaCategoryEnum.WORD_CLICK
        )
      ) {
        const data = response.data as GraphicCaptcha;
        graphicImageBase64.value = data.graphicImageBase64;
      }
    };

    const verifyCaptcha = () => {
      if (code.value && !isValid.value) {
        SecurityApiResources.getInstance()
          .open()
          .verifyCaptcha(crypto.sessionId, VARIABLES.getCaptcha(), code.value)
          .then((response) => {
            const data = response.data as boolean;
            hasError.value = false;
            isValid.value = true;
          })
          .catch((error) => {
            hasError.value = true;
            isValid.value = false;
          });
      }
    };

    onMounted(() => {
      createCaptcha();
    });

    const onRefresh = () => {
      createCaptcha();
    };

    const onClear = () => {
      isValid.value = false;
    };

    return {
      verifyCaptcha,
      onRefresh,
      onClear,
      graphicImageBase64,
      code,
      isValid,
      hasError,
    };
  },
});
</script>
