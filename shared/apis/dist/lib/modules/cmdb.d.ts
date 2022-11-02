import type { AssetServer, AssetApplication, DatabaseAccount, DatabaseCatalog, DatabaseInstance } from '../../declarations';
import { BaseService, HttpConfig } from '../base';
declare class AssetServerService extends BaseService<AssetServer> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): AssetServerService;
    getBaseAddress(): string;
}
declare class AssetApplicationService extends BaseService<AssetApplication> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): AssetApplicationService;
    getBaseAddress(): string;
}
declare class DatabaseAccountService extends BaseService<DatabaseAccount> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): DatabaseAccountService;
    getBaseAddress(): string;
}
declare class DatabaseCatalogService extends BaseService<DatabaseCatalog> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): DatabaseCatalogService;
    getBaseAddress(): string;
}
declare class DatabaseInstanceService extends BaseService<DatabaseInstance> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): DatabaseInstanceService;
    getBaseAddress(): string;
}
export { AssetServerService, AssetApplicationService, DatabaseAccountService, DatabaseCatalogService, DatabaseInstanceService };
