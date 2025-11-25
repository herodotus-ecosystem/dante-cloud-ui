<template>
  <q-file
    v-model="diagramFile"
    dense
    filled
    label="打开"
    label-color="primary"
    class="text-no-wrap"
    style="max-width: 200px"
  >
    <template v-slot:prepend>
      <q-icon name="mdi-folder-open" color="primary" @click.stop.prevent />
    </template>
    <template v-slot:append>
      <q-icon
        v-if="diagramFile !== null"
        name="close"
        @click.stop.prevent="clear"
        class="cursor-pointer"
      />
    </template>
  </q-file>
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { defineComponent, ref, watch } from 'vue';

import { useModelerCreator } from '@/hooks';
import { toast } from '@/lib/utils';

export default defineComponent({
  name: 'HOpenFile',

  setup() {
    const diagramFile = ref(null) as Ref<File | null>;

    const { createNewDiagram } = useModelerCreator();

    const readOpenedFileContent = async (file: File | null) => {
      if (file) {
        const content = await file.text();
        if (content) {
          createNewDiagram(content);
        }
      } else {
        toast.error('无法打开该文件！');
      }
    };

    const clear = () => {
      diagramFile.value = null;
      createNewDiagram();
    };

    watch(diagramFile, (newValue: File | null) => {
      if (newValue) {
        readOpenedFileContent(newValue);
      }
    });

    return {
      diagramFile,
      clear,
    };
  },
});
</script>

<style lang="scss" scoped>
.q-field--dense .q-field__marginal {
  height: 35px !important;
}

.q-field--dense .q-field__label {
  font-size: 14px;
  top: 7px !important;
}
</style>
