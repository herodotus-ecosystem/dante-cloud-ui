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
    >
      <img
        class="jigsaw-slider"
        :src="jigsawImage"
        :height="canvasHeight"
        :style="`transform:translateX(${styleWidth - sliderSize}px)`"
      />
    </h-behavior-captcha-background>
    <h-behavior-captcha-control description="拖动滑块完成拼图" :size="sliderSize">
      <div class="range-slider" ref="RangeSlider" :style="`width:${styleWidth}px`">
        <div
          :class="['range-btn', { isDown: isMouseDown }]"
          :style="`width:${sliderSize}px`"
          @mousedown="onRangeMouseDown($event)"
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </h-behavior-captcha-control>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  onMounted,
  onBeforeMount,
  watch,
  computed,
} from 'vue';

import type { JigsawCaptcha } from '@herodotus-cloud/framework-kernel';
import { useBehaviorCaptcha } from '@/composables/hooks';

import HBehaviorCaptchaBackground from './HBehaviorCaptchaBackground.vue';
import HBehaviorCaptchaControl from './HBehaviorCaptchaControl.vue';

export default defineComponent({
  name: 'HJigsawCaptcha',

  components: {
    HBehaviorCaptchaBackground,
    HBehaviorCaptchaControl,
  },

  props: {
    schema: { type: Object as PropType<JigsawCaptcha>, default: () => ({}) },
    canvasWidth: { type: Number, default: 310 },
    canvasHeight: { type: Number, default: 155 },
    sliderSize: { type: Number, default: 30 },
    loading: { type: Boolean, default: false },
  },

  setup(props, { emit }) {
    const RangeSlider = ref<HTMLDivElement | null>(null);

    const state = reactive({
      // 后台生成的背景图Base64
      backgroundImageBase64: '',
      // 后台生成的拼图滑块Base64
      jigsawImageBase64: '',
      // 鼠标点下去时父级的width
      startWidth: 50,
      // 鼠标按下时的X
      startX: 0,
      // 鼠标当前的偏移X
      newX: 0,
      // 鼠标是否在按钮上按下
      isMouseDown: false,
      // 为了解决Mac上的click BUG
      isCloseDown: false,
    });

    const {
      getImage,
      timeoutClear,
      message,
      canOperate,
      isSuccess,
      isLoading,
      isShowMessage,
      verifyCaptcha,
      reset,
    } = useBehaviorCaptcha();

    onMounted(() => {
      addEventListener();
    });

    onBeforeMount(() => {
      removeEventListener();
    });

    /**
     * 添加移动/结束事件监听
     */
    const addEventListener = () => {
      document.addEventListener('mousemove', onRangeMouseMove, false);
      document.addEventListener('mouseup', onRangeMouseUp, false);
    };

    /**
     * 移除移动/结束事件监听
     */
    const removeEventListener = () => {
      timeoutClear();
      // document.body.removeChild(this.$el);
      document.removeEventListener('mousemove', onRangeMouseMove, false);
      document.removeEventListener('mouseup', onRangeMouseUp, false);
    };

    watch(
      () => props.schema,
      (newValue) => {
        resetStatus();
        state.backgroundImageBase64 = newValue.originalImageBase64;
        state.jigsawImageBase64 = newValue.sliderImageBase64;
      },
    );

    const resetStatus = () => {
      reset();
      // 鼠标点下去时父级的width
      state.startWidth = props.sliderSize;
      // 鼠标按下时的X
      state.startX = 0;
      // 鼠标当前的偏移X
      state.newX = 0;
    };

    /**
     * styleWidth是底部用户操作的滑块的父级，就是轨道在鼠标的作用下应该具有的宽度
     */
    const styleWidth = computed(() => {
      const w = state.startWidth + state.newX - state.startX;
      return w < props.sliderSize
        ? props.sliderSize
        : w > props.canvasWidth
          ? props.canvasWidth
          : w;
    });

    const backgroundImage = computed(() => {
      return getImage(state.backgroundImageBase64);
    });

    const jigsawImage = computed(() => {
      return getImage(state.jigsawImageBase64);
    });

    const backgroundLoading = computed(() => {
      return props.loading || isLoading.value;
    });

    // 鼠标按下准备拖动
    const onRangeMouseDown = (e: MouseEvent) => {
      if (canOperate) {
        state.isMouseDown = true;
        const slider = RangeSlider.value as HTMLDivElement;
        state.startWidth = slider.clientWidth;
        state.newX = e.clientX;
        state.startX = e.clientX;
      }
    };

    // 鼠标移动
    const onRangeMouseMove = (e: MouseEvent) => {
      if (state.isMouseDown) {
        e.preventDefault();
        state.newX = e.clientX;
      }
    };

    // 鼠标抬起
    const onRangeMouseUp = () => {
      if (state.isMouseDown) {
        state.isMouseDown = false;
        verify();
      }
    };

    const verify = () => {
      verifyCaptcha(
        'JIGSAW',
        { x: state.newX - state.startX, y: 5 },
        () => {
          emit('verify', true);
        },
        () => {
          emit('verify', false);
          resetStatus();
          emit('reset');
        },
      );
    };

    return {
      ...toRefs(state),
      backgroundImage,
      jigsawImage,
      styleWidth,
      onRangeMouseDown,
      RangeSlider,
      message,
      isSuccess,
      isShowMessage,
      backgroundLoading,
    };
  },
});
</script>

<style lang="scss">
.jigsaw-slider {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 2;
}

.range-slider {
  position: absolute;
  height: 100%;
  width: 50px;
  background-color: rgba(106, 160, 255, 0.8);
  border-radius: 3px;
}

.range-slider .range-btn {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  width: 50px;
  height: 100%;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 0 4px #ccc;
  cursor: pointer;
  & > div {
    width: 0;
    height: 40%;
    transition: all 200ms;
    border: solid 1px #6aa0ff;
    &:nth-child(2) {
      margin: 0 4px;
    }
  }
  &:hover,
  &.isDown {
    & > div:first-child {
      border: solid 4px transparent;
      height: 0;
      border-right-color: #6aa0ff;
    }
    & > div:nth-child(2) {
      border-width: 3px;
      height: 0;
      border-radius: 3px;
      margin: 0 6px;
      border-right-color: #6aa0ff;
    }
    & > div:nth-child(3) {
      border: solid 4px transparent;
      height: 0;
      border-left-color: #6aa0ff;
    }
  }
}
</style>
