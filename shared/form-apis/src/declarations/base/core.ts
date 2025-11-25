export type {
  Entity,
  Conditions,
  HttpClientOptions,
  AxiosHttpResult,
  Page,
  Pageable,
  QBaseDataItem,
} from '@herodotus-cloud/core';

export interface BaseMongoEntity {
  id?: string;
  createTime?: Date;
  updateTime?: Date;
}
