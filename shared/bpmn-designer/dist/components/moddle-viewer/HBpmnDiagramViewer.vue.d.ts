import { PropType } from 'vue';

declare const _default: import('vue').DefineComponent<{
    modelValue: {
        type: BooleanConstructor;
        required: true;
    };
    diagram: {
        type: StringConstructor;
        required: true;
    };
    nodes: {
        type: PropType<string[]>;
        default: () => never[];
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: StringConstructor;
        default: string;
    };
    height: {
        type: StringConstructor;
        default: string;
    };
    maxWidth: {
        type: StringConstructor;
        default: string;
    };
}, {
    isOpen: import('vue').WritableComputedRef<boolean>;
    isShow: import('vue').Ref<boolean>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        required: true;
    };
    diagram: {
        type: StringConstructor;
        required: true;
    };
    nodes: {
        type: PropType<string[]>;
        default: () => never[];
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: StringConstructor;
        default: string;
    };
    height: {
        type: StringConstructor;
        default: string;
    };
    maxWidth: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    width: string;
    height: string;
    title: string;
    nodes: string[];
    maxWidth: string;
}, {}>;
export default _default;
