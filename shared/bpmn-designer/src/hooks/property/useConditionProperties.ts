import type { Element, ModdleElement } from '@/declarations';

import { lodash, getBusinessObject } from '@/lib/utils';

import usePropertyElement from './usePropertyElements';

export default function useConditionProperties() {
  const { getModeling, createModdleElement } = usePropertyElement();

  const fetchConditionExpression = (element: Element, create = false): ModdleElement => {
    const businessObject = getBusinessObject(element);
    let conditionExpression = businessObject.conditionExpression;

    if (!lodash.isEmpty(conditionExpression)) {
      return conditionExpression;
    } else {
      if (create) {
        conditionExpression = createModdleElement('bpmn:FormalExpression', {}, businessObject);
        getModeling().updateModdleProperties(element, businessObject, { conditionExpression });
        return conditionExpression;
      } else {
        return {} as ModdleElement;
      }
    }
  };

  const getConditionExpressionValue = (element: Element): string => {
    const conditionExpression = fetchConditionExpression(element);
    return !lodash.isEmpty(conditionExpression) ? conditionExpression.body : '';
  };

  const setConditionExpressionValue = (element: Element, value: string): void => {
    const conditionExpression = fetchConditionExpression(element, true);
    getModeling().updateModdleProperties(element, conditionExpression, { body: value });
  };

  const getFormatValue = (element: Element): string => {
    const conditionExpression = fetchConditionExpression(element);
    return !lodash.isEmpty(conditionExpression) ? conditionExpression.language : '';
  };

  const setFormatValue = (element: Element, value: string): void => {
    const conditionExpression = fetchConditionExpression(element, true);
    getModeling().updateModdleProperties(element, conditionExpression, { language: value });
  };

  const getResourceValue = (element: Element): string => {
    const conditionExpression = fetchConditionExpression(element);
    return !lodash.isEmpty(conditionExpression) ? conditionExpression.resource : '';
  };

  const setResourceValue = (element: Element, value: string): void => {
    const conditionExpression = fetchConditionExpression(element, true);
    getModeling().updateModdleProperties(element, conditionExpression, { resource: value });
  };

  const getScriptValue = (element: Element): string => {
    return getConditionExpressionValue(element);
  };

  const setScriptValue = (element: Element, value: string): void => {
    const conditionExpression = fetchConditionExpression(element, true);
    getModeling().updateModdleProperties(element, conditionExpression, { body: value });
  };

  const resetConditionExpression = (element: Element) => {
    const businessObject = getBusinessObject(element);
    let conditionExpression = businessObject.conditionExpression;

    conditionExpression = createModdleElement('bpmn:FormalExpression', {}, businessObject);
    getModeling().updateModdleProperties(element, businessObject, { conditionExpression });
  };

  return {
    getConditionExpressionValue,
    setConditionExpressionValue,
    getFormatValue,
    setFormatValue,
    getResourceValue,
    setResourceValue,
    getScriptValue,
    setScriptValue,
    resetConditionExpression,
  };
}
