import { PropType } from 'vue';
declare const _default: import('vue').DefineComponent<globalThis.ExtractPropTypes<{
    mode: {
        type: PropType<"two" | "three">;
        default: string;
    };
    /**
     * 1. 如果是三列布局：
     * default：三列相等
     * start：左边宽，中间默认，右边窄
     * center：两边相同，中间宽
     * end：右边宽，中间默认，左边窄
     *
     * 2.如果是两列布局：
     * default：左右相等
     * start：左边宽，右边窄
     * end：右边宽，左边窄
     */
    wider: {
        type: PropType<"default" | "start" | "center" | "end">;
        default: string;
    };
    /**
     * 1. 如果是三列布局
     * 1.1 如果 wider 是 center，那么 offset 最大值为6，即 [0, 6]
     * 1.2 如果 wider 是 start 或 end，那么 offset 最大值为3，即[0, 3]
     * 2. 如果是两列布局
     * 那么 offset 最大值为5，即 [0, 3]
     */
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
    /**
     * 1. 如果是三列布局：
     * default：三列相等
     * start：左边宽，中间默认，右边窄
     * center：两边相同，中间宽
     * end：右边宽，中间默认，左边窄
     *
     * 2.如果是两列布局：
     * default：左右相等
     * start：左边宽，右边窄
     * end：右边宽，左边窄
     */
    wider: {
        type: PropType<"default" | "start" | "center" | "end">;
        default: string;
    };
    /**
     * 1. 如果是三列布局
     * 1.1 如果 wider 是 center，那么 offset 最大值为6，即 [0, 6]
     * 1.2 如果 wider 是 start 或 end，那么 offset 最大值为3，即[0, 3]
     * 2. 如果是两列布局
     * 那么 offset 最大值为5，即 [0, 3]
     */
    offset: {
        type: NumberConstructor;
        default: number;
    };
}>> & Readonly<{}>, {
    offset: number;
    mode: "two" | "three";
    wider: "default" | "start" | "center" | "end";
}, {}, {
    HRow: {
        new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<Readonly<globalThis.ExtractPropTypes<{
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
        }>> & Readonly<{}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {
            align: "none" | "start" | "center" | "end";
            self: boolean;
            horizontal: boolean;
            vertical: boolean;
            column: boolean;
            justify: "none" | "center" | "end" | "around" | "between" | "evenly";
            gutter: "xs" | "sm" | "md" | "lg" | "xl" | "none";
            gutterCol: boolean;
        }, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, HTMLDivElement, import('vue').ComponentProvideOptions, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<globalThis.ExtractPropTypes<{
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
        }>> & Readonly<{}>, {}, {}, {}, {}, {
            align: "none" | "start" | "center" | "end";
            self: boolean;
            horizontal: boolean;
            vertical: boolean;
            column: boolean;
            justify: "none" | "center" | "end" | "around" | "between" | "evenly";
            gutter: "xs" | "sm" | "md" | "lg" | "xl" | "none";
            gutterCol: boolean;
        }>;
        __isFragment?: never;
        __isTeleport?: never;
        __isSuspense?: never;
    } & import('vue').ComponentOptionsBase<Readonly<globalThis.ExtractPropTypes<{
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
    }>> & Readonly<{}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, {
        align: "none" | "start" | "center" | "end";
        self: boolean;
        horizontal: boolean;
        vertical: boolean;
        column: boolean;
        justify: "none" | "center" | "end" | "around" | "between" | "evenly";
        gutter: "xs" | "sm" | "md" | "lg" | "xl" | "none";
        gutterCol: boolean;
    }, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
        };
    });
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
export default _default;
