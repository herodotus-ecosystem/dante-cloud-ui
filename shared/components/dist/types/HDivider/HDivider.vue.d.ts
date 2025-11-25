import { PropType } from 'vue';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
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
    label: {
        type: StringConstructor;
        default: string;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
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
    label: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{}>, {
    label: string;
    offset: number;
    weight: "bold" | "thin" | "light" | "regular" | "medium" | "bolder";
    wider: "center" | "start" | "end";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
