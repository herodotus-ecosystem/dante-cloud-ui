import type { Schema, DataObject, Widget } from '../../declarations';
declare class DataObjectUtilities {
    private static instance;
    private constructor();
    static getInstance(): DataObjectUtilities;
    private generateShortId;
    private getDefinition;
    setDataObjectValues(schema: Schema, widgetName: string, panelName: string): DataObject;
    create(widget: Widget): DataObject;
}
export declare const DataObjectUtils: DataObjectUtilities;
export {};
