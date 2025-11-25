import { PropType } from 'vue';
import { UserEntity } from '../../declarations';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: PropType<Array<UserEntity>>;
        default: () => Array<UserEntity>;
    };
    selection: {
        type: PropType<"single" | "multiple">;
        default: string;
    };
}>, {
    tableRows: import('vue').Ref<UserEntity[], UserEntity[]>;
    totalPages: import('vue').Ref<number, number>;
    pagination: import('vue').Ref<{
        sortBy: string | null;
        descending: boolean;
        page: number;
        rowsPerPage: number;
        rowsNumber: number;
    }, Required<{
        sortBy?: string | null;
        descending?: boolean;
        page?: number;
        rowsPerPage?: number;
        rowsNumber?: number;
    }> | {
        sortBy: string | null;
        descending: boolean;
        page: number;
        rowsPerPage: number;
        rowsNumber: number;
    }>;
    loading: import('vue').Ref<boolean, boolean>;
    fieldValue: import('vue').Ref<string, string>;
    selectedItems: import('vue').WritableComputedRef<UserEntity[], UserEntity[]>;
    rowKey: keyof UserEntity;
    columns: {
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
    findItems: import('@herodotus-cloud/core').QTableOnRequestProps;
    onClear: () => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: PropType<Array<UserEntity>>;
        default: () => Array<UserEntity>;
    };
    selection: {
        type: PropType<"single" | "multiple">;
        default: string;
    };
}>> & Readonly<{}>, {
    modelValue: UserEntity[];
    selection: "single" | "multiple";
}, {}, {
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
