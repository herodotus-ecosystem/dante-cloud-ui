declare const _default: import('vue').DefineComponent<{}, {
    formTab: import('vue').Ref<string, string>;
    elementTab: import('vue').Ref<string, string>;
    isInformationPanel: import('vue').ComputedRef<boolean>;
    currentSchema: import('vue').ComputedRef<import('@herodotus-cloud/form-apis').Schema>;
    currentPanel: import('vue').ComputedRef<string>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
    HSheetPanel: import('vue').DefineComponent<{}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HConditionVariable: import('vue').DefineComponent<{}, {
            tableColumns: {
                name: string;
                label: string;
                field: string | ((row: any) => any);
                required?: boolean;
                align?: "left" | "right" | "center";
                sortable?: boolean;
                sort?: (a: any, b: any, rowA: any, rowB: any) => number;
                rawSort?: (a: any, b: any, rowA: any, rowB: any) => number;
                sortOrder?: "ad" | "da";
                format?: (val: any, row: any) => any;
                style?: string | ((row: any) => string);
                classes?: string | ((row: any) => string);
                headerStyle?: string;
                headerClasses?: string;
            }[];
            tableRows: import('vue').Ref<import('@herodotus-cloud/core').QBaseDataItem<boolean>[], import('@herodotus-cloud/core').QBaseDataItem<boolean>[]>;
            condition: import('@herodotus-cloud/form-apis').ConditionVariable;
            onModify: () => void;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
            HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
                headerClass: {
                    type: StringConstructor;
                    default: string;
                };
            }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
                headerClass: {
                    type: StringConstructor;
                    default: string;
                };
            }>> & Readonly<{}>, {
                headerClass: string;
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
        }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HFormInformation: import('vue').DefineComponent<{}, {
        id: string;
        name: string;
        activityName: string;
        nameRef: import('vue').Ref<import('quasar').QInput | null, import('quasar').QInput | null>;
        activityNameRef: import('vue').Ref<import('quasar').QInput | null, import('quasar').QInput | null>;
        validate: () => boolean;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    DATE_PICKER: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        schema: {
            type: import('vue').PropType<import('@herodotus-cloud/form-apis').Schema>;
            required: true;
        };
    }>, {
        ATTRIBUTES: {
            HideBottomSpace: string;
            ItemAligned: string;
        };
        properties: import('vue').ComputedRef<Record<string, any>>;
        models: import('vue').ComputedRef<Record<string, import('@herodotus-cloud/form-apis').VModel>>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        schema: {
            type: import('vue').PropType<import('@herodotus-cloud/form-apis').Schema>;
            required: true;
        };
    }>> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            headerClass: {
                type: StringConstructor;
                default: string;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            headerClass: {
                type: StringConstructor;
                default: string;
            };
        }>> & Readonly<{}>, {
            headerClass: string;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HSwitch: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            modelValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            trueValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            falseValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            color: {
                type: StringConstructor;
                default: string;
            };
        }>, {
            switchValue: import('vue').WritableComputedRef<string | number | boolean, string | number | boolean>;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            modelValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            trueValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            falseValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            color: {
                type: StringConstructor;
                default: string;
            };
        }>> & Readonly<{
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        }>, {
            color: string;
            modelValue: string | number | boolean;
            trueValue: string | number | boolean;
            falseValue: string | number | boolean;
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
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    PASSWORD: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        schema: {
            type: import('vue').PropType<import('@herodotus-cloud/form-apis').Schema>;
            required: true;
        };
    }>, {
        ATTRIBUTES: {
            HideBottomSpace: string;
            ItemAligned: string;
        };
        properties: import('vue').ComputedRef<Record<string, any>>;
        models: import('vue').ComputedRef<Record<string, import('@herodotus-cloud/form-apis').VModel>>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        schema: {
            type: import('vue').PropType<import('@herodotus-cloud/form-apis').Schema>;
            required: true;
        };
    }>> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            headerClass: {
                type: StringConstructor;
                default: string;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            headerClass: {
                type: StringConstructor;
                default: string;
            };
        }>> & Readonly<{}>, {
            headerClass: string;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HSwitch: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            modelValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            trueValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            falseValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            color: {
                type: StringConstructor;
                default: string;
            };
        }>, {
            switchValue: import('vue').WritableComputedRef<string | number | boolean, string | number | boolean>;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            modelValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            trueValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            falseValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            color: {
                type: StringConstructor;
                default: string;
            };
        }>> & Readonly<{
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        }>, {
            color: string;
            modelValue: string | number | boolean;
            trueValue: string | number | boolean;
            falseValue: string | number | boolean;
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
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    TEXT_AREA: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        schema: {
            type: import('vue').PropType<import('@herodotus-cloud/form-apis').Schema>;
            required: true;
        };
    }>, {
        ATTRIBUTES: {
            HideBottomSpace: string;
            ItemAligned: string;
        };
        properties: import('vue').ComputedRef<Record<string, any>>;
        models: import('vue').ComputedRef<Record<string, import('@herodotus-cloud/form-apis').VModel>>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        schema: {
            type: import('vue').PropType<import('@herodotus-cloud/form-apis').Schema>;
            required: true;
        };
    }>> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            headerClass: {
                type: StringConstructor;
                default: string;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            headerClass: {
                type: StringConstructor;
                default: string;
            };
        }>> & Readonly<{}>, {
            headerClass: string;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HSwitch: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            modelValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            trueValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            falseValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            color: {
                type: StringConstructor;
                default: string;
            };
        }>, {
            switchValue: import('vue').WritableComputedRef<string | number | boolean, string | number | boolean>;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            modelValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            trueValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            falseValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            color: {
                type: StringConstructor;
                default: string;
            };
        }>> & Readonly<{
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        }>, {
            color: string;
            modelValue: string | number | boolean;
            trueValue: string | number | boolean;
            falseValue: string | number | boolean;
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
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    TEXT_FIELD: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        schema: {
            type: import('vue').PropType<import('@herodotus-cloud/form-apis').Schema>;
            required: true;
        };
    }>, {
        ATTRIBUTES: {
            HideBottomSpace: string;
            ItemAligned: string;
        };
        properties: import('vue').ComputedRef<Record<string, any>>;
        models: import('vue').ComputedRef<Record<string, import('@herodotus-cloud/form-apis').VModel>>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        schema: {
            type: import('vue').PropType<import('@herodotus-cloud/form-apis').Schema>;
            required: true;
        };
    }>> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            headerClass: {
                type: StringConstructor;
                default: string;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            headerClass: {
                type: StringConstructor;
                default: string;
            };
        }>> & Readonly<{}>, {
            headerClass: string;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HSwitch: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            modelValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            trueValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            falseValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            color: {
                type: StringConstructor;
                default: string;
            };
        }>, {
            switchValue: import('vue').WritableComputedRef<string | number | boolean, string | number | boolean>;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            modelValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            trueValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            falseValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            color: {
                type: StringConstructor;
                default: string;
            };
        }>> & Readonly<{
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        }>, {
            color: string;
            modelValue: string | number | boolean;
            trueValue: string | number | boolean;
            falseValue: string | number | boolean;
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
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    TIME_PICKER: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        schema: {
            type: import('vue').PropType<import('@herodotus-cloud/form-apis').Schema>;
            required: true;
        };
    }>, {
        ATTRIBUTES: {
            HideBottomSpace: string;
            ItemAligned: string;
        };
        properties: import('vue').ComputedRef<Record<string, any>>;
        models: import('vue').ComputedRef<Record<string, import('@herodotus-cloud/form-apis').VModel>>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        schema: {
            type: import('vue').PropType<import('@herodotus-cloud/form-apis').Schema>;
            required: true;
        };
    }>> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            headerClass: {
                type: StringConstructor;
                default: string;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            headerClass: {
                type: StringConstructor;
                default: string;
            };
        }>> & Readonly<{}>, {
            headerClass: string;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HSwitch: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            modelValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            trueValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            falseValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            color: {
                type: StringConstructor;
                default: string;
            };
        }>, {
            switchValue: import('vue').WritableComputedRef<string | number | boolean, string | number | boolean>;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            modelValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            trueValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            falseValue: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: boolean;
            };
            color: {
                type: StringConstructor;
                default: string;
            };
        }>> & Readonly<{
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        }>, {
            color: string;
            modelValue: string | number | boolean;
            trueValue: string | number | boolean;
            falseValue: string | number | boolean;
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
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
