import type {
  AxiosHttpResult,
  AccessTokenResponse,
  Conditions,
  Dictionary,
  Entity,
  Page,
  Pageable,
  Pagination,
  Sort,
  Tree,
  AbstractEntity,
  AbstractSysEntity,
  AbstractAuditEntity,
  HttpClientOptions,
} from '@herodotus-cloud/core';

import { ApplicationEnum } from '@/enums';

export interface BaseAppEntity extends AbstractSysEntity {
  appSecret: string;
  appName: string;
  appCode: string;
  applicationType: ApplicationEnum;
}

export interface BaseCmdbEntity extends AbstractSysEntity {
  purpose: string;
  contacts: string;
  phoneNumber: string;
}

export type {
  AxiosHttpResult,
  AccessTokenResponse,
  Conditions,
  Dictionary,
  Entity,
  Page,
  Pageable,
  Pagination,
  Sort,
  Tree,
  AbstractEntity,
  AbstractSysEntity,
  AbstractAuditEntity,
  HttpClientOptions,
};
