export type { Entity, Conditions, AxiosHttpResult, Page, Pageable, QBaseDataItem } from '@herodotus/core';
export interface BaseMongoEntity {
    id?: string;
    createTime?: Date;
    updateTime?: Date;
}
