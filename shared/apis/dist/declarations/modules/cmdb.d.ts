import { BaseCmdbEntity, Conditions, EmptyObject } from '../base';
export interface AssetServerEntity extends BaseCmdbEntity {
    serverId: string;
    deviceType: number | EmptyObject;
    assetId: string;
    cabinetNumber: string;
    cabinetOrder: string;
    hostName: string;
    serialNumber: string;
    manufacturer: string;
    model: string;
    actualIp: string;
    manageIp: string;
    osPlatform: string;
    osVersion: string;
    cpuCount: number;
    cpuPhysicalCount: number;
    cpuModel: string;
}
export interface AssetApplicationEntity extends BaseCmdbEntity {
    applicationId: string;
    applicationName: string;
    department: string;
    employee: string;
    protectionGrade: string;
    protectionFilingNo: string;
    constructionUnit: string;
    servers: Array<AssetServerEntity>;
}
export interface DatabaseAccountEntity extends BaseCmdbEntity {
    accountId: string;
    username: string;
    credentials: string;
    credentialsExpireAt: string;
}
export interface DatabaseCatalogEntity extends BaseCmdbEntity {
    catalogId: string;
    catalogName: string;
    accounts: Array<DatabaseAccountEntity>;
}
export interface DatabaseInstanceEntity extends BaseCmdbEntity {
    instanceId: string;
    dbType: number | EmptyObject;
    dbVersion: string;
    dbPorts: string;
    catalogs: Array<DatabaseCatalogEntity>;
    assetServer: AssetServerEntity;
}
export interface AssetServerConditions extends Conditions {
    actualIp: string;
    assetId: string;
    cabinetNumber: string;
    serialNumber: string;
    hostName: string;
}
export interface AssetApplicationConditions extends Conditions {
}
export interface DatabaseAccountConditions extends Conditions {
}
export interface DatabaseCatalogConditions extends Conditions {
}
export interface DatabaseInstanceConditions extends Conditions {
}
export type AssetServerProps = keyof AssetServerEntity;
export type AssetApplicationProps = keyof AssetApplicationEntity;
export type DatabaseAccountProps = keyof DatabaseAccountEntity;
export type DatabaseCatalogProps = keyof DatabaseCatalogEntity;
export type DatabaseInstanceProps = keyof DatabaseInstanceEntity;
