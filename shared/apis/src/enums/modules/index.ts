export { ContentTypeEnum } from '@herodotus/utils';

export enum AuthorityTypeEnum {
  API,
  MENU,
  PAGE,
  MINI_PAGE
}

export enum IdentityEnum {
  LEADERSHIP,
  SECTION_LEADER,
  STAFF
}

export enum GenderEnum {
  OTHERS,
  MAN,
  WOMAN
}

export enum StatusEnum {
  FORBIDDEN,
  ENABLE,
  LOCKING,
  EXPIRED
}

export enum ConstantEnum {
  APPLICATION = 'applicationType',
  GENDER = 'gender',
  GRANT = 'grantType',
  IDENTITY = 'identity',
  STATUS = 'status',
  SUPPLIER = 'supplierType',
  TECHNOLOGY = 'technologyType',
  EXPRESSION = 'expression'
}

export enum ApplicationEnum {
  WEB,
  SERVICE,
  APP,
  WAP,
  MINI
}

export enum TechnologyEnum {
  JAVA,
  NET,
  PHP,
  NODE,
  IOS,
  ANDROID,
  WEAPP,
  ALIAPP,
  DUAPP
}

export enum SupplierType {
  CORE,
  BAT,
  THIRD_PARTY,
  Outsourcing
}
