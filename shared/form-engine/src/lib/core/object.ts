import type { SchemaDefinition, Schema, DataObject, Widget } from '/@/declarations';
import shortid from 'shortid';
import { cloneDeep } from 'lodash-es';

import { SCHEMA_DEFINITIONS } from '../settings';

class DataObjectUtilities {
  private static instance = new DataObjectUtilities();

  private constructor() {}

  public static getInstance(): DataObjectUtilities {
    return this.instance;
  }

  private generateShortId(): void {
    return shortid.generate();
  }

  private getDefinition(schema: string): SchemaDefinition {
    return SCHEMA_DEFINITIONS[schema];
  }

  public setDataObjectValues(schema: Schema, widgetName: string, panelName: string): DataObject {
    const dataObject = { id: '', config: {}, schema: {} } as DataObject;

    const formId = widgetName + '_' + this.generateShortId();
    dataObject.id = formId;
    dataObject.config.formId = formId;
    dataObject.config.renderKey = +new Date();
    dataObject.config.name = widgetName;
    dataObject.config.panel = panelName;
    dataObject.schema = cloneDeep(schema);
    return dataObject;
  }

  public create(widget: Widget): DataObject {
    const definition = this.getDefinition(widget.schemaName);
    const schema = definition.schema;
    const panelName = definition.name;
    const widgetName = widget.name;

    return this.setDataObjectValues(schema, widgetName, panelName);
  }
}

export const DataObjectUtils: DataObjectUtilities = DataObjectUtilities.getInstance();
