import BpmnViewer from 'bpmn-js/lib/Viewer';

import { lodash, exception } from '/@/lib';

export default function useViewerCreator(
  containerHtmlId: string,
  height: string | number | undefined,
  highlightNodes: Array<string>
) {
  let bpmnViewer: InstanceType<typeof BpmnViewer> = {};

  const getAction = (action: string) => {
    return bpmnViewer.get(action);
  };

  const getCanvas = () => {
    return getAction('canvas');
  };

  const resetZoom = () => {
    getCanvas().zoom('fit-viewport', 'auto');
  };

  const createBpmnViewer = (): InstanceType<typeof BpmnViewer> => {
    return new BpmnViewer({
      container: containerHtmlId,
      height: height
    });
  };

  const importDiagram = async (diagram: string) => {
    await bpmnViewer.importXML(diagram);

    const canvas = bpmnViewer.get('canvas');
    canvas.zoom('fit-viewport', 'auto');

    if (!lodash.isEmpty(highlightNodes)) {
      highlightNodes.forEach(item => {
        canvas.addMarker(item, 'highlight');
        const ele = document.querySelector('.highlight')?.querySelector('.djs-visual rect');
        if (ele) {
          ele.setAttribute('stroke-dasharray', '4,4');
        }
      });
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
