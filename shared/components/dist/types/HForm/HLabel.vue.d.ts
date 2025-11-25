import { PropType } from 'vue';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
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
    text: {
        type: StringConstructor;
        required: true;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
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
    text: {
        type: StringConstructor;
        required: true;
    };
}>> & Readonly<{}>, {
    size: "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "overline" | "subtitle-1" | "subtitle-2" | "body-1" | "body-2";
    align: "left" | "right" | "center" | "justify";
    weight: "bold" | "thin" | "light" | "regular" | "medium" | "bolder";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, HTMLDivElement>;
export default _default;
