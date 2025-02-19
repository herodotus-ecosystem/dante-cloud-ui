<template>
  <div :id="id">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import { tsParticles } from '@tsparticles/engine';
import { loadBasic } from '@tsparticles/basic';
import { loadParticlesLinksInteraction } from '@tsparticles/interaction-particles-links';

import type { Container, Engine } from '@/lib/declarations';

import { options } from './particles';

export default defineComponent({
  name: 'HParticles',

  setup() {
    const id = ref('HParticles');

    let container: Container | undefined;

    const loadTrianglesPreset = async (engine: Engine, refresh = true): Promise<void> => {
      await loadBasic(engine, false);
      await loadParticlesLinksInteraction(engine, false);

      await engine.addPreset('triangles', options, refresh);
    };

    onMounted(() => {
      nextTick(async () => {
        tsParticles.init();

        await loadTrianglesPreset(tsParticles);

        container = await tsParticles.load({
          id: id.value,
          options: {
            fullScreen: {
              zIndex: 1,
            },
            preset: 'triangles',
          },
        });
      });
    });

    onUnmounted(() => {
      if (container) {
        container.destroy();
        container = undefined;
      }
    });

    return {
      id,
    };
  },
});
</script>
