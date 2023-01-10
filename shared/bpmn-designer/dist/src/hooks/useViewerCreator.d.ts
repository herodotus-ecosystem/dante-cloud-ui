import BpmnViewer from 'bpmn-js/lib/Viewer';
export default function useViewerCreator(containerHtmlId: string): {
    createBpmnViewer: () => InstanceType<typeof BpmnViewer>;
};
