<template>
  <q-inner-loading showing :color="color" style="z-index: 50">
    <component :is="type" :size="size" :color="color"></component>
  </q-inner-loading>
</template>

<script setup lang="ts">
import type { Spinners } from '@/lib';

import {
  QInnerLoading,
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
  QSpinnerTail,
} from 'quasar';

defineOptions({
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
    TAIL: QSpinnerTail,
    QInnerLoading,
  },
});

interface Props {
  type?: Spinners;
  color?: string;
  size?: string;
}

withDefaults(defineProps<Props>(), {
  type: 'DEFAULT',
  color: 'primary',
  size: '60px',
});
</script>
