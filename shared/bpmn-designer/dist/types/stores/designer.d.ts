import { Element, ModelerState, Group } from '../declarations';
export declare const useDesignerStore: import('pinia').StoreDefinition<"BpmnDesignerModeler", ModelerState, {}, {
    switchElement(activeElement: Element, activeElementId: string, panelGroups: Group[], elementType: string, elementRawType: string, elementTitle: string, elementIcon: string, elementCaption: string, isMultiInstance: boolean): void;
}>;
