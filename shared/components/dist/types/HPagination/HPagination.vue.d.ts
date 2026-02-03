declare const pageNumber: import('vue').ModelRef<number, string, number, number>;
interface Props {
    max?: number;
    maxPage?: number;
}
type __VLS_Props = Props;
type __VLS_PublicProps = {
    modelValue: typeof pageNumber['value'];
} & __VLS_Props;
declare const _default: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: number) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: number) => any) | undefined;
}>, {
    max: number;
    maxPage: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
