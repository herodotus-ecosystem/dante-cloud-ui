import { Ref } from 'vue';
import { ExtensionProperty } from '../../../declarations';
declare const _default: import('vue').DefineComponent<{}, {
    tableRows: Ref<ExtensionProperty[], ExtensionProperty[]>;
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
    openDialog: Ref<boolean, boolean>;
    count: import('vue').ComputedRef<number>;
    onCreate: (item: ExtensionProperty) => void;
    onDelete: (item: ExtensionProperty) => void;
    onModify: () => void;
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
    HTableItemDeleteButton: import('vue').DefineComponent<{}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HTableActionButton: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            tooltip: {
                type: StringConstructor;
                default: string;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            tooltip: {
                type: StringConstructor;
                default: string;
            };
        }>> & Readonly<{}>, {
            tooltip: string;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HExtensionPropertyDialog: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>, {
        isOpen: import('vue').WritableComputedRef<boolean, boolean>;
        property: Ref<ExtensionProperty, ExtensionProperty>;
        isDisabled: import('vue').ComputedRef<boolean>;
        onSave: () => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("update:modelValue" | "save" | "update:open")[], "update:modelValue" | "save" | "update:open", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & Readonly<{
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onSave?: ((...args: any[]) => any) | undefined;
        "onUpdate:open"?: ((...args: any[]) => any) | undefined;
    }>, {
        modelValue: boolean;
    }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
