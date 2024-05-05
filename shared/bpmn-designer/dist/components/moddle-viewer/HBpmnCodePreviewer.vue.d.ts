import { PropType } from 'vue';

declare const _default: import('vue').DefineComponent<{
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
}, {
    isOpen: import('vue').WritableComputedRef<boolean>;
    headerTitle: import('vue').ComputedRef<string>;
    onCopy: () => void;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
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
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    title: string;
    maxWidth: string;
    language: "xml" | "json";
    maxHeight: string;
}, {}>;
export default _default;
