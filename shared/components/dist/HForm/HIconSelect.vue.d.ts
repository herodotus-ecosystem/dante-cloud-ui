import { Ref } from 'vue';
import { QSelect } from 'quasar';
declare const _default: import('vue').DefineComponent<{
    modelValue: {
        type: StringConstructor;
    };
    optionLabel: {
        type: StringConstructor;
        default: string;
    };
    optionValue: {
        type: StringConstructor;
        default: string;
    };
    errorMessage: {
        type: StringConstructor;
    };
}, {
    selectedValue: globalThis.WritableComputedRef<string | undefined>;
    options: Ref<string[]>;
    filter: (value: string, update: (callbackFn: () => void, after?: (ref: QSelect) => void) => void, abort: () => void) => void;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<globalThis.ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
    };
    optionLabel: {
        type: StringConstructor;
        default: string;
    };
    optionValue: {
        type: StringConstructor;
        default: string;
    };
    errorMessage: {
        type: StringConstructor;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    optionLabel: string;
    optionValue: string;
}, {}>;
export default _default;
