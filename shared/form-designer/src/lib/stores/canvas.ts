import { defineStore } from 'pinia';

import type { DataObject } from '/@/declarations';

import { lodash } from '/@/lib/utils';

export const useDataObjectStore = defineStore('CanvasDataObjects', {
  state: () => ({
    drawingDataObjects: [] as Array<DataObject>,
    currentDataObject: {} as DataObject
  }),

  getters: {
    isSelected(state) {
      return (id: number) => {
        if (!lodash.isEmpty(state.currentDataObject)) {
          if (state.currentDataObject.id) {
            return state.currentDataObject.config.renderKey === id;
          }
        }

        return false;
      };
    }
  },

  actions: {
    addDataObject(dataObject: DataObject) {
      this.drawingDataObjects.push(dataObject);
      this.selectDataObject(dataObject);
    },
    removeDataObject(dataObject: DataObject) {},
    selectDataObject(dataObject: DataObject) {
      this.currentDataObject = dataObject;
    }
  }
});
