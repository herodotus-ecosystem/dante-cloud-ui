import { AssetServerEntity, AssetApplicationEntity, DatabaseAccountEntity, DatabaseCatalogEntity, DatabaseInstanceEntity } from '../../declarations';
import { BaseService, HttpConfig } from '../base';
declare class AssetServerService extends BaseService<AssetServerEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): AssetServerService;
    getBaseAddress(): string;
}
declare class AssetApplicationService extends BaseService<AssetApplicationEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): AssetApplicationService;
    getBaseAddress(): string;
}
declare class DatabaseAccountService extends BaseService<DatabaseAccountEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): DatabaseAccountService;
    getBaseAddress(): string;
}
declare class DatabaseCatalogService extends BaseService<DatabaseCatalogEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): DatabaseCatalogService;
    getBaseAddress(): string;
}
declare class DatabaseInstanceService extends BaseService<DatabaseInstanceEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): DatabaseInstanceService;
    getBaseAddress(): string;
}
export { AssetServerService, AssetApplicationService, DatabaseAccountService, DatabaseCatalogService, DatabaseInstanceService };
