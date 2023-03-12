import type { AxiosHttpResult, OAuth2Token, Conditions, ConstantDictionary, Dictionary, EmptyObject, Entity, Page, Pageable, Pagination, Sort, Tree, BaseEntity, BaseSysEntity } from '@herodotus/core';
import { ApplicationEnum } from '../../enums';
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
export type { AxiosHttpResult, OAuth2Token, Conditions, ConstantDictionary, Dictionary, EmptyObject, Entity, Page, Pageable, Pagination, Sort, Tree, BaseEntity, BaseSysEntity };
