import { Ref } from 'vue';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {
    isOpen: import('vue').WritableComputedRef<boolean, boolean>;
    state: Ref<Record<string, any>, Record<string, any>>;
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
            type: import('vue').PropType<Record<string, any>>;
            default: () => {};
            required: true;
        };
        elements: {
            type: import('vue').PropType<Array<import('@herodotus-cloud/form-apis').Element>>;
            required: true;
        };
    }>, {
        getDefaultModel: (item: import('@herodotus-cloud/form-apis').Element) => import('@herodotus-cloud/form-apis').VModel | undefined;
        modelObject: import('vue').WritableComputedRef<Record<string, any>, Record<string, any>>;
        state: Record<string, any>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: import('vue').PropType<Record<string, any>>;
            default: () => {};
            required: true;
        };
        elements: {
            type: import('vue').PropType<Array<import('@herodotus-cloud/form-apis').Element>>;
            required: true;
        };
    }>> & Readonly<{
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    }>, {
        modelValue: Record<string, any>;
    }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
