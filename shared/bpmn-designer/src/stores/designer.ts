import { defineStore } from 'pinia';

import type { Element, ModelerState, Modeler, ElementRegistry, Modeling, Canvas, Moddle, Group } from '/@/declarations';

export const useDesignerStore = defineStore('BpmnDesignerModeler', {
  state: (): ModelerState => ({
    modeler: {} as Modeler,
    modeling: {} as Modeling,
    canvas: {} as Canvas,
    elementRegistry: {} as ElementRegistry,
    moddle: {} as Moddle,
    isClosed: false,
    activeElement: {} as Element,
    activeElementId: '',
    panelGroups: [],
    elementType: '',
    elementRawType: '',
    elementTitle: '',
    elementIcon: '',
    elementCaption: '',
    isMultiInstance: false
  }),

  actions: {
    switchElement(
      activeElement: Element,
      activeElementId: string,
      panelGroups: Group[],
      elementType: string,
      elementRawType: string,
      elementTitle: string,
      elementIcon: string,
      elementCaption: string,
      isMultiInstance: boolean
    ) {
      this.activeElement = activeElement;
      this.activeElementId = activeElementId;
      this.panelGroups = panelGroups;
      this.elementType = elementType;
      this.elementRawType = elementRawType;
      this.elementTitle = elementTitle;
      this.elementIcon = elementIcon;
      this.elementCaption = elementCaption;
      this.isMultiInstance = isMultiInstance;
    }
  }
});
