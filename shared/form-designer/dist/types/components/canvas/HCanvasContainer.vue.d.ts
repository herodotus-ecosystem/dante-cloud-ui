import { Element } from '../../declarations';
declare const _default: import('vue').DefineComponent<{}, {
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
    onSelectedItem: (element: Element) => void;
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
            type: import('vue').PropType<Element>;
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
            type: import('vue').PropType<Element>;
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
export default _default;
