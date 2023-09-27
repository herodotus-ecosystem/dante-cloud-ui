declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        defalut: string;
    };
}, {
    durationValue: globalThis.WritableComputedRef<string | number | undefined>;
    amount: globalThis.Ref<number>;
    unit: globalThis.Ref<string>;
    options: globalThis.Ref<{
        text: string;
        value: string;
    }[]>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<globalThis.ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        defalut: string;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {}, {}>;
export default _default;
