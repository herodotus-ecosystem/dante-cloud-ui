import BpmnModeler from 'bpmn-js/lib/Modeler';
export default function useModelerCreator(containerHtmlId: string, panelHtmlId: string, type?: string, isViewer?: boolean): {
    createBpmnModeler: () => InstanceType<typeof BpmnModeler>;
};
