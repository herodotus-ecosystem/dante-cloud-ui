import { Ref } from 'vue';

declare const _default: import('vue').DefineComponent<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    isOpen: import('vue').WritableComputedRef<boolean>;
    state: Ref<Record<string, any>>;
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
    onClose: () => void;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: boolean;
}, {}>;
export default _default;
