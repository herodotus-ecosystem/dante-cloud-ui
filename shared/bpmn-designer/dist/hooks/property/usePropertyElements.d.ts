import { ModdleElement, Modeler, Modeling, Canvas, Element, BpmnFactory } from '../../declarations';

export default function usePropertyElements(): {
    processEngine: "flowable" | "activiti" | "camunda";
    getModeler: () => Modeler;
    getModeling: () => Modeling;
    getCanvas: () => Canvas;
    getBpmnFactory: () => BpmnFactory;
    getRelevantBusinessObject: (element: Element) => any;
    createModdleElement: (type: string, properties: Record<string, any>, parent?: any) => ModdleElement;
    hasExtensionElements: (element: Element) => boolean;
    getExtensionElements: (element: Element) => ModdleElement;
    getExtensionElementsValues: (extensionElements: ModdleElement) => Array<ModdleElement>;
    getFirstExtensionElementsValue: (extensionElements: ModdleElement) => ModdleElement;
    setExtensionElementsValues: (parentElement: Element, extensionElements: ModdleElement, values: Array<ModdleElement>) => void;
    resetExtensionElementsValues: (element: Element, extensionElements: ModdleElement) => ModdleElement;
};
