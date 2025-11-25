import { PropertiesPanel } from '@bpmn-io/properties-panel';
import { default as EventBus } from 'diagram-js/lib/core/EventBus';
declare function HerodotusPropertiesProvider(propertiesPanel: typeof PropertiesPanel, translate: Function, eventBus: EventBus): void;
declare namespace HerodotusPropertiesProvider {
    var $inject: string[];
}
export default HerodotusPropertiesProvider;
