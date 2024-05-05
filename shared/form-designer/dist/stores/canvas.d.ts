import { Element, Schema, ElementConfig, DynamicFormEntity, Sheet, ConditionVariable } from '../declarations';

export declare const useFormCanvasStore: import('pinia').StoreDefinition<"FormDesignerCanvas", {
    isClosed: boolean;
    canvasElements: Element[];
    sheet: Sheet;
    selectedElement: Element;
    id: string;
    name: string;
    activityName: string;
}, {
    isSelected(state: {
        isClosed: boolean;
        canvasElements: {
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
                models: Record<string, import('@herodotus/form-apis').VModel>;
                children?: any[] | undefined;
                text?: string | undefined;
            };
        }[];
        sheet: {
            condition?: {
                variable: string;
                options: {
                    label: string;
                    value: boolean;
                }[];
            } | undefined;
        };
        selectedElement: {
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
                models: Record<string, import('@herodotus/form-apis').VModel>;
                children?: any[] | undefined;
                text?: string | undefined;
            };
        };
        id: string;
        name: string;
        activityName: string;
    } & import('pinia').PiniaCustomStateProperties<{
        isClosed: boolean;
        canvasElements: Element[];
        sheet: Sheet;
        selectedElement: Element;
        id: string;
        name: string;
        activityName: string;
    }>): (id: number) => boolean;
    isEmptyCanvas: (state: {
        isClosed: boolean;
        canvasElements: {
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
                models: Record<string, import('@herodotus/form-apis').VModel>;
                children?: any[] | undefined;
                text?: string | undefined;
            };
        }[];
        sheet: {
            condition?: {
                variable: string;
                options: {
                    label: string;
                    value: boolean;
                }[];
            } | undefined;
        };
        selectedElement: {
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
                models: Record<string, import('@herodotus/form-apis').VModel>;
                children?: any[] | undefined;
                text?: string | undefined;
            };
        };
        id: string;
        name: string;
        activityName: string;
    } & import('pinia').PiniaCustomStateProperties<{
        isClosed: boolean;
        canvasElements: Element[];
        sheet: Sheet;
        selectedElement: Element;
        id: string;
        name: string;
        activityName: string;
    }>) => boolean;
    getElements: (state: {
        isClosed: boolean;
        canvasElements: {
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
                models: Record<string, import('@herodotus/form-apis').VModel>;
                children?: any[] | undefined;
                text?: string | undefined;
            };
        }[];
        sheet: {
            condition?: {
                variable: string;
                options: {
                    label: string;
                    value: boolean;
                }[];
            } | undefined;
        };
        selectedElement: {
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
                models: Record<string, import('@herodotus/form-apis').VModel>;
                children?: any[] | undefined;
                text?: string | undefined;
            };
        };
        id: string;
        name: string;
        activityName: string;
    } & import('pinia').PiniaCustomStateProperties<{
        isClosed: boolean;
        canvasElements: Element[];
        sheet: Sheet;
        selectedElement: Element;
        id: string;
        name: string;
        activityName: string;
    }>) => {
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
            models: Record<string, import('@herodotus/form-apis').VModel>;
            children?: any[] | undefined;
            text?: string | undefined;
        };
    }[];
    currentSchema(): Schema;
    currentConfig(): ElementConfig;
    currentPanel(): string;
    isInformationPanel(): boolean;
    condition(): ConditionVariable;
}, {
    selectElement(element: Element): void;
    selectFirstElement(): void;
    loading(entity: DynamicFormEntity): void;
    compose(): DynamicFormEntity;
    addElement(element: Element): void;
    removeElement(element: Element): void;
}>;
