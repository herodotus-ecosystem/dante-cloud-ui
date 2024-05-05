import type { Element, ModdleElement, ExtensionProperty } from '/@/declarations';

import { lodash } from '/@/lib/utils';
import usePropertyElement from './usePropertyElements';

export default function useExtensionProperties() {
  const { getModeling, createModdleElement, getRelevantBusinessObject, processEngine } = usePropertyElement();

  const getExtensionElements = (businessObject: ModdleElement): ModdleElement => {
    return !lodash.isEmpty(businessObject.extensionElements) ? businessObject.extensionElements : ({} as ModdleElement);
  };

  const getExtensionElementsValues = (extensionElements: ModdleElement): Array<ModdleElement> => {
    return !lodash.isEmpty(extensionElements.values) ? extensionElements.values : [];
  };

  const getProperties = (extensionElements: ModdleElement): ModdleElement => {
    const values = getExtensionElementsValues(extensionElements);
    return !lodash.isEmpty(values) ? values[0] : ({} as ModdleElement);
  };

  const getPropertiesValues = (properties: ModdleElement): Array<ModdleElement> => {
    return !lodash.isEmpty(properties.values) ? properties.values : [];
  };

  const getExtensionProperties = (element: Element): Array<ExtensionProperty> => {
    const businessObject = getRelevantBusinessObject(element);
    const extensionElements = getExtensionElements(businessObject);
    const properties = getProperties(extensionElements);
    const values = getPropertiesValues(properties);
    if (!lodash.isEmpty(values)) {
      return lodash.map(values, item => lodash.pick(item, ['name', 'value']));
    } else {
      return [];
    }
  };

  const deleteExtensionProperty = (element: Element, property: ExtensionProperty) => {
    const businessObject = getRelevantBusinessObject(element);
    const extensionElements = getExtensionElements(businessObject);
    const properties = getProperties(extensionElements);
    if (!lodash.isEmpty(properties)) {
      const values = lodash.pullAllBy(getPropertiesValues(properties), [property], 'name');
      getModeling().updateModdleProperties(element, properties, { values });

      if (lodash.isEmpty(values)) {
        getModeling().updateModdleProperties(element, extensionElements, {
          values: lodash.without(getExtensionElementsValues(extensionElements), properties)
        });
      }
    }
  };

  const modifyExtensionProperty = (element: Element, items: Array<ExtensionProperty>) => {
    const businessObject = getRelevantBusinessObject(element);
    let extensionElements = getExtensionElements(businessObject);

    // 判断 extensionElements
    if (lodash.isEmpty(extensionElements)) {
      extensionElements = createModdleElement('bpmn:ExtensionElements', { values: [] }, businessObject);
      getModeling().updateModdleProperties(element, businessObject, { extensionElements });
    }

    // 判断 extensionElements 是否有 properties
    let properties = getProperties(extensionElements);
    if (lodash.isEmpty(properties)) {
      properties = createModdleElement(`${processEngine}:Properties`, { values: [] }, extensionElements);
      getModeling().updateModdleProperties(element, extensionElements, {
        values: [...extensionElements.get('values'), properties]
      });
    }

    // 创建新属性并添加
    createProperties(element, items, properties);
  };

  const createProperties = (element: Element, items: Array<ExtensionProperty>, parent: ModdleElement) => {
    if (!lodash.isEmpty(items)) {
      const newElements = lodash.map(items, item => {
        return createModdleElement(`${processEngine}:Property`, item, parent);
      });

      getModeling().updateModdleProperties(element, parent, {
        values: newElements
      });
    }
  };

  return {
    getExtensionProperties,
    modifyExtensionProperty,
    deleteExtensionProperty
  };
}
