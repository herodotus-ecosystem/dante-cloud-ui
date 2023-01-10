import BpmnViewer from 'bpmn-js/lib/Viewer';

import useViewerCreator from './useViewerCreator';
import { lodash, exception } from '/@/lib';

export default function useViewerOperator(containerHtmlId: string) {
  let bpmnViewer: InstanceType<typeof BpmnViewer> = {};

  const { createBpmnViewer } = useViewerCreator(containerHtmlId);

  const importDiagram = async (diagram: string) => {
    try {
      const result = await bpmnViewer.importXML(diagram);
      const { warnings } = result;
    } catch (error) {
      exception('Could not create BPMN 2.0 diagram!', error);
    }
  };

  const init = (diagram: string) => {
    bpmnViewer = createBpmnViewer();
    importDiagram(diagram);
  };

  const destroy = () => {
    if (!lodash.isEmpty(bpmnViewer)) {
      bpmnViewer.destroy();
      bpmnViewer = {};
    }
  };

  return {
    init,
    destroy
  };
}
