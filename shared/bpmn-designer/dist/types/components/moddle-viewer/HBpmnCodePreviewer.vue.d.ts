import { PropType } from 'vue';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        required: true;
    };
    data: {
        type: StringConstructor;
        required: true;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    language: {
        type: PropType<"xml" | "json">;
        default: string;
    };
    maxWidth: {
        type: StringConstructor;
        default: string;
    };
    maxHeight: {
        type: StringConstructor;
        default: string;
    };
}>, {
    isOpen: import('vue').WritableComputedRef<boolean, boolean>;
    headerTitle: import('vue').ComputedRef<string>;
    onCopy: () => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        required: true;
    };
    data: {
        type: StringConstructor;
        required: true;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    language: {
        type: PropType<"xml" | "json">;
        default: string;
    };
    maxWidth: {
        type: StringConstructor;
        default: string;
    };
    maxHeight: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {
    title: string;
    maxWidth: string;
    language: "xml" | "json";
    maxHeight: string;
}, {}, {
    highlightjs: import('vue').DefineComponent<{
        code: {
            type: StringConstructor;
            required: true;
        };
        language: {
            type: StringConstructor;
            default: string;
        };
        autodetect: {
            type: BooleanConstructor;
            default: boolean;
        };
        ignoreIllegals: {
            type: BooleanConstructor;
            default: boolean;
        };
    }, {
        className: import('vue').ComputedRef<string>;
        highlightedCode: import('vue').ComputedRef<string>;
    }, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, Record<string, any>, string, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, Readonly<{
        code: string;
        language: string;
        autodetect: boolean;
        ignoreIllegals: boolean;
    }>, {
        language: string;
        autodetect: boolean;
        ignoreIllegals: boolean;
    }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
