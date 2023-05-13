declare const _sfc_main: import("vue").DefineComponent<{
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        defalut: string;
    };
}, {
    durationValue: import("vue").WritableComputedRef<string | number | undefined>;
    amount: import("vue").Ref<number>;
    unit: import("vue").Ref<string>;
    options: import("vue").Ref<{
        text: string;
        value: string;
    }[]>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        defalut: string;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {}, {}>;
export default _sfc_main;
