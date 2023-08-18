import type { QTableProps, QNotifyCreateOptions } from 'quasar';
import type { ParametersType } from './core';
export type QTableSeparatorProps = QTableProps['separator'];
export type QTablePaginationProps = Required<NonNullable<QTableProps['pagination']>>;
export type QTableColumnProps = NonNullable<QTableProps['columns']>;
export type QTableOnRequestProps = (requestProp: {
    /**
     * Pagination object
     */
    pagination: {
        /**
         * Column name (from column definition)
         */
        sortBy: string | null;
        /**
         * Is sorting in descending order?
         */
        descending: boolean;
        /**
         * Page number (1-based)
         */
        page: number;
        /**
         * How many rows per page? 0 means Infinite
         */
        rowsPerPage: number;
    };
    /**
     * String/Object to filter table with (the 'filter' prop)
     */
    filter?: string | any;
    /**
     * Function to get a cell value
     * @param col Column name from column definitions
     * @param row The row object
     * @returns Parsed/Processed cell value
     */
    getCellValue: (col: any, row: any) => any;
}) => void;
export type QTableOnRequestParameter = ParametersType<QTableOnRequestProps>;
export interface QUploaderInfo {
    /**
     * Uploaded files
     */
    files: readonly any[];
    /**
     * XMLHttpRequest that has been used to upload this batch of files
     */
    xhr: any;
}
export type QNotifyPosition = NonNullable<QNotifyCreateOptions['position']>;
/**
 * 很多 Quasar 组件使用到的基本数据类型
 */
export interface QBaseDataItem<T> {
    label: string;
    value: T;
}
