import type { QTableProps } from 'quasar';
import type { ParametersType } from './core';
export type QTableSeparatorProps = QTableProps['separator'];
export type QTablePaginationProps = Required<NonNullable<QTableProps['pagination']>>;
export type QTableColumnProps = NonNullable<QTableProps['columns']>;
export type QTableOnRequestProps = NonNullable<QTableProps['onRequest']>;
export type QTableOnRequestParameter = ParametersType<QTableOnRequestProps>;
/**
 * 很多 Quasar 组件使用到的基本数据类型
 */
export interface QBaseDataItem<T> {
    label: string;
    value: T;
}
