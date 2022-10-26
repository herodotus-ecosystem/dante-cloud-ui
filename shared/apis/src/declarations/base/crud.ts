import type { Entity } from './core';

import { StatusEnum, ApplicationEnum } from '/@/enums';

export type Page<T extends Entity> = {
  content: T[];
  totalElements: string;
  totalPages: number;
};

export interface Sort {
  direction: 'ASC' | 'DESC';
  properties: Array<string>;
}

export interface Pageable extends Sort {
  pageNumber: number;
  pageSize: number;
}

export interface BaseTree {
  id: string;
  parentId: string;
  name: string;
  weight: number;
}

export interface BaseEntity extends Entity {
  createTime: Date;
  updateTime: Date;
  ranking: number;
}

export interface BaseSysEntity extends BaseEntity {
  status: StatusEnum;
  reserved: boolean;
  reversion: number;
  description: string;
}

export interface BaseAppEntity extends BaseSysEntity {
  appSecret: string;
  appName: string;
  appCode: string;
  applicationType: ApplicationEnum;
}

export interface BaseCmdbEntity extends BaseSysEntity {
  purpose: string;
  contacts: string;
  phoneNumber: string;
}
