declare const _sfc_main: import("vue").DefineComponent<{
    modelValue: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        defalut: boolean;
    };
    trueValue: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: boolean;
    };
    falseValue: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: boolean;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
}, {
    switchValue: import("vue").WritableComputedRef<string | number | boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        defalut: boolean;
    };
    trueValue: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: boolean;
    };
    falseValue: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: boolean;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    color: string;
    trueValue: string | number | boolean;
    falseValue: string | number | boolean;
}>;
export default _sfc_main;
