interface Props {
    optionLabel?: string;
    optionValue?: string;
    errorMessage?: string;
}
type __VLS_Props = Props;
type __VLS_PublicProps = {
    modelValue?: any;
} & __VLS_Props;
declare const _default: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: any) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: any) => any) | undefined;
}>, {
    optionValue: string;
    optionLabel: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
