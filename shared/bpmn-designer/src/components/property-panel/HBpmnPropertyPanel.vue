<template>
  <q-drawer v-model="isShow" side="right" show-if-above bordered :width="400">
    <q-scroll-area class="fit">
      <q-list bordered class="rounded-borders">
        <h-head-panel :title="title" :icon="icon" :name="label"></h-head-panel>
        <component
          v-for="(element, index) in panelGroups"
          :is="parsePropertyPanelName(element.id)"
          :key="index"
        ></component>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { storeToRefs } from 'pinia';

import { useDesignerStore } from '@/stores';
import { lodash } from '@/lib/utils';

import {
  HAsynchronousContinuationsPanel,
  HCalledElementPanel,
  HCandidateStarterPanel,
  HCompensationPanel,
  HConditionPanel,
  HDocumentationPanel,
  HErrorPanel,
  HEscalationPanel,
  HExecutionListenerPanel,
  HExtensionPropertiesPanel,
  HFormPanel,
  HFieldInjectionPanel,
  HExternalTaskPanel,
  HGeneralPanel,
  HHeadPanel,
  HHistoryCleanupPanel,
  HImplementationPanel,
  HInMappingPanel,
  HInMappingPropagationPanel,
  HInputPanel,
  HJobExecutionPanel,
  HLinkPanel,
  HMessagePanel,
  HMultiInstancePanel,
  HOutMappingPanel,
  HOutMappingPropagationPanel,
  HOutputPanel,
  HScriptPanel,
  HSignalPanel,
  HStartInitiatorPanel,
  HTaskListenerPanel,
  HTasklistPanel,
  HTimerPanel,
  HUserAssignmentPanel,
} from './panels';

defineOptions({
  name: 'HBpmnPropertyPanel',
  components: {
    HAsynchronousContinuationsPanel,
    HCalledElementPanel,
    HCandidateStarterPanel,
    HCompensationPanel,
    HConditionPanel,
    HDocumentationPanel,
    HErrorPanel,
    HEscalationPanel,
    HExecutionListenerPanel,
    HExtensionPropertiesPanel,
    HFormPanel,
    HFieldInjectionPanel,
    HExternalTaskPanel,
    HGeneralPanel,
    HHeadPanel,
    HHistoryCleanupPanel,
    HImplementationPanel,
    HInMappingPanel,
    HInMappingPropagationPanel,
    HInputPanel,
    HJobExecutionPanel,
    HLinkPanel,
    HMessagePanel,
    HMultiInstancePanel,
    HOutMappingPanel,
    HOutMappingPropagationPanel,
    HOutputPanel,
    HScriptPanel,
    HSignalPanel,
    HStartInitiatorPanel,
    HTaskListenerPanel,
    HTasklistPanel,
    HTimerPanel,
    HUserAssignmentPanel,
  },
});

defineProps({
  title: { type: String, required: true },
  icon: { type: String, required: true },
  type: { type: String, required: true },
  label: { type: String, default: '' },
});

const isShow = ref<boolean>(true);

const designer = useDesignerStore();

const { panelGroups } = storeToRefs(designer);

const parsePropertyPanelName = (id: string) => {
  let result = id;

  const index = id.indexOf('__');
  if (index !== -1) {
    result = id.substring(index + 2);
  }

  result = lodash.upperFirst(result);

  return 'H' + result + 'Panel';
};

const thumbStyle = {
  right: '2px',
  borderRadius: '5px',
  backgroundColor: '#027be3',
  width: '5px',
  opacity: '0.75',
};
</script>
