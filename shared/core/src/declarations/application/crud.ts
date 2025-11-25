import { StatusEnum } from '@/enums';

export interface Entity {}

export interface Conditions {}

export type Page<T extends Entity> = {
  content: T[];
  totalElements: string;
  totalPages: number;
};

export interface Sort {
  direction?: 'ASC' | 'DESC';
  properties?: Array<string>;
}

export interface Pagination {
  pageNumber: number;
  pageSize: number;
}

export interface Pageable extends Pagination, Sort {}

export interface Tree {
  id: string;
  parentId: string;
  name: string;
  weight: number;
}

export interface BaseEntity extends Entity {
  createTime?: Date;
  updateTime?: Date;
  createBy?: string;
  updateBy?: string;
  ranking?: number;
}

export interface BaseSysEntity extends BaseEntity {
  status: StatusEnum;
  reserved: boolean;
  reversion: number;
  description: string;
}
