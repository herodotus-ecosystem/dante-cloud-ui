import type { Element } from '@/declarations';

import { getBusinessObject } from '@/lib/utils';
import { isEmpty } from 'lodash-es';

import usePropertyElement from './usePropertyElements';

export default function useFormsProperties() {
  const {
    getModeling,
    hasExtensionElements,
    getExtensionElements,
    getExtensionElementsValues,
    setExtensionElementsValues,
    createModdleElement,
    resetExtensionElementsValues,
  } = usePropertyElement();

  const getFormKeyValue = (element: Element): string => {
    const businessObject = getBusinessObject(element);
    return businessObject.formKey;
  };

  const setFormKeyValue = (element: Element, value: string): void => {
    getModeling().updateProperties(element, { formKey: value });
  };

  const getFormRefValue = (element: Element): string => {
    const businessObject = getBusinessObject(element);
    return businessObject.formRef;
  };

  const setFormRefValue = (element: Element, value: string): void => {
    getModeling().updateProperties(element, { formRef: value });
  };

  const getFormRefVersionValue = (element: Element): string => {
    const businessObject = getBusinessObject(element);
    return businessObject.formRefVersion;
  };

  const setFormRefVersionValue = (element: Element, value: string): void => {
    getModeling().updateProperties(element, { formRefVersion: value });
  };

  const getFormRefBindingValue = (element: Element): string => {
    const businessObject = getBusinessObject(element);
    return businessObject.formRefBinding;
  };

  const setFormRefBindingValue = (element: Element, value: string): void => {
    getModeling().updateProperties(element, { formRefBinding: value });
  };

  const setGeneratedTaskFormsValues = (element: Element): void => {
    const extensionElements = getExtensionElements(element);
    let values = getExtensionElementsValues(extensionElements);
    if (isEmpty(values)) {
      values = createModdleElement('camunda:FormData', { fields: [] }, extensionElements);
      setExtensionElementsValues(element, extensionElements, values);
    }
  };

  const resetGeneratedTaskFormsValues = (element: Element): void => {
    if (hasExtensionElements(element)) {
      const extensionElements = getExtensionElements(element);
      const values = getExtensionElementsValues(extensionElements);
      if (!isEmpty(values)) {
        resetExtensionElementsValues(element, extensionElements);
      }
    }
  };

  const resetProperties = (element: Element) => {
    getModeling().updateProperties(element, {});
  };

  return {
    getFormKeyValue,
    setFormKeyValue,
    getFormRefValue,
    setFormRefValue,
    getFormRefVersionValue,
    setFormRefVersionValue,
    getFormRefBindingValue,
    setFormRefBindingValue,
    setGeneratedTaskFormsValues,
    resetGeneratedTaskFormsValues,
    resetProperties,
    hasExtensionElements,
  };
}
