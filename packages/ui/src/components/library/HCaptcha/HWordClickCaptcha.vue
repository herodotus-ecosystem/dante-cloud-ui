<template>
  <div>
    <h-behavior-captcha-background
      :background-image="backgroundImage"
      :canvas-width="canvasWidth"
      :canvas-height="canvasHeight"
      :loading="backgroundLoading"
      :success="isSuccess"
      :show-message="isShowMessage"
      :message="message"
      @click="canOperate ? onWordClick($event) : ''"
    >
      <div
        v-for="(coordinate, index) in flagCoordinate"
        :key="index"
        :style="{
          position: 'absolute',
          'z-index': 9999,
          width: '25px',
          height: '25px',
          border: '3px solid #fff',
          color: '#fff',
          'background-color': '#0D47A1',
          'font-size': '14px',
          'text-align': 'center',
          'line-height': '18px',
          'border-radius': '50%',
          'box-sizing': 'border-box',
          'box-shadow': '0 0 10px black',
          top: coordinate.y - 10 + 'px',
          left: coordinate.x - 10 + 'px',
        }"
      >
        {{ index + 1 }}
      </div>
    </h-behavior-captcha-background>

    <h-behavior-captcha-control
      description="请顺序点选"
      :size="sliderSize"
      :prompt="prompt"
    ></h-behavior-captcha-control>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, reactive, watch, computed, toRefs } from 'vue';

import type { WordClickCaptcha, Coordinate } from '@herodotus-cloud/framework-kernel';

import { useBehaviorCaptcha } from '@/composables/hooks';

import HBehaviorCaptchaBackground from './HBehaviorCaptchaBackground.vue';
import HBehaviorCaptchaControl from './HBehaviorCaptchaControl.vue';

export default defineComponent({
  name: 'HWordClickCaptcha',

  components: {
    HBehaviorCaptchaBackground,
    HBehaviorCaptchaControl,
  },

  props: {
    // 基础数据
    schema: { type: Object as PropType<WordClickCaptcha>, default: () => ({}), required: true },
    canvasWidth: { type: Number, default: 310 },
    canvasHeight: { type: Number, default: 155 },
    sliderSize: { type: Number, default: 30 },
    loading: { type: Boolean, default: false },
  },

  setup(props, { emit }) {
    const state = reactive({
      // 后台生成的背景图Base64
      backgroundImageBase64: '',
      // 默认需要点击的字数
      verifyWordCount: 3,
      prompt: '',
      flagCoordinate: [] as Array<Coordinate>,
      // 用户点击的坐标
      verifyCoordinate: [] as Array<Coordinate>,
      // 点击的记数;
      clickWordCount: 0,
    });

    const {
      getImage,
      message,
      canOperate,
      isLoading,
      isSuccess,
      isShowMessage,
      verifyCaptcha,
      reset,
    } = useBehaviorCaptcha();

    watch(
      () => props.schema,
      (newValue) => {
        resetStatus();
        state.backgroundImageBase64 = newValue.wordClickImageBase64;
        state.verifyWordCount = newValue.wordsCount;
        state.prompt = newValue.words;
        state.clickWordCount = 0;
      },
      {
        immediate: true,
      },
    );

    const resetStatus = () => {
      reset();
      state.flagCoordinate = [];
      state.verifyCoordinate = [];
      state.clickWordCount = 0;
    };

    const backgroundImage = computed(() => {
      return getImage(state.backgroundImageBase64);
    });

    const backgroundLoading = computed(() => {
      return props.loading || isLoading.value;
    });

    // 获取坐标
    const getMouseCoordinate = (e: any) => {
      var x = e.offsetX;
      var y = e.offsetY;
      return { x, y };
    };

    const onWordClick = (e: any) => {
      let coordinate = getMouseCoordinate(e);
      if (state.clickWordCount <= state.verifyWordCount) {
        state.verifyCoordinate.push(coordinate);
        state.flagCoordinate.push(coordinate);
        state.clickWordCount = ++state.clickWordCount;
      }

      if (state.clickWordCount === state.verifyWordCount) {
        verify();
      }
    };

    const verify = () => {
      verifyCaptcha(
        'WORD_CLICK',
        state.verifyCoordinate,
        () => {
          state.flagCoordinate = [];
          emit('verify', true);
        },
        () => {
          state.flagCoordinate = [];
          emit('verify', false);
          resetStatus();
          emit('reset');
        },
      );
    };

    return {
      ...toRefs(state),
      backgroundImage,
      onWordClick,
      message,
      canOperate,
      backgroundLoading,
      isSuccess,
      isShowMessage,
    };
  },
});
</script>
