interface Props {
    trueValue?: boolean | string | number;
    falseValue?: boolean | string | number;
    color?: string;
}
type __VLS_Props = Props;
type __VLS_PublicProps = {
    modelValue?: boolean | string | number;
} & __VLS_Props;
declare const _default: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: string | number | boolean) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string | number | boolean) => any) | undefined;
}>, {
    color: string;
    trueValue: boolean | string | number;
    falseValue: boolean | string | number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
