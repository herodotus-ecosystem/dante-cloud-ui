declare const _default: import('vue').DefineComponent<globalThis.ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        defalut: string;
    };
}>, {
    durationValue: globalThis.WritableComputedRef<string | number | undefined, string | number | undefined>;
    amount: globalThis.Ref<number, number>;
    unit: globalThis.Ref<string, string>;
    options: globalThis.Ref<{
        text: string;
        value: string;
    }[], import('..').SelectItem<string>[] | {
        text: string;
        value: string;
    }[]>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<globalThis.ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        defalut: string;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {
    HSelect: import('vue').DefineComponent<globalThis.ExtractPropTypes<{
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
    }>, {
        selectedValue: globalThis.WritableComputedRef<string | number | Record<string, any> | unknown[] | undefined, string | number | Record<string, any> | unknown[] | undefined>;
        hasError: globalThis.ComputedRef<boolean>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<globalThis.ExtractPropTypes<{
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
    }>> & Readonly<{
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    }>, {
        optionLabel: string;
        optionValue: string;
    }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
