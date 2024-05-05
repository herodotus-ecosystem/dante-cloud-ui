import type { Element } from '/@/declarations';

import { getBusinessObject } from '/@/lib/utils';

import usePropertyElement from './usePropertyElements';

export default function useAsynchronousContinuationsProperties() {
  const { getModeling } = usePropertyElement();

  const getBeforeValue = (element: Element): boolean => {
    const businessObject = getBusinessObject(element);
    return businessObject.asyncBefore;
  };

  const setBeforeValue = (element: Element, value: boolean): void => {
    getModeling().updateProperties(element, { asyncBefore: value });
  };

  const getAfterValue = (element: Element): boolean => {
    const businessObject = getBusinessObject(element);
    return businessObject.asyncAfter;
  };

  const setAfterValue = (element: Element, value: boolean): void => {
    getModeling().updateProperties(element, { asyncAfter: value });
  };

  const getExclusiveValue = (element: Element): boolean => {
    const businessObject = getBusinessObject(element);
    return businessObject.exclusive;
  };

  const setExclusiveValue = (element: Element, value: boolean): void => {
    getModeling().updateProperties(element, { exclusive: value });
  };

  return {
    getBeforeValue,
    setBeforeValue,
    getAfterValue,
    setAfterValue,
    getExclusiveValue,
    setExclusiveValue
  };
}
