export declare type ModelType = 'String' | 'Number' | 'Array' | 'Object';
export interface Model {
    name: string;
    type: ModelType;
}
export interface Schema {
    title: string;
    tag: string;
    attrs: Record<string, any>;
    models: Record<string, Model>;
    children?: Array<Schema>;
    text?: string;
}
export interface SchemaDefinition {
    name: string;
    schema: Schema;
}
export declare type SchemaDefinitions = {
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
export interface DataObjectConfig {
    formId: string;
    renderKey: number;
    name: string;
    panel: string;
}
export interface DataObject {
    id: string;
    config: DataObjectConfig;
    schema: Schema;
}
