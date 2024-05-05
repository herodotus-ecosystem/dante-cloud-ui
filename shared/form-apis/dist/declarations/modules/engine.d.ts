import { QBaseDataItem } from '../base';

export type DataType = 'String' | 'Number' | 'Array' | 'Object';
export interface VModel {
    name: string;
    type: DataType;
}
export interface Schema {
    title: string;
    tag: string;
    attrs: Record<string, any>;
    models: Record<string, VModel>;
    children?: Array<Schema>;
    text?: string;
}
export interface SchemaDefinition {
    name: string;
    schema: Schema;
}
export type SchemaDefinitions = {
    [K in string]: SchemaDefinition;
};
export interface Widget {
    title: string;
    icon: string;
    name: string;
    document: string;
    schemaName: string;
}
export interface WidgetDefinition {
    title: string;
    list: Array<Widget>;
}
export interface ElementConfig {
    formId: string;
    renderKey: number;
    name: string;
    panel: string;
}
export interface Element {
    id: string;
    config: ElementConfig;
    schema: Schema;
}
export interface ConditionVariable {
    variable: string;
    options: Array<QBaseDataItem<boolean>>;
}
export interface Sheet {
    condition?: ConditionVariable;
}
export interface FormModeler {
    elements: Array<Element>;
    sheet: Sheet;
}
