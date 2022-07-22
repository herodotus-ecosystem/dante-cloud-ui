import type { BaseCmdbEntity, Conditions } from '../base';

export interface AssetServer extends BaseCmdbEntity {
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

export interface AssetApplication extends BaseCmdbEntity {
	applicationId: string;
	applicationName: string;
	department: string;
	employee: string;
	protectionGrade: string;
	protectionFilingNo: string;
	constructionUnit: string;
	servers: Array<AssetServer>;
}

export interface DatabaseAccount extends BaseCmdbEntity {
	accountId: string;
	username: string;
	credentials: string;
	credentialsExpireAt: string;
}

export interface DatabaseCatalog extends BaseCmdbEntity {
	catalogId: string;
	catalogName: string;
	accounts: Array<DatabaseAccount>;
}

export interface DatabaseInstance extends BaseCmdbEntity {
	instanceId: string;
	dbType: number | EmptyObject;
	dbVersion: string;
	dbPorts: string;
	catalogs: Array<DatabaseCatalog>;
	assetServer: AssetServer;
}

export interface AssetServerConditions extends Conditions {}

export interface AssetApplicationConditions extends Conditions {}

export interface DatabaseAccountConditions extends Conditions {}

export interface DatabaseCatalogConditions extends Conditions {}

export interface DatabaseInstanceConditions extends Conditions {}
