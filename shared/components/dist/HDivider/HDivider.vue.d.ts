import { PropType } from 'vue';
declare const _default: import('vue').DefineComponent<globalThis.ExtractPropTypes<{
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
}>, {
    textWeight: globalThis.ComputedRef<string>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<globalThis.ExtractPropTypes<{
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
}>> & Readonly<{}>, {
    offset: number;
    wider: "start" | "center" | "end";
    weight: "bold" | "thin" | "light" | "regular" | "medium" | "bolder";
}, {}, {
    HContainer: import('vue').DefineComponent<globalThis.ExtractPropTypes<{
        mode: {
            type: PropType<"two" | "three">;
            default: string;
        };
        wider: {
            type: PropType<"default" | "start" | "center" | "end">;
            default: string;
        };
        offset: {
            type: NumberConstructor;
            default: number;
        };
    }>, {
        isTwoColumn: () => boolean;
        isToTheLeft: globalThis.ComputedRef<boolean>;
        isToTheRight: globalThis.ComputedRef<boolean>;
        leftCols: globalThis.Ref<number, number>;
        centerCols: globalThis.Ref<number, number>;
        rightCols: globalThis.Ref<number, number>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<globalThis.ExtractPropTypes<{
        mode: {
            type: PropType<"two" | "three">;
            default: string;
        };
        wider: {
            type: PropType<"default" | "start" | "center" | "end">;
            default: string;
        };
        offset: {
            type: NumberConstructor;
            default: number;
        };
    }>> & Readonly<{}>, {
        offset: number;
        mode: "two" | "three";
        wider: "default" | "start" | "center" | "end";
    }, {}, {
        HRow: import('vue').DefineComponent<globalThis.ExtractPropTypes<{
            column: {
                type: BooleanConstructor;
                default: boolean;
            };
            self: {
                type: BooleanConstructor;
                default: boolean;
            };
            align: {
                type: PropType<"none" | "start" | "center" | "end">;
                default: string;
            };
            justify: {
                type: PropType<"none" | "center" | "end" | "around" | "between" | "evenly">;
                default: string;
            };
            gutter: {
                type: PropType<"none" | "xs" | "sm" | "md" | "lg" | "xl">;
                default: string;
            };
            gutterCol: {
                type: BooleanConstructor;
                default: boolean;
            };
            horizontal: {
                type: BooleanConstructor;
                default: boolean;
            };
            vertical: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {
            getClasses: () => string;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<globalThis.ExtractPropTypes<{
            column: {
                type: BooleanConstructor;
                default: boolean;
            };
            self: {
                type: BooleanConstructor;
                default: boolean;
            };
            align: {
                type: PropType<"none" | "start" | "center" | "end">;
                default: string;
            };
            justify: {
                type: PropType<"none" | "center" | "end" | "around" | "between" | "evenly">;
                default: string;
            };
            gutter: {
                type: PropType<"none" | "xs" | "sm" | "md" | "lg" | "xl">;
                default: string;
            };
            gutterCol: {
                type: BooleanConstructor;
                default: boolean;
            };
            horizontal: {
                type: BooleanConstructor;
                default: boolean;
            };
            vertical: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            align: "none" | "start" | "center" | "end";
            self: boolean;
            horizontal: boolean;
            vertical: boolean;
            column: boolean;
            justify: "none" | "center" | "end" | "around" | "between" | "evenly";
            gutter: "xs" | "sm" | "md" | "lg" | "xl" | "none";
            gutterCol: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HColumn: import('vue').DefineComponent<globalThis.ExtractPropTypes<{
            cols: {
                type: (StringConstructor | NumberConstructor)[];
                default: string;
            };
            xs: {
                type: StringConstructor;
                default: string;
            };
            sm: {
                type: StringConstructor;
                default: string;
            };
            md: {
                type: StringConstructor;
                default: string;
            };
            lg: {
                type: StringConstructor;
                default: string;
            };
            xl: {
                type: StringConstructor;
                default: string;
            };
            auto: {
                type: BooleanConstructor;
                default: boolean;
            };
            color: {
                type: StringConstructor;
                default: string;
            };
        }>, {
            classes: globalThis.ComputedRef<string[]>;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<globalThis.ExtractPropTypes<{
            cols: {
                type: (StringConstructor | NumberConstructor)[];
                default: string;
            };
            xs: {
                type: StringConstructor;
                default: string;
            };
            sm: {
                type: StringConstructor;
                default: string;
            };
            md: {
                type: StringConstructor;
                default: string;
            };
            lg: {
                type: StringConstructor;
                default: string;
            };
            xl: {
                type: StringConstructor;
                default: string;
            };
            auto: {
                type: BooleanConstructor;
                default: boolean;
            };
            color: {
                type: StringConstructor;
                default: string;
            };
        }>> & Readonly<{}>, {
            color: string;
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
            auto: boolean;
            cols: string | number;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HLabel: import('vue').DefineComponent<globalThis.ExtractPropTypes<{
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
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
