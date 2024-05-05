<template>
  <q-layout view="hHr lpR fFr" container :style="`height: ${height}`">
    <q-page-container>
      <q-page>
        <div class="designer-container designer-with-background" :style="`height: ${height}`">
          <h-bpmn-designer-toolbar></h-bpmn-designer-toolbar>
          <div class="main-content">
            <div id="designer" class="designer"></div>
            <div id="camunda-panel" class="camunda-panel"></div>
          </div>
        </div>
      </q-page>
    </q-page-container>
    <h-bpmn-property-panel
      :title="elementTitle"
      :icon="elementIcon"
      :type="elementType"
      :label="elementCaption"></h-bpmn-property-panel>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, watch, computed, PropType } from 'vue';
import { storeToRefs } from 'pinia';

import type { BpmnDesignerResources } from '/@/declarations';

import { useModelerCreator } from '/@/hooks';
import { useDesignerStore, useResourceStore, useSettingStore } from '/@/stores';

import { HBpmnPropertyPanel } from '../property-panel';
import HBpmnDesignerToolbar from './HBpmnDesignerToolbar.vue';

export default defineComponent({
  name: 'HBpmnDesigner',

  components: {
    HBpmnDesignerToolbar,
    HBpmnPropertyPanel
  },

  emits: ['close'],

  props: {
    instance: { type: Object as PropType<BpmnDesignerResources>, required: true },
    height: { type: String, default: '100vh' }
  },

  setup(props, { emit }) {
    const { create, destroy } = useModelerCreator();

    const designer = useDesignerStore();
    const settings = useSettingStore();
    const resource = useResourceStore();

    const { elementTitle, elementCaption, elementIcon, elementType } = storeToRefs(designer);

    const isOfficialPanel = computed(() => {
      return settings.useOfficialPanel;
    });

    watch(
      () => designer.isClosed,
      newValue => {
        if (newValue) {
          emit('close');
        }
      }
    );

    onBeforeUnmount(() => {
      destroy();
    });

    onMounted(() => {
      try {
        create();
        resource.init(props.instance);
      } catch (error) {
        // 临时解决 Camunda 相关内容首次加载过程中抛错，导致无法正常显示问题。
        // router.go(0);
      }
    });

    return {
      isOfficialPanel,
      elementTitle,
      elementIcon,
      elementCaption,
      elementType
    };
  }
});
</script>
