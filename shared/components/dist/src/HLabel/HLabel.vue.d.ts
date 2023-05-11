import { PropType } from 'vue';
declare const _sfc_main: import("vue").DefineComponent<{
    size: {
        type: PropType<"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "caption" | "overline" | "subtitle-1" | "subtitle-2" | "body-1" | "body-2">;
        default: string;
    };
    weight: {
        type: PropType<"thin" | "light" | "regular" | "medium" | "bold" | "bolder">;
        default: string;
    };
    align: {
        type: PropType<"center" | "left" | "right" | "justify">;
        default: string;
    };
    text: StringConstructor;
}, {
    display: import("vue").ComputedRef<string>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    size: {
        type: PropType<"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "caption" | "overline" | "subtitle-1" | "subtitle-2" | "body-1" | "body-2">;
        default: string;
    };
    weight: {
        type: PropType<"thin" | "light" | "regular" | "medium" | "bold" | "bolder">;
        default: string;
    };
    align: {
        type: PropType<"center" | "left" | "right" | "justify">;
        default: string;
    };
    text: StringConstructor;
}>>, {
    weight: "thin" | "light" | "regular" | "medium" | "bold" | "bolder";
    size: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "caption" | "overline" | "subtitle-1" | "subtitle-2" | "body-1" | "body-2";
    align: "center" | "left" | "right" | "justify";
}, {}>;
export default _sfc_main;
