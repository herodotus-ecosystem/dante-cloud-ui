import type { AssetServer, AssetApplication, DatabaseAccount, DatabaseCatalog, DatabaseInstance } from '../../declarations';
import { BaseService, ApiConfig } from '../base';
declare class AssetServerService extends BaseService<AssetServer> {
    private static instance;
    private constructor();
    static getInstance(config: ApiConfig): AssetServerService;
    getBaseAddress(): string;
}
declare class AssetApplicationService extends BaseService<AssetApplication> {
    private static instance;
    private constructor();
    static getInstance(config: ApiConfig): AssetApplicationService;
    getBaseAddress(): string;
}
declare class DatabaseAccountService extends BaseService<DatabaseAccount> {
    private static instance;
    private constructor();
    static getInstance(config: ApiConfig): DatabaseAccountService;
    getBaseAddress(): string;
}
declare class DatabaseCatalogService extends BaseService<DatabaseCatalog> {
    private static instance;
    private constructor();
    static getInstance(config: ApiConfig): DatabaseCatalogService;
    getBaseAddress(): string;
}
declare class DatabaseInstanceService extends BaseService<DatabaseInstance> {
    private static instance;
    private constructor();
    static getInstance(config: ApiConfig): DatabaseInstanceService;
    getBaseAddress(): string;
}
export { AssetServerService, AssetApplicationService, DatabaseAccountService, DatabaseCatalogService, DatabaseInstanceService };
