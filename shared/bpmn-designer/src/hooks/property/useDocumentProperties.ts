import type { Element, Documentation } from '@/declarations';

import { getBusinessObject } from '@/lib/utils';

import { isEmpty, without } from 'lodash-es';

import usePropertyElement from './usePropertyElements';

export default function useDocumentProperties() {
  const DOCUMENTATION_TEXT_FORMAT = 'text/plain';

  const { getModeling, getBpmnFactory } = usePropertyElement();

  const findDocumentation = (docs: Array<Documentation>): Documentation | undefined => {
    if (isEmpty(docs)) {
      return undefined;
    }

    return docs.find((d) => {
      return (d.textFormat || DOCUMENTATION_TEXT_FORMAT) === DOCUMENTATION_TEXT_FORMAT;
    });
  };

  const getDocumentations = (element: Element): Array<Documentation> => {
    const businessObject = getBusinessObject(element);
    return businessObject.documentation;
  };

  const getDocumentation = (element: Element): Documentation | undefined => {
    return findDocumentation(getDocumentations(element));
  };

  const getDocumentationValue = (element: Element): string | undefined => {
    const documentation = getDocumentation(element);
    return documentation && documentation.text;
  };

  const setDocumentationValue = (element: Element, value: string) => {
    const businessObject = getBusinessObject(element);

    const documentation = getDocumentation(element);
    // (1) 更新或者移除 原有 documentation
    if (documentation) {
      if (value) {
        return getModeling().updateModdleProperties(element, documentation, { text: value });
      } else {
        return getModeling().updateModdleProperties(element, businessObject, {
          documentation: without<Documentation>(businessObject.get('documentation'), documentation),
        });
      }
    }
    // (2) 创建新的 documentation
    if (value) {
      const newDocumentation = getBpmnFactory().create('bpmn:Documentation', {
        text: value,
      });
      return getModeling().updateModdleProperties(element, businessObject, {
        documentation: [...businessObject.get('documentation'), newDocumentation],
      });
    }
  };

  return {
    getDocumentationValue,
    setDocumentationValue,
  };
}
