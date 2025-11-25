declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: NumberConstructor;
        required: true;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    maxPage: {
        type: NumberConstructor;
        default: number;
    };
}>, {
    pageNumber: import('vue').WritableComputedRef<number, number>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: NumberConstructor;
        required: true;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    maxPage: {
        type: NumberConstructor;
        default: number;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {
    max: number;
    maxPage: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
