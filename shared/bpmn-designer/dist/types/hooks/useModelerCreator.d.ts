import { default as BpmnModeler } from 'bpmn-js/lib/Modeler';
export default function useModelerCreator(containerHtmlId: string, panelHtmlId: string, type?: string): {
    createBpmnModeler: () => InstanceType<typeof BpmnModeler>;
};
