import type { Ref } from 'vue';
import { ref } from 'vue';

import type { BpmnUnionPathParams, XmlEntity } from '@/lib/declarations';
import { bpmnApi, lodash } from '@/lib/utils';

export default function useBpmnModeler() {
  const xml = ref('');
  const activityNodes = ref() as Ref<Array<string>>;

  const loadXml = (params: BpmnUnionPathParams) => {
    if (params.id || params.key) {
      bpmnApi
        .processDefinition()
        .getXml(params)
        .then((result) => {
          console.log(result);
          const data = result as XmlEntity;
          xml.value = data.bpmn20Xml;
        })
        .catch((error) => {
          console.error('Get Diagram Error!', error);
        });
    }
  };

  const loadDiagram = (params: BpmnUnionPathParams, processInstanceId = '') => {
    if (!processInstanceId) {
      loadXml(params);
    } else {
      bpmnApi
        .historyActivityInstance()
        .getAll(
          { sortBy: 'startTime', sortOrder: 'desc' },
          { processInstanceId: processInstanceId },
        )
        .then((result) => {
          if (!lodash.isEmpty(result)) {
            const nodes = lodash.map(result, 'activityId');
            activityNodes.value = nodes;
            loadXml(params);
          }
        });
    }
  };

  return {
    xml,
    activityNodes,
    loadXml,
    loadDiagram,
  };
}
