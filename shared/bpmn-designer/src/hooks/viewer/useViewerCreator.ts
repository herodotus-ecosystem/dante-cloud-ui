import type { Canvas, Viewer } from '/@/declarations';

import BpmnViewer from 'bpmn-js/lib/Viewer';

import { lodash } from '/@/lib/utils';

export default function useViewerCreator(
  containerHtmlId: string,
  height: string | number | undefined,
  highlightNodes: Array<string>
) {
  let bpmnViewer = {} as Viewer;

  const createBpmnViewer = (): InstanceType<typeof BpmnViewer<null>> => {
    return new BpmnViewer({
      container: containerHtmlId,
      height: height
    });
  };

  const importDiagram = async (diagram: string) => {
    await bpmnViewer.importXML(diagram);

    const canvas = bpmnViewer.get<Canvas>('canvas');
    canvas.zoom('fit-viewport', { x: 0, y: 0 });

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
    }
  };

  return {
    init,
    destroy
  };
}
