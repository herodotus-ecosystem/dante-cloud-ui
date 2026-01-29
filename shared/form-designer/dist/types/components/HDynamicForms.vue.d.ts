import { PropType } from 'vue';
import { FormDesignerResources, DynamicFormEntity } from '../declarations';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    instance: {
        type: PropType<FormDesignerResources>;
        required: true;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    container: {
        type: BooleanConstructor;
        default: boolean;
    };
    height: {
        type: StringConstructor;
        default: string;
    };
    item: {
        type: PropType<DynamicFormEntity>;
        default: () => {};
    };
}>, {
    leftDrawerOpen: import('vue').Ref<boolean, boolean>;
    toggleLeftDrawer(): void;
    rightDrawerOpen: import('vue').Ref<boolean, boolean>;
    toggleRightDrawer(): void;
    openPreview: import('vue').Ref<boolean, boolean>;
    openUpload: import('vue').Ref<boolean, boolean>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "close"[], "close", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    instance: {
        type: PropType<FormDesignerResources>;
        required: true;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    container: {
        type: BooleanConstructor;
        default: boolean;
    };
    height: {
        type: StringConstructor;
        default: string;
    };
    item: {
        type: PropType<DynamicFormEntity>;
        default: () => {};
    };
}>> & Readonly<{
    onClose?: ((...args: any[]) => any) | undefined;
}>, {
    title: string;
    item: DynamicFormEntity;
    container: boolean;
    height: string;
}, {}, {
    HWidgetPanel: import('vue').DefineComponent<{}, {
        widgetGroups: import('@herodotus-cloud/form-apis').WidgetDefinition[];
        cloneWidget: (widget: import('@herodotus-cloud/form-apis').Widget) => import('@herodotus-cloud/form-apis').Element;
        addWidget: (widget: import('@herodotus-cloud/form-apis').Widget) => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        Draggable: import('vue').DefineComponent<{
            list: {
                type: ArrayConstructor;
                required: boolean;
                default: any;
            };
            modelValue: {
                type: ArrayConstructor;
                required: boolean;
                default: any;
            };
            itemKey: {
                type: (FunctionConstructor | StringConstructor)[];
                required: boolean;
            };
            clone: {
                type: FunctionConstructor;
                default: (original: any) => any;
            };
            tag: {
                type: StringConstructor;
                default: string;
            };
            move: {
                type: FunctionConstructor;
                default: any;
            };
            componentData: {
                type: ObjectConstructor;
                required: boolean;
                default: any;
            };
        }, unknown, {
            error: boolean;
        }, {
            realList(): any;
            getKey(): any;
        }, {
            getUnderlyingVm(domElement: any): any;
            getUnderlyingPotencialDraggableComponent(htmElement: any): any;
            emitChanges(evt: any): void;
            alterList(onList: any): void;
            spliceList(): void;
            updatePosition(oldIndex: any, newIndex: any): void;
            getRelatedContextFromMoveEvent({ to, related }: {
                to: any;
                related: any;
            }): any;
            getVmIndexFromDomIndex(domIndex: any): any;
            onDragStart(evt: any): void;
            onDragAdd(evt: any): void;
            onDragRemove(evt: any): void;
            onDragUpdate(evt: any): void;
            computeFutureIndex(relatedContext: any, evt: any): any;
            onDragMove(evt: any, originalEvent: any): any;
            onDragEnd(): void;
        }, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, any[], any, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, Readonly<{
            move: Function;
            tag: string;
            clone: Function;
            list: unknown[];
            modelValue: unknown[];
            componentData: Record<string, any>;
        } & {
            itemKey?: string | Function;
        }>, {
            move: Function;
            tag: string;
            clone: Function;
            list: unknown[];
            modelValue: unknown[];
            componentData: Record<string, any>;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HPropertyPanel: import('vue').DefineComponent<{}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HCanvasContainer: import('vue').DefineComponent<{}, {
        isEmptyCanvas: import('vue').ComputedRef<boolean>;
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
                models: Record<string, import('@herodotus-cloud/form-apis').VModel>;
                children?: /*elided*/ any[] | undefined;
                text?: string | undefined;
            };
        }[];
        onSelectedItem: (element: import('@herodotus-cloud/form-apis').Element) => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        Draggable: import('vue').DefineComponent<{
            list: {
                type: ArrayConstructor;
                required: boolean;
                default: any;
            };
            modelValue: {
                type: ArrayConstructor;
                required: boolean;
                default: any;
            };
            itemKey: {
                type: (FunctionConstructor | StringConstructor)[];
                required: boolean;
            };
            clone: {
                type: FunctionConstructor;
                default: (original: any) => any;
            };
            tag: {
                type: StringConstructor;
                default: string;
            };
            move: {
                type: FunctionConstructor;
                default: any;
            };
            componentData: {
                type: ObjectConstructor;
                required: boolean;
                default: any;
            };
        }, unknown, {
            error: boolean;
        }, {
            realList(): any;
            getKey(): any;
        }, {
            getUnderlyingVm(domElement: any): any;
            getUnderlyingPotencialDraggableComponent(htmElement: any): any;
            emitChanges(evt: any): void;
            alterList(onList: any): void;
            spliceList(): void;
            updatePosition(oldIndex: any, newIndex: any): void;
            getRelatedContextFromMoveEvent({ to, related }: {
                to: any;
                related: any;
            }): any;
            getVmIndexFromDomIndex(domIndex: any): any;
            onDragStart(evt: any): void;
            onDragAdd(evt: any): void;
            onDragRemove(evt: any): void;
            onDragUpdate(evt: any): void;
            computeFutureIndex(relatedContext: any, evt: any): any;
            onDragMove(evt: any, originalEvent: any): any;
            onDragEnd(): void;
        }, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, any[], any, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, Readonly<{
            move: Function;
            tag: string;
            clone: Function;
            list: unknown[];
            modelValue: unknown[];
            componentData: Record<string, any>;
        } & {
            itemKey?: string | Function;
        }>, {
            move: Function;
            tag: string;
            clone: Function;
            list: unknown[];
            modelValue: unknown[];
            componentData: Record<string, any>;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HCanvasElement: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            element: {
                type: PropType<import('@herodotus-cloud/form-apis').Element>;
                required: true;
            };
            selectedId: {
                type: NumberConstructor;
                required: true;
            };
        }>, {
            isHover: import('vue').Ref<boolean, boolean>;
            schemas: import('vue').ComputedRef<import('@herodotus-cloud/form-apis').Schema[]>;
            isSelected: import('vue').ComputedRef<boolean>;
            onDelete: () => void;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            element: {
                type: PropType<import('@herodotus-cloud/form-apis').Element>;
                required: true;
            };
            selectedId: {
                type: NumberConstructor;
                required: true;
            };
        }>> & Readonly<{}>, {}, {}, {
            HRendererEngine: import('vue').DefineComponent<{
                [x: string]: any;
            }, () => any, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{
                [x: string]: any;
            }> & Readonly<{}>, {
                schemas: import('@herodotus-cloud/form-apis').Schema[];
            }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HCanvasLayout: import('vue').DefineComponent<{}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HFormPreviewDialog: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>, {
        isOpen: import('vue').WritableComputedRef<boolean, boolean>;
        state: import('vue').Ref<Record<string, any>, Record<string, any>>;
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
                models: Record<string, import('@herodotus-cloud/form-apis').VModel>;
                children?: /*elided*/ any[] | undefined;
                text?: string | undefined;
            };
        }[];
        onClose: () => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & Readonly<{
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    }>, {
        modelValue: boolean;
    }, {}, {
        HRendererForm: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            modelValue: {
                type: PropType<Record<string, any>>;
                default: () => {};
                required: true;
            };
            elements: {
                type: PropType<Array<import('@herodotus-cloud/form-apis').Element>>;
                required: true;
            };
        }>, {
            getDefaultModel: (item: import('@herodotus-cloud/form-apis').Element) => import('@herodotus-cloud/form-apis').VModel | undefined;
            modelObject: import('vue').WritableComputedRef<Record<string, any>, Record<string, any>>;
            state: Record<string, any>;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            modelValue: {
                type: PropType<Record<string, any>>;
                default: () => {};
                required: true;
            };
            elements: {
                type: PropType<Array<import('@herodotus-cloud/form-apis').Element>>;
                required: true;
            };
        }>> & Readonly<{
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        }>, {
            modelValue: Record<string, any>;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HFormUploadDialog: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>, {
        isOpen: import('vue').WritableComputedRef<boolean, boolean>;
        onSave: () => void;
        infoRef: import('vue').Ref<import('vue').DefineComponent<{}, {
            id: string;
            name: string;
            activityName: string;
            nameRef: import('vue').Ref<import('quasar').QInput | null, import('quasar').QInput | null>;
            activityNameRef: import('vue').Ref<import('quasar').QInput | null, import('quasar').QInput | null>;
            validate: () => boolean;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any> | null, import('vue').DefineComponent<{}, {
            id: string;
            name: string;
            activityName: string;
            nameRef: import('vue').Ref<import('quasar').QInput | null, import('quasar').QInput | null>;
            activityNameRef: import('vue').Ref<import('quasar').QInput | null, import('quasar').QInput | null>;
            validate: () => boolean;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any> | null>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("update:modelValue" | "update:open" | "save")[], "update:modelValue" | "update:open" | "save", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & Readonly<{
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onSave?: ((...args: any[]) => any) | undefined;
        "onUpdate:open"?: ((...args: any[]) => any) | undefined;
    }>, {
        modelValue: boolean;
    }, {}, {
        HFormInformation: import('vue').DefineComponent<{}, {
            id: string;
            name: string;
            activityName: string;
            nameRef: import('vue').Ref<import('quasar').QInput | null, import('quasar').QInput | null>;
            activityNameRef: import('vue').Ref<import('quasar').QInput | null, import('quasar').QInput | null>;
            validate: () => boolean;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
