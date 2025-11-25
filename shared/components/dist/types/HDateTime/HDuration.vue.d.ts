declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        defalut: string;
    };
}>, {
    durationValue: import('vue').WritableComputedRef<string | number | undefined, string | number | undefined>;
    amount: import('vue').Ref<number, number>;
    unit: import('vue').Ref<string, string>;
    options: import('vue').Ref<{
        text: string;
        value: string;
    }[], import('..').SelectItem<string>[] | {
        text: string;
        value: string;
    }[]>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        defalut: string;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {
    HSelect: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        modelValue: {
            type: (StringConstructor | ObjectConstructor | NumberConstructor | ArrayConstructor)[];
        };
        optionLabel: {
            type: StringConstructor;
            default: string;
        };
        optionValue: {
            type: StringConstructor;
            default: string;
        };
        errorMessage: {
            type: StringConstructor;
        };
    }>, {
        selectedValue: import('vue').WritableComputedRef<string | number | Record<string, any> | unknown[] | undefined, string | number | Record<string, any> | unknown[] | undefined>;
        hasError: import('vue').ComputedRef<boolean>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: (StringConstructor | ObjectConstructor | NumberConstructor | ArrayConstructor)[];
        };
        optionLabel: {
            type: StringConstructor;
            default: string;
        };
        optionValue: {
            type: StringConstructor;
            default: string;
        };
        errorMessage: {
            type: StringConstructor;
        };
    }>> & Readonly<{
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    }>, {
        optionLabel: string;
        optionValue: string;
    }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HTextField: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        modelValue: {
            type: (StringConstructor | NumberConstructor)[];
        };
    }>, {
        text: import('vue').WritableComputedRef<string | number | undefined, string | number | undefined>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: (StringConstructor | NumberConstructor)[];
        };
    }>> & Readonly<{
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    }>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HContainer: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        mode: {
            type: import('vue').PropType<"two" | "three">;
            default: string;
        };
        wider: {
            type: import('vue').PropType<"default" | "start" | "center" | "end">;
            default: string;
        };
        offset: {
            type: NumberConstructor;
            default: number;
        };
    }>, {
        leftCols: import('vue').Ref<number, number>;
        centerCols: import('vue').Ref<number, number>;
        rightCols: import('vue').Ref<number, number>;
        isTwoColumn: import('vue').ComputedRef<boolean>;
        isToTheLeft: import('vue').ComputedRef<boolean>;
        isToTheRight: import('vue').ComputedRef<boolean>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        mode: {
            type: import('vue').PropType<"two" | "three">;
            default: string;
        };
        wider: {
            type: import('vue').PropType<"default" | "start" | "center" | "end">;
            default: string;
        };
        offset: {
            type: NumberConstructor;
            default: number;
        };
    }>> & Readonly<{}>, {
        offset: number;
        mode: "two" | "three";
        wider: "default" | "center" | "start" | "end";
    }, {}, {
        HRow: {
            new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('vue').ExtractPropTypes<{
                column: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                self: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                align: {
                    type: import('vue').PropType<"none" | "start" | "center" | "end">;
                    default: string;
                };
                justify: {
                    type: import('vue').PropType<"none" | "center" | "end" | "around" | "between" | "evenly">;
                    default: string;
                };
                gutter: {
                    type: import('vue').PropType<"none" | "xs" | "sm" | "md" | "lg" | "xl">;
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
                align: "center" | "none" | "start" | "end";
                self: boolean;
                horizontal: boolean;
                vertical: boolean;
                justify: "center" | "none" | "end" | "around" | "between" | "evenly";
                column: boolean;
                gutter: "xs" | "sm" | "md" | "lg" | "xl" | "none";
                gutterCol: boolean;
            }, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, HTMLDivElement, import('vue').ComponentProvideOptions, {
                P: {};
                B: {};
                D: {};
                C: {};
                M: {};
                Defaults: {};
            }, Readonly<import('vue').ExtractPropTypes<{
                column: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                self: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                align: {
                    type: import('vue').PropType<"none" | "start" | "center" | "end">;
                    default: string;
                };
                justify: {
                    type: import('vue').PropType<"none" | "center" | "end" | "around" | "between" | "evenly">;
                    default: string;
                };
                gutter: {
                    type: import('vue').PropType<"none" | "xs" | "sm" | "md" | "lg" | "xl">;
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
                align: "center" | "none" | "start" | "end";
                self: boolean;
                horizontal: boolean;
                vertical: boolean;
                justify: "center" | "none" | "end" | "around" | "between" | "evenly";
                column: boolean;
                gutter: "xs" | "sm" | "md" | "lg" | "xl" | "none";
                gutterCol: boolean;
            }>;
            __isFragment?: never;
            __isTeleport?: never;
            __isSuspense?: never;
        } & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
            column: {
                type: BooleanConstructor;
                default: boolean;
            };
            self: {
                type: BooleanConstructor;
                default: boolean;
            };
            align: {
                type: import('vue').PropType<"none" | "start" | "center" | "end">;
                default: string;
            };
            justify: {
                type: import('vue').PropType<"none" | "center" | "end" | "around" | "between" | "evenly">;
                default: string;
            };
            gutter: {
                type: import('vue').PropType<"none" | "xs" | "sm" | "md" | "lg" | "xl">;
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
            align: "center" | "none" | "start" | "end";
            self: boolean;
            horizontal: boolean;
            vertical: boolean;
            justify: "center" | "none" | "end" | "around" | "between" | "evenly";
            column: boolean;
            gutter: "xs" | "sm" | "md" | "lg" | "xl" | "none";
            gutterCol: boolean;
        }, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
            $slots: {
                default?(_: {}): any;
            };
        });
        HColumn: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
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
            classes: import('vue').ComputedRef<string[]>;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
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
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
