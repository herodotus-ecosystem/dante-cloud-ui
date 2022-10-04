import { BreakPointEnum, TableSeparatorEnum } from '../enums';

export type BreakPoint = keyof typeof BreakPointEnum;
export type TableSeparator = keyof typeof TableSeparatorEnum | undefined;

export interface QTablePaginationProp {
  /**
   * Column name (from column definition)
   */
  sortBy: string;
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
  /**
   * For server-side fetching only. How many total database rows are there to be added to the table. If set, causes the QTable to emit @request when data is required.
   */
  rowsNumber?: number;
}

export interface QTableRequestProp {
  /**
   * Pagination object
   */
  pagination: QTablePaginationProp;
  /**
   * Filter method (the 'filter-method' prop)
   * @param rows Array of rows
   * @param terms Terms to filter with (is essentially the 'filter' prop value)
   * @param cols Optional column definitions
   * @param getCellValue Optional function to get a cell value
   * @returns Filtered rows
   */
  filter?: (
    rows: readonly any[],
    terms: string | any,
    cols?: readonly any[],
    getCellValue?: (col: any, row: any) => any
  ) => readonly any[];
  /**
   * Function to get a cell value
   * @param col Column name from column definitions
   * @param row The row object
   * @returns Parsed/Processed cell value
   */
  getCellValue?: (col: any, row: any) => any;
}
