import type { DataObject } from '../../declarations';
export declare const useDataObjectStore: import("pinia").StoreDefinition<"CanvasDataObjects", {
    drawingDataObjects: DataObject[];
    currentDataObject: DataObject;
}, {
    isSelected(state: {
        drawingDataObjects: {
            id: string;
            config: {
                formId: string;
                renderKey: number;
                name: string;
                panel: string;
            };
            schema: {
                title: string;
                tag: string;
                attrs: Record<string, any>;
                models: Record<string, import("@herodotus/form-engine").Model>;
                children?: any[] | undefined;
                text?: string | undefined;
            };
        }[];
        currentDataObject: {
            id: string;
            config: {
                formId: string;
                renderKey: number;
                name: string;
                panel: string;
            };
            schema: {
                title: string;
                tag: string;
                attrs: Record<string, any>;
                models: Record<string, import("@herodotus/form-engine").Model>;
                children?: any[] | undefined;
                text?: string | undefined;
            };
        };
    } & import("pinia").PiniaCustomStateProperties<{
        drawingDataObjects: DataObject[];
        currentDataObject: DataObject;
    }>): (id: number) => boolean;
}, {
    addDataObject(dataObject: DataObject): void;
    removeDataObject(dataObject: DataObject): void;
    selectDataObject(dataObject: DataObject): void;
}>;
