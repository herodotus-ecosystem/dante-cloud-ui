import { ClosePopup } from 'quasar';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
        default: string;
        required: true;
    };
}>, {
    dateTimeValue: import('vue').WritableComputedRef<string, string>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
        default: string;
        required: true;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {
    modelValue: string;
}, {}, {}, {
    ClosePopup: ClosePopup;
}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
