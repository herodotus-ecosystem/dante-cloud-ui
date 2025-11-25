import type { Element } from '@/declarations';

import { getBusinessObject, is } from 'bpmn-js/lib/util/ModelUtil';
import { isEventSubProcess, isExpanded, isInterrupting } from 'bpmn-js/lib/util/DiUtil';
import { isPlane } from 'bpmn-js/lib/util/DrilldownUtil';

const getRawType = (type: string) => {
  return type.split(':')[1];
};

const getEventDefinition = (businessObject: any) => {
  const eventDefinitions = businessObject.eventDefinitions;
  return eventDefinitions && eventDefinitions[0];
};

const getEventDefinitionRawType = (eventDefinition: any): string => {
  const rawType = getRawType(eventDefinition.$type) as string;
  return rawType.replace('EventDefinition', '');
};

const isDefaultFlow = (element: Element): boolean => {
  const businessObject = getBusinessObject(element);
  const sourceBusinessObject = getBusinessObject(element.source);

  if (!is(element, 'bpmn:SequenceFlow') || !sourceBusinessObject) return false;

  return (
    sourceBusinessObject.default &&
    sourceBusinessObject.default === businessObject &&
    (is(sourceBusinessObject, 'bpmn:Gateway') || is(sourceBusinessObject, 'bpmn:Activity'))
  );
};

const isConditionalFlow = (element: any): boolean => {
  const businessObject = getBusinessObject(element);
  const sourceBusinessObject = getBusinessObject(element.source);

  if (!is(element, 'bpmn:SequenceFlow') || !sourceBusinessObject) return false;

  return businessObject.conditionExpression && is(sourceBusinessObject, 'bpmn:Activity');
};

const parseElementType = (element: Element): string => {
  const { type: elementType } = element;

  let type = getRawType(elementType);

  const businessObject = getBusinessObject(element);

  // (1) event definition types
  const eventDefinition = getEventDefinition(businessObject);
  if (eventDefinition) {
    type = `${getEventDefinitionRawType(eventDefinition)}${type}`;

    // (1.1) interrupting / non interrupting
    if (
      (is(element, 'bpmn:StartEvent') && !isInterrupting(element)) ||
      (is(element, 'bpmn:BoundaryEvent') && businessObject.cancelActivity === false)
    ) {
      type = `${type}NonInterrupting`;
    }
    return type;
  }

  // (2) sub process types
  if (is(element, 'bpmn:SubProcess') && !is(element, 'bpmn:Transaction')) {
    if (isEventSubProcess(element)) {
      type = `Event${type}`;
    } else {
      const expanded = isExpanded(element) && !isPlane(element);
      type = `${expanded ? 'Expanded' : 'Collapsed'}${type}`;
    }
  }

  // (3) conditional + default flows
  if (isDefaultFlow(element)) {
    type = 'DefaultFlow';
  }

  if (isConditionalFlow(element)) {
    type = 'ConditionalFlow';
  }

  return type as string;
};

export { parseElementType, getRawType, getBusinessObject };
