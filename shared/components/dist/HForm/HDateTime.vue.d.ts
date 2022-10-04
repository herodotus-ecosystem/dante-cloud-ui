declare const _sfc_main: import("vue").DefineComponent<{
    modelValue: {
        type: StringConstructor;
    };
    errorMessage: {
        type: StringConstructor;
    };
}, {
    dateTimeValue: import("vue").WritableComputedRef<string | undefined>;
    hasError: import("vue").ComputedRef<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
    };
    errorMessage: {
        type: StringConstructor;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
