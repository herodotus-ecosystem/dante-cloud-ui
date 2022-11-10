<template>
  <Particles id="htsparticles" :particlesInit="particlesInit" :options="particlesOptions">
    <slot></slot>
  </Particles>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { ParticlesComponent as Particles } from 'particles.vue3';
import { currentOptions } from './particles';
import { loadFull } from 'tsparticles';
import * as lodash from 'lodash-es';

export default defineComponent({
  name: 'HParticles',

  components: {
    Particles
  },

  setup() {
    const particlesInit = async (engine: any) => {
      await loadFull(engine);
    };

    const particlesOptions = lodash.cloneDeep(currentOptions);

    return {
      particlesInit,
      particlesOptions
    };
  }
});
</script>
