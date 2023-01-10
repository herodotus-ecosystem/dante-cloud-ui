import BpmnViewer from 'bpmn-js/lib/Viewer';

export default function useViewerCreator(containerHtmlId: string) {
  const createBpmnViewer = (): InstanceType<typeof BpmnViewer> => {
    return new BpmnViewer({
      container: containerHtmlId
    });
  };

  return {
    createBpmnViewer
  };
}
