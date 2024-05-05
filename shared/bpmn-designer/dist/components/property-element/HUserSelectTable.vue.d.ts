import { PropType } from 'vue';
import { UserEntity } from '../../declarations';

declare const _default: import('vue').DefineComponent<{
    modelValue: {
        type: PropType<UserEntity[]>;
        default: () => UserEntity[];
    };
    selection: {
        type: PropType<"single" | "multiple">;
        default: string;
    };
}, {
    tableRows: import('vue').Ref<UserEntity[]>;
    totalPages: import('vue').Ref<number>;
    pagination: import('vue').Ref<{
        sortBy: string | null;
        descending: boolean;
        page: number;
        rowsPerPage: number;
        rowsNumber: number;
    }>;
    loading: import('vue').Ref<boolean>;
    fieldValue: import('vue').Ref<string>;
    selectedItems: import('vue').WritableComputedRef<UserEntity[]>;
    rowKey: keyof UserEntity;
    columns: {
        name: string;
        label: string;
        field: string | ((row: any) => any);
        required?: boolean | undefined;
        align?: "left" | "right" | "center" | undefined;
        sortable?: boolean | undefined;
        sort?: ((a: any, b: any, rowA: any, rowB: any) => number) | undefined;
        rawSort?: ((a: any, b: any, rowA: any, rowB: any) => number) | undefined;
        sortOrder?: "ad" | "da" | undefined;
        format?: ((val: any, row: any) => any) | undefined;
        style?: string | ((row: any) => string) | undefined;
        classes?: string | ((row: any) => string) | undefined;
        headerStyle?: string | undefined;
        headerClasses?: string | undefined;
    }[];
    findItems: import('../../declarations').QTableOnRequestProps;
    onClear: () => void;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: PropType<UserEntity[]>;
        default: () => UserEntity[];
    };
    selection: {
        type: PropType<"single" | "multiple">;
        default: string;
    };
}>>, {
    modelValue: UserEntity[];
    selection: "single" | "multiple";
}, {}>;
export default _default;
