import BpmnViewer from 'bpmn-js/lib/Viewer';

import { lodash, exception } from '/@/lib';

export default function useViewerCreator(
  containerHtmlId: string,
  height: string | number | undefined,
  width: string | number | undefined,
  highlightNodes: Array<string>
) {
  let bpmnViewer: InstanceType<typeof BpmnViewer> = {};

  const createBpmnViewer = (): InstanceType<typeof BpmnViewer> => {
    return new BpmnViewer({
      container: containerHtmlId,
      height: height,
      width: width
    });
  };

  const importDiagram = (diagram: string) => {
    bpmnViewer.importXML(diagram, (error: any) => {
      if (error) {
        exception('Could not create BPMN 2.0 diagram!', error);
      } else {
        const canvas = bpmnViewer.get('canvas');
        canvas.zoom('fit-viewport', 'auto');
        if (lodash.isEmpty(highlightNodes)) {
          highlightNodes.forEach(item => {
            canvas.addMarker(item, 'highlight');
          });
        }
      }
    });
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
