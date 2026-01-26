import { StatusEnum } from '@/enums';

export interface Domain {}

export interface Conditions {}

export interface Entity extends Domain {}

export interface Dto extends Entity {}

export interface AbstractEntity extends Entity {
  createTime?: Date;
  updateTime?: Date;
}

export interface AbstractAuditEntity extends AbstractEntity {
  createBy?: string;
  updateBy?: string;
  reversion?: number;
}

export interface AbstractSysEntity extends AbstractAuditEntity {
  status: StatusEnum;
  reserved: boolean;
  description: string;
  ranking: number;
}

export interface AbstractSysDto extends Dto {
  status: StatusEnum;
  reserved: boolean;
  description: string;
  ranking: number;
}

export type Page<T extends Entity> = {
  content: T[];
  totalElements: string;
  totalPages: number;
};

export type Slice<T extends Entity> = {
  content: T[];
  hasNext: boolean;
  hasPrevious: boolean;
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
  selector: number;
  children?: Array<Tree>;
}
