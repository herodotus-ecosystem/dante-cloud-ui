import { Ref } from 'vue';
import { ExtensionProperty } from '../../../declarations';

declare const _default: import('vue').DefineComponent<{}, {
    tableRows: Ref<ExtensionProperty[]>;
    tableColumns: {
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
    openDialog: Ref<boolean>;
    count: import('vue').ComputedRef<number>;
    onCreate: (item: ExtensionProperty) => void;
    onDelete: (item: ExtensionProperty) => void;
    onModify: () => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{}>>, {}, {}>;
export default _default;
