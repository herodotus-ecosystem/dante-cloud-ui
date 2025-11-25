import type { Element, ModdleElement } from '@/declarations';

import { getBusinessObject, is, isAny, add } from '@/lib/utils';

import { useSettingStore } from '@/stores';
import usePropertyElement from './usePropertyElements';

export default function useGeneralProperties() {
  const { getModeling, getBpmnFactory, getCanvas } = usePropertyElement();

  const SPACE_REGEX = /\s/;
  // for QName validation as per http://www.w3.org/TR/REC-xml/#NT-NameChar
  // | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
  const QNAME_REGEX = /^([a-z][\w-.]*:)?[a-z_][\w-.]*$/i;
  // for ID validation as per BPMN Schema (QName - Namespace)
  const ID_REGEX = /^[a-z_][\w-.]*$/i;
  const VERSION_REGEX = /((\d|([1-9](\d*))).){2}(\d|([1-9](\d*)))/;

  const setting = useSettingStore();

  const isIgnored = (element: Element): boolean => {
    return isAny(element, ['bpmn:Collaboration', 'bpmn:DataAssociation', 'bpmn:Association']);
  };

  const isProcess = (element: Element): boolean => {
    return is(element, 'bpmn:Process');
  };

  const isTextAnnotation = (element: Element): boolean => {
    return is(element, 'bpmn:TextAnnotation');
  };

  const isGroup = (element: Element): boolean => {
    return is(element, 'bpmn:Group');
  };

  const createCategoryValue = (definitions: ModdleElement): ModdleElement => {
    const categoryValue = getBpmnFactory().create('bpmn:CategoryValue');
    const category = getBpmnFactory().create('bpmn:Category', {
      categoryValue: [categoryValue],
    });
    add(definitions.get('rootElements'), category, 0);
    getBusinessObject(category).$parent = definitions;
    getBusinessObject(categoryValue).$parent = category;

    return categoryValue;
  };

  const initializeCategory = (businessObject: ModdleElement, rootElement: Element) => {
    const definitions = getBusinessObject(rootElement).$parent;
    businessObject.categoryValueRef = createCategoryValue(definitions);
  };

  const getNameValue = (element: Element): string => {
    const businessObject = getBusinessObject(element);

    if (isIgnored(element)) {
      return '';
    }

    if (isTextAnnotation(element)) {
      return businessObject.text;
    }

    if (is(element, 'bpmn:Group')) {
      return businessObject.categoryValueRef.value;
    }

    return businessObject.name;
  };

  const setNameValue = (element: Element, value: string): void => {
    const businessObject = getBusinessObject(element);

    if (isIgnored(element)) {
      return undefined;
    }

    if (isTextAnnotation(element)) {
      return getModeling().updateProperties(element, { text: value });
    }

    if (isGroup(element)) {
      const categoryValueRef = businessObject.categoryValueRef;
      if (!categoryValueRef) {
        initializeCategory(businessObject, getCanvas().getRootElement() as Element);
      }
      return getModeling().updateLabel(element, value);
    }

    getModeling().updateProperties(element, { name: value });
  };

  const getIsExecutableValue = (element: Element): boolean => {
    return !!element.businessObject.isExecutable;
  };

  const setIsExecutableValue = (element: Element, value: boolean) => {
    getModeling().updateProperties(element, {
      isExecutable: value,
    });
  };

  const getVersionTagValue = (element: Element): string => {
    const prefix = setting.processEngine;

    return element.businessObject.get(`${prefix}:versionTag`);
  };

  const setVersionTagValue = (element: Element, value: string) => {
    const prefix = setting.processEngine;

    getModeling().updateProperties(element, {
      [`${prefix}:versionTag`]: value,
    });
  };

  const getIdValue = (element: Element): string => {
    return element.businessObject.id;
  };

  const setIdValue = (element: Element, value: string) => {
    getModeling().updateProperties(element, {
      id: value,
    });
  };

  const isIdValid = (element: Element, id: string) => {
    const assigned = element.businessObject.$model.ids.assigned(id);
    const idAlreadyExists = assigned && assigned !== element;

    if (!id) {
      return 'ID 不能为空.';
    }

    if (idAlreadyExists) {
      return 'ID 必须是唯一的';
    }

    if (SPACE_REGEX.test(id)) {
      return 'ID 不能包含空格';
    }

    if (!ID_REGEX.test(id)) {
      if (QNAME_REGEX.test(id)) {
        return 'ID 不能包含前缀';
      }

      return 'ID 必须符合 BPMN 规范';
    }

    return '';
  };

  const isVersionTagValid = (value: string): boolean => {
    return VERSION_REGEX.test(value);
  };

  return {
    isProcess,
    getIdValue,
    setIdValue,
    getNameValue,
    setNameValue,
    getIsExecutableValue,
    setIsExecutableValue,
    getVersionTagValue,
    setVersionTagValue,
    isIdValid,
    isVersionTagValid,
  };
}
