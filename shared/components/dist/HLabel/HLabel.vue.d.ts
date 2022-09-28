import { PropType } from 'vue';
declare const _sfc_main: import("vue").DefineComponent<{
    size: {
        type: PropType<"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "caption" | "overline" | "subtitle-1" | "subtitle-2" | "body-1" | "body-2">;
        default: string;
    };
    weight: {
        type: PropType<"bold" | "thin" | "light" | "regular" | "medium" | "bolder">;
        default: string;
    };
    align: {
        type: PropType<"center" | "justify" | "left" | "right">;
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
        type: PropType<"bold" | "thin" | "light" | "regular" | "medium" | "bolder">;
        default: string;
    };
    align: {
        type: PropType<"center" | "justify" | "left" | "right">;
        default: string;
    };
    text: StringConstructor;
}>>, {
    align: "center" | "justify" | "left" | "right";
    size: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "caption" | "overline" | "subtitle-1" | "subtitle-2" | "body-1" | "body-2";
    weight: "bold" | "thin" | "light" | "regular" | "medium" | "bolder";
}>;
export default _sfc_main;
