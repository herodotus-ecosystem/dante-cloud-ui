<template>
  <div id="bpmn-viewer" class="bpmn-viewer-canvas"></div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, onMounted, onBeforeUnmount } from 'vue';

import { useViewerCreator } from '../hooks';

export default defineComponent({
  name: 'HBpmnViewer',

  props: {
    diagram: { type: String, default: '' },
    nodes: { type: Array as PropType<Array<string>>, default: () => [] },
    height: { type: [String, Number], default: '500px' },
  },

  setup(props) {
    const { init, destroy } = useViewerCreator('#bpmn-viewer', props.height, props.nodes);

    onBeforeUnmount(() => {
      destroy();
    });

    onMounted(() => {
      try {
        init(props.diagram);
      } catch (error) {
        // 临时解决 Camunda 相关内容首次加载过程中抛错，导致无法正常显示问题。
        // router.go(0);
      }
    });

    return {};
  },
});
</script>
