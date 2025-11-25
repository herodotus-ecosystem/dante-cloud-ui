import type { Modeling, Modeler, Canvas, ElementRegistry, Moddle, Element, Group } from './bpmn';

export interface DesignerSetting {
  useOfficialPanel: boolean;
  useOfficialTemplateChooser: boolean;
  useOfficialBackground: boolean;
  useOtherModule: boolean;
  showMiniMap: boolean;
  showBpmnLint: boolean;
  processEngine: 'flowable' | 'activiti' | 'camunda';
  processId: string;
  processName: string;
}

export interface ModelerState {
  modeler: Modeler;
  modeling: Modeling;
  moddle: Moddle;
  canvas: Canvas;
  elementRegistry: ElementRegistry;
  isClosed: boolean;
  activeElement: Element;
  activeElementId: string;
  panelGroups: Group[];
  elementType: string;
  elementRawType: string;
  elementTitle: string;
  elementIcon: string;
  elementCaption: string;
  isMultiInstance: boolean;
}
