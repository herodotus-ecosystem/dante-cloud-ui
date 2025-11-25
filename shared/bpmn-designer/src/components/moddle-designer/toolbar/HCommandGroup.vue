<template>
  <h-button-group>
    <h-button icon="mdi-undo-variant" tooltip="撤销" @click="onUndo" />
    <h-separator />
    <h-button icon="mdi-redo-variant" tooltip="恢复" @click="onRedo" />
    <h-separator />
    <h-button icon="mdi-eraser" tooltip="擦除重做" @click="onRestart()" />
  </h-button-group>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';

import type { CommandStack } from '@/declarations';

import { useDesignerStore } from '@/stores';
import { useModelerCreator } from '@/hooks';

import { HButton, HButtonGroup, HSeparator } from '../../widgets';
import { lodash } from '@/lib/utils';

export default defineComponent({
  name: 'HCommandGroup',

  components: {
    HButton,
    HButtonGroup,
    HSeparator,
  },

  setup() {
    const { createNewDiagram } = useModelerCreator();
    const designer = useDesignerStore();

    let command = {} as CommandStack;

    nextTick(() => {
      if (!lodash.isEmpty(designer.modeler)) {
        command = designer.modeler.get<CommandStack>('commandStack');
      }
    });

    const onUndo = () => {
      command && command.undo();
    };

    const onRedo = () => {
      command && command.redo();
    };

    const onRestart = () => {
      command && command.clear();
      createNewDiagram();
    };

    return {
      onUndo,
      onRedo,
      onRestart,
    };
  },
});
</script>
