import type {
  Moddle,
  ModdleElement,
  Modeler,
  Modeling,
  Canvas,
  Element,
  BpmnFactory,
} from '@/declarations';

import { lodash, getBusinessObject, is } from '@/lib/utils';

import { useDesignerStore, useSettingStore } from '@/stores';

export default function usePropertyElements() {
  const designer = useDesignerStore();
  const setting = useSettingStore();

  const { processEngine } = setting;

  const getModeler = (): Modeler => {
    return designer.modeler;
  };

  const getModeling = (): Modeling => {
    return designer.modeling;
  };

  const getModdle = (): Moddle => {
    return designer.moddle;
  };

  const getCanvas = (): Canvas => {
    return designer.canvas;
  };

  const getBpmnFactory = (): BpmnFactory => {
    return getModeler().get<BpmnFactory>('bpmnFactory');
  };

  const isBpmnParticipant = (element: Element): boolean => {
    return is(element, 'bpmn:Participant');
  };

  const getRelevantBusinessObject = (element: Element) => {
    const businessObject = getBusinessObject(element);
    if (isBpmnParticipant(element)) {
      return businessObject.get('processRef');
    }
    return businessObject;
  };

  const createModdleElement = (
    type: string,
    properties: Record<string, any>,
    parent = {} as Element | ModdleElement,
  ): ModdleElement => {
    const moddle = getModdle();
    const element = moddle.create(type, properties);
    parent && (element.$parent = parent);
    return element;
  };

  const hasExtensionElements = (element: Element) => {
    const businessObject = getBusinessObject(element);
    return !!businessObject.extensionElements;
  };

  const getExtensionElements = (element: Element): ModdleElement => {
    const businessObject = getBusinessObject(element);
    let extensionElements = businessObject.extensionElements;
    if (lodash.isEmpty(extensionElements)) {
      extensionElements = createModdleElement(
        'bpmn:ExtensionElements',
        { values: [] },
        businessObject,
      );
      getModeling().updateModdleProperties(element, businessObject, { extensionElements });
    }
    return extensionElements;
  };

  const getExtensionElementsValues = (extensionElements: ModdleElement): Array<ModdleElement> => {
    return !lodash.isEmpty(extensionElements.values) ? extensionElements.values : [];
  };

  const getFirstExtensionElementsValue = (extensionElements: ModdleElement): ModdleElement => {
    const values = getExtensionElementsValues(extensionElements);
    return !lodash.isEmpty(values) ? values[0] : ({} as ModdleElement);
  };

  const setExtensionElementsValues = (
    parentElement: Element,
    extensionElements: ModdleElement,
    values: Array<ModdleElement>,
  ) => {
    getModeling().updateModdleProperties(parentElement, extensionElements, {
      values: [...extensionElements.get('values'), ...values],
    });
  };

  const resetExtensionElementsValues = (
    element: Element,
    extensionElements: ModdleElement,
  ): ModdleElement => {
    getModeling().updateModdleProperties(element, extensionElements, {
      values: [],
    });
  };

  return {
    processEngine,
    getModeler,
    getModeling,
    getCanvas,
    getBpmnFactory,
    getRelevantBusinessObject,
    createModdleElement,
    hasExtensionElements,
    getExtensionElements,
    getExtensionElementsValues,
    getFirstExtensionElementsValue,
    setExtensionElementsValues,
    resetExtensionElementsValues,
  };
}
