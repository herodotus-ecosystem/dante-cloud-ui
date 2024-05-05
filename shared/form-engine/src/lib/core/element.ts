import type { SchemaDefinition, Schema, Element, Widget } from '/@/declarations';
import { nanoid } from 'nanoid';
import { cloneDeep } from 'lodash-es';

import { SCHEMA_DEFINITIONS } from '../settings';

class ElementUtilities {
  private static instance = new ElementUtilities();

  private constructor() {}

  public static getInstance(): ElementUtilities {
    return this.instance;
  }

  private generateShortId(): string {
    return nanoid();
  }

  private getDefinition(schema: string): SchemaDefinition {
    return SCHEMA_DEFINITIONS[schema];
  }

  private setIdentityValues(element: Element, widgetName: string): void {
    const formId = widgetName + '_' + this.generateShortId();
    element.id = formId;
    element.config.formId = formId;
    element.config.renderKey = +new Date();
  }

  public setElementValues(schema: Schema, widgetName: string, panelName: string): Element {
    const element = { id: '', config: {}, schema: {} } as Element;

    this.setIdentityValues(element, widgetName);
    element.config.name = widgetName;
    element.config.panel = panelName;
    element.schema = cloneDeep(schema);
    return element;
  }

  public create(widget: Widget): Element {
    const definition = this.getDefinition(widget.schemaName);
    const schema = definition.schema;
    const panelName = definition.name;
    const widgetName = widget.name;

    return this.setElementValues(schema, widgetName, panelName);
  }

  public clone(element: Element): Element {
    const newElement = cloneDeep(element);
    this.setIdentityValues(newElement, element.config.name);
    return newElement;
  }
}

export const ElementUtils: ElementUtilities = ElementUtilities.getInstance();
