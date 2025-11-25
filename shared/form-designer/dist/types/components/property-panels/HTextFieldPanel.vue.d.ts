import { PropType } from 'vue';
import { Schema } from '../../declarations';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    schema: {
        type: PropType<Schema>;
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
        type: PropType<Schema>;
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
export default _default;
