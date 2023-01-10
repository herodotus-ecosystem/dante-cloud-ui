<template>
  <q-card>
    <div id="bpmn-viewer" class="bpmn-viewer-canvas"></div>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, PropType } from 'vue';

import { useViewerOperator } from '../hooks';

export default defineComponent({
  name: 'HBpmnViewer',

  props: {
    diagram: { type: String, default: '' },
    type: { type: String as PropType<'camunda' | 'flowable' | 'activiti'>, default: 'camunda' }
  },

  setup(props) {
    const { init, destroy } = useViewerOperator('#bpmn-viewer');

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
  }
});
</script>
