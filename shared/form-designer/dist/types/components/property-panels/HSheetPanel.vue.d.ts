declare const _default: import('vue').DefineComponent<{}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
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
export default _default;
