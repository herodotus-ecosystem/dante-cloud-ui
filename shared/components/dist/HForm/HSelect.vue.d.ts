declare const _default: import('vue').DefineComponent<{
    modelValue: {
        type: (StringConstructor | ObjectConstructor | ArrayConstructor | NumberConstructor)[];
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
    selectedValue: globalThis.WritableComputedRef<string | number | Record<string, any> | unknown[] | undefined>;
    hasError: globalThis.ComputedRef<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").PublicProps, Readonly<globalThis.ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | ObjectConstructor | ArrayConstructor | NumberConstructor)[];
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
