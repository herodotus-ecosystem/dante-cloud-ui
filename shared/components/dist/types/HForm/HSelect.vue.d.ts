declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | ObjectConstructor | NumberConstructor | ArrayConstructor)[];
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
}>, {
    selectedValue: import('vue').WritableComputedRef<string | number | Record<string, any> | unknown[] | undefined, string | number | Record<string, any> | unknown[] | undefined>;
    hasError: import('vue').ComputedRef<boolean>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | ObjectConstructor | NumberConstructor | ArrayConstructor)[];
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
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {
    optionLabel: string;
    optionValue: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
