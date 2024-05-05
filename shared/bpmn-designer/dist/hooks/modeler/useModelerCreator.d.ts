import { default as Modeler } from 'bpmn-js/lib/Modeler';

export default function useModelerCreator(): {
    createBpmnModeler: (containerHtmlId: string, panelHtmlId: string) => Modeler;
    createNewDiagram: (diagram?: string) => Promise<void>;
    create: (diagram?: string) => void;
    destroy: () => void;
};
