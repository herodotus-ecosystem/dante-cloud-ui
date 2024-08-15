import { PropType } from 'vue';
declare const _default: import('vue').DefineComponent<{
    wider: {
        type: PropType<"start" | "center" | "end">;
        default: string;
    };
    weight: {
        type: PropType<"thin" | "light" | "regular" | "medium" | "bold" | "bolder">;
        default: string;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
    label: StringConstructor;
}, {
    textWeight: globalThis.ComputedRef<string>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<globalThis.ExtractPropTypes<{
    wider: {
        type: PropType<"start" | "center" | "end">;
        default: string;
    };
    weight: {
        type: PropType<"thin" | "light" | "regular" | "medium" | "bold" | "bolder">;
        default: string;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
    label: StringConstructor;
}>>, {
    offset: number;
    wider: "center" | "start" | "end";
    weight: "bold" | "thin" | "light" | "regular" | "medium" | "bolder";
}, {}>;
export default _default;
