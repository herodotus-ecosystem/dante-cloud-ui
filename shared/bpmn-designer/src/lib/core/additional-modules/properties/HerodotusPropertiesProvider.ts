import { PropertiesPanel } from '@bpmn-io/properties-panel';

import type { Group } from 'bpmn-js-properties-panel/lib/PropertiesActivator';
import type EventBus from 'diagram-js/lib/core/EventBus';

import { parseElementType, getRawType, getBpmnIcon } from '../../panel-icon';
import { lodash, Logger } from '/@/lib/utils';

const LOW_PRIORITY = 500;

export default function HerodotusPropertiesProvider(
  propertiesPanel: typeof PropertiesPanel,
  translate: Function,
  eventBus: EventBus
) {
  // @ts-ignore
  this.getGroups = function (element: any) {
    const elementTypeName = parseElementType(element);
    const elementRawTypeName = getRawType(element.type);

    const isMultiInstance =
      !lodash.isEmpty(element.businessObject.loopCharacteristics) &&
      element.businessObject.loopCharacteristics.$type === 'bpmn:MultiInstanceLoopCharacteristics';

    const elementTitle = translate(elementRawTypeName) + '(' + lodash.upperCase(elementRawTypeName) + ')';
    const elementIcon = getBpmnIcon(elementTypeName);
    const elementCaption = element.businessObject.name;

    /**
     * We return a middleware that modifies
     * the existing groups.
     */
    return function (groups: Group[]) {
      eventBus.fire('herodotus.element.changed', {
        panelGroups: groups,
        elementType: element.type,
        elementRawType: elementRawTypeName,
        activeElement: element,
        activeElementId: element.id,
        elementTitle: elementTitle,
        elementIcon: elementIcon,
        elementCaption: elementCaption,
        isMultiInstance: isMultiInstance
      });

      Logger.prettyPrimary('Selected element changed', `ID: ${element.id} , type: ${element.type}`);
      Logger.prettyInfo('Selected element businessObject', element.businessObject);

      return groups;
    };
  };
  // Register our custom herodotus properties provider.
  // Use a lower priority to ensure it is loaded after
  // the basic BPMN properties.
  // @ts-ignore
  propertiesPanel.registerProvider(LOW_PRIORITY, this);
}

HerodotusPropertiesProvider.$inject = ['propertiesPanel', 'translate', 'eventBus'];
