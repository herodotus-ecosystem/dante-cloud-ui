import { FormTypeEnum, BindingTypeEnum } from '../../../enums';
declare const _default: import('vue').DefineComponent<{}, {
    formsType: import('vue').Ref<string, string>;
    formsOptions: import('vue').Ref<{
        text: string;
        value: FormTypeEnum;
    }[], {
        text: string;
        value: FormTypeEnum;
    }[] | {
        text: string;
        value: FormTypeEnum;
    }[]>;
    bindingType: import('vue').Ref<string, string>;
    bindingOptions: import('vue').Ref<{
        text: string;
        value: BindingTypeEnum;
    }[], {
        text: string;
        value: BindingTypeEnum;
    }[] | {
        text: string;
        value: BindingTypeEnum;
    }[]>;
    formKey: import('vue').Ref<string, string>;
    formRef: import('vue').Ref<string, string>;
    formRefVersion: import('vue').Ref<string, string>;
    isCamundaForms: import('vue').ComputedRef<boolean>;
    isEmbeddedOrExternalTaskForms: import('vue').ComputedRef<boolean>;
    isFormRefVersion: import('vue').ComputedRef<boolean>;
    updateFormKey: (value: string) => void;
    updateFormRef: (value: string) => void;
    updateVersion: (value: string) => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
    HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        icon: {
            type: StringConstructor;
            default: string;
        };
        label: {
            type: StringConstructor;
            default: string;
        };
        badge: {
            type: BooleanConstructor;
            default: boolean;
        };
        badgeColor: {
            type: StringConstructor;
            default: string;
        };
        count: {
            type: NumberConstructor;
            default: number;
        };
        defaultOpend: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        icon: {
            type: StringConstructor;
            default: string;
        };
        label: {
            type: StringConstructor;
            default: string;
        };
        badge: {
            type: BooleanConstructor;
            default: boolean;
        };
        badgeColor: {
            type: StringConstructor;
            default: string;
        };
        count: {
            type: NumberConstructor;
            default: number;
        };
        defaultOpend: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & Readonly<{}>, {
        label: string;
        icon: string;
        badge: boolean;
        badgeColor: string;
        count: number;
        defaultOpend: boolean;
    }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
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
    HFormSelect: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        modelValue: {
            type: StringConstructor;
        };
    }>, {
        selectedValue: import('vue').WritableComputedRef<string | undefined, string | undefined>;
        options: import('vue').Ref<import('../../..').FormSelectItem[], import('../../..').FormSelectItem[]>;
        filter: (value: string, update: (callbackFn: () => void, after?: (ref: import('quasar').QSelect) => void) => void, abort: () => void) => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: StringConstructor;
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
