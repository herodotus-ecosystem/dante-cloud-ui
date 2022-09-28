<template>
  <q-inner-loading showing :color="color" style="z-index: 50">
    <component :is="type" :size="size" :color="color"></component>
  </q-inner-loading>
</template>

<script lang="ts">
import {
  QSpinner,
  QSpinnerAudio,
  QSpinnerBall,
  QSpinnerBars,
  QSpinnerBox,
  QSpinnerClock,
  QSpinnerComment,
  QSpinnerCube,
  QSpinnerDots,
  QSpinnerFacebook,
  QSpinnerGears,
  QSpinnerGrid,
  QSpinnerHearts,
  QSpinnerHourglass,
  QSpinnerInfinity,
  QSpinnerIos,
  QSpinnerOrbit,
  QSpinnerOval,
  QSpinnerPie,
  QSpinnerPuff,
  QSpinnerRadio,
  QSpinnerRings,
  QSpinnerTail
} from 'quasar';
import { defineComponent, PropType } from 'vue';

import { Spinners } from '/@/lib';

export default defineComponent({
  name: 'HLoading',

  components: {
    DEFAULT: QSpinner,
    AUDIO: QSpinnerAudio,
    BALL: QSpinnerBall,
    BARS: QSpinnerBars,
    BOX: QSpinnerBox,
    CLOCK: QSpinnerClock,
    COMMENT: QSpinnerComment,
    CUBE: QSpinnerCube,
    DOTS: QSpinnerDots,
    FACEBOOK: QSpinnerFacebook,
    GEARS: QSpinnerGears,
    GRID: QSpinnerGrid,
    HEARTS: QSpinnerHearts,
    HOURGLASS: QSpinnerHourglass,
    INFINITY: QSpinnerInfinity,
    IOS: QSpinnerIos,
    ORBIT: QSpinnerOrbit,
    OVAL: QSpinnerOval,
    PIE: QSpinnerPie,
    PUFF: QSpinnerPuff,
    RADIO: QSpinnerRadio,
    RINGS: QSpinnerRings,
    TAIL: QSpinnerTail
  },

  props: {
    type: { type: String as PropType<Spinners>, default: 'default' },
    color: { type: String, default: 'primary' },
    size: { type: String, default: '60px' }
  }
});
</script>
