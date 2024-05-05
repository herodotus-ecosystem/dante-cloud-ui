<template>
  <h-button-group>
    <h-button icon="mdi-align-horizontal-left" tooltip="向左对齐" @click="onAlignLeft()"></h-button>
    <h-separator />
    <h-button icon="mdi-align-horizontal-right" tooltip="向右对齐" @click="onAlignRight()"></h-button>
    <h-separator />
    <h-button icon="mdi-align-vertical-top" tooltip="向上对齐" @click="onAlignTop()"></h-button>
    <h-separator />
    <h-button icon="mdi-align-vertical-bottom" tooltip="向下对齐" @click="onAlignBottom()"></h-button>
    <h-separator />
    <h-button icon="mdi-align-horizontal-center" tooltip="水平居中" @click="onAlignHorizontalCenter()"></h-button>
    <h-separator />
    <h-button icon="mdi-align-vertical-center" tooltip="垂直居中" @click="onAlignVerticalCenter()"></h-button>
  </h-button-group>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';

import type { BpmnAlign, Selection, AlignElements, Modeling } from '/@/declarations';

import { useDesignerStore } from '/@/stores';
import { toast, lodash } from '/@/lib/utils';

import { HButton, HButtonGroup, HSeparator } from '../../widgets';

export default defineComponent({
  name: 'HAlignGroup',

  components: {
    HButton,
    HButtonGroup,
    HSeparator
  },

  setup(props) {
    const designer = useDesignerStore();

    let modeling = {} as Modeling;
    let selection = {} as Selection;
    let alignElements = {} as AlignElements;

    nextTick(() => {
      if (!lodash.isEmpty(designer.modeler)) {
        modeling = designer.modeler.get<Modeling>('modeling');
        selection = designer.modeler.get<Selection>('selection');
        alignElements = designer.modeler.get<AlignElements>('alignElements');
      }
    });

    const alignment = (align: BpmnAlign) => {
      if (modeling && selection) {
        const selectedElements = selection.get();
        if (!selectedElements || selectedElements.length <= 1) {
          toast.warning('请按住 Ctrl 键选择多个元素对齐');
          return;
        }
        alignElements.trigger(selectedElements, align);
      }
    };

    const onAlignLeft = () => {
      alignment('left');
    };

    const onAlignRight = () => {
      alignment('right');
    };

    const onAlignTop = () => {
      alignment('top');
    };

    const onAlignBottom = () => {
      alignment('bottom');
    };

    const onAlignHorizontalCenter = () => {
      alignment('center');
    };

    const onAlignVerticalCenter = () => {
      alignment('middle');
    };

    return {
      onAlignLeft,
      onAlignRight,
      onAlignTop,
      onAlignBottom,
      onAlignHorizontalCenter,
      onAlignVerticalCenter
    };
  }
});
</script>
