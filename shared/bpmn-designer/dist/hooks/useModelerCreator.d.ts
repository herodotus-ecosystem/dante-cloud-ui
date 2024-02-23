/// <reference types="" />
import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import '@bpmn-io/properties-panel/assets/properties-panel.css';
export default function useModelerCreator(containerHtmlId: string, panelHtmlId: string, type?: string): {
    createBpmnModeler: () => InstanceType<typeof BpmnModeler>;
};
