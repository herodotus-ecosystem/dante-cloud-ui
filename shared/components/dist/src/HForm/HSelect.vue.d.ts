declare const _sfc_main: import("vue").DefineComponent<{
    modelValue: {
        type: (StringConstructor | NumberConstructor | ObjectConstructor | ArrayConstructor)[];
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
    selectedValue: import("vue").WritableComputedRef<string | number | Record<string, any> | unknown[] | undefined>;
    hasError: import("vue").ComputedRef<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | NumberConstructor | ObjectConstructor | ArrayConstructor)[];
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
export default _sfc_main;
