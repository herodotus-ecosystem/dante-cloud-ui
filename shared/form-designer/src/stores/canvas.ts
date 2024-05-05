import { defineStore } from 'pinia';
import { lodash } from '/@/lib';

import type { Element, Schema, ElementConfig, DynamicFormEntity, Sheet, ConditionVariable } from '/@/declarations';

export const useFormCanvasStore = defineStore('FormDesignerCanvas', {
  state: () => {
    return {
      isClosed: false,
      canvasElements: [] as Array<Element>,
      sheet: {} as Sheet,
      selectedElement: {} as Element,
      id: '',
      name: '',
      activityName: ''
    };
  },

  getters: {
    isSelected(state) {
      return (id: number) => {
        if (!lodash.isEmpty(state.selectedElement)) {
          if (state.selectedElement.id) {
            return state.selectedElement.config.renderKey === id;
          }
        }

        return false;
      };
    },
    isEmptyCanvas: state => lodash.isEmpty(state.canvasElements),

    getElements: state => state.canvasElements,

    currentSchema(): Schema {
      return !lodash.isEmpty(this.selectedElement) && !lodash.isEmpty(this.selectedElement.schema)
        ? this.selectedElement.schema
        : ({} as Schema);
    },

    currentConfig(): ElementConfig {
      return !lodash.isEmpty(this.selectedElement) && !lodash.isEmpty(this.selectedElement.config)
        ? this.selectedElement.config
        : ({} as ElementConfig);
    },

    currentPanel(): string {
      return !lodash.isEmpty(this.currentConfig) && !lodash.isEmpty(this.currentConfig.panel)
        ? this.currentConfig.panel
        : 'INFORMATION_PANEL';
    },

    isInformationPanel(): boolean {
      return this.currentPanel === 'INFORMATION_PANEL';
    },

    condition(): ConditionVariable {
      if (lodash.isEmpty(this.sheet.condition)) {
        this.sheet['condition'] = { variable: '', options: [] };
      }
      return this.sheet.condition as ConditionVariable;
    }
  },

  actions: {
    selectElement(element: Element) {
      this.selectedElement = element;
    },

    selectFirstElement() {
      if (!lodash.isEmpty(this.canvasElements)) {
        this.selectElement(this.canvasElements[0]);
      }
    },

    loading(entity: DynamicFormEntity) {
      if (!lodash.isEmpty(entity.modeler)) {
        this.canvasElements = entity.modeler.elements;
        this.sheet = entity.modeler.sheet;
      }
      this.id = entity.id as string;
      this.name = entity.name;
      this.activityName = entity.activityName;
      this.selectFirstElement();
    },

    compose(): DynamicFormEntity {
      return {
        id: this.id,
        name: this.name,
        activityName: this.activityName,
        modeler: { elements: this.canvasElements, sheet: this.sheet }
      } as DynamicFormEntity;
    },

    addElement(element: Element) {
      // 某些情况下，pinia 初始化的值
      if (typeof this.canvasElements === 'undefined') {
        this.canvasElements = [] as Array<Element>;
      }
      this.canvasElements.push(element);
      this.selectElement(element);
    },

    removeElement(element: Element) {
      if (!lodash.isEmpty(this.canvasElements) && element.id) {
        lodash.remove(this.canvasElements, item => {
          return item.id === element.id;
        });

        this.selectFirstElement();
      }
    }
  }
});
