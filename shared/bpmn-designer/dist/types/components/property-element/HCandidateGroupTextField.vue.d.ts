declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    label: {
        type: StringConstructor;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: import('vue').PropType<string>;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: string) => any;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    label: {
        type: StringConstructor;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: import('vue').PropType<string>;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
}>, {
    title: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, HTMLDivElement>;
export default _default;
