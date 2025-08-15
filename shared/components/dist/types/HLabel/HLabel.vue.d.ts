import { PropType } from 'vue';
declare const _default: import('vue').DefineComponent<globalThis.ExtractPropTypes<{
    size: {
        type: PropType<"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "caption" | "overline" | "subtitle-1" | "subtitle-2" | "body-1" | "body-2">;
        default: string;
    };
    weight: {
        type: PropType<"thin" | "light" | "regular" | "medium" | "bold" | "bolder">;
        default: string;
    };
    align: {
        type: PropType<"left" | "right" | "center" | "justify">;
        default: string;
    };
    text: StringConstructor;
}>, {
    display: globalThis.ComputedRef<string>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<globalThis.ExtractPropTypes<{
    size: {
        type: PropType<"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "caption" | "overline" | "subtitle-1" | "subtitle-2" | "body-1" | "body-2">;
        default: string;
    };
    weight: {
        type: PropType<"thin" | "light" | "regular" | "medium" | "bold" | "bolder">;
        default: string;
    };
    align: {
        type: PropType<"left" | "right" | "center" | "justify">;
        default: string;
    };
    text: StringConstructor;
}>> & Readonly<{}>, {
    size: "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "overline" | "subtitle-1" | "subtitle-2" | "body-1" | "body-2";
    align: "left" | "right" | "justify" | "center";
    weight: "bold" | "thin" | "light" | "regular" | "medium" | "bolder";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
