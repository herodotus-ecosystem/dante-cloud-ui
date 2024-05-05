import type { Element } from '/@/declarations';

import { getBusinessObject } from '/@/lib/utils';

import usePropertyElement from './usePropertyElements';

export default function useStartInitiatorProperties() {
  const { getModeling } = usePropertyElement();

  const getInitiatorValue = (element: Element): string => {
    const businessObject = getBusinessObject(element);
    return businessObject.initiator;
  };

  const setInitiatorValue = (element: Element, value: string): void => {
    getModeling().updateProperties(element, { initiator: value });
  };

  return {
    getInitiatorValue,
    setInitiatorValue
  };
}
