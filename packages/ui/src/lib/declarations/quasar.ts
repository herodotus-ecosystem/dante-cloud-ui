import type { QTableProps } from 'quasar';

export type QTableSeparatorProps = QTableProps['separator'];

export type QTablePaginationProps = Required<NonNullable<QTableProps['pagination']>>;

export type QTableColumnProps = NonNullable<QTableProps['columns']>;

export interface QTableRequestProps {
  /**
   * Pagination object
   */
  pagination: QTablePaginationProps;
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
  getCellValue?: (col: any, row: any) => any;
}
