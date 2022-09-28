import type {
  AssetServer,
  AssetApplication,
  DatabaseAccount,
  DatabaseCatalog,
  DatabaseInstance
} from '/@/declarations';

import { BaseService, ApiConfig } from '../base';

class AssetServerService extends BaseService<AssetServer> {
  private static instance: AssetServerService;

  private constructor(config: ApiConfig) {
    super(config);
  }

  public static getInstance(config: ApiConfig): AssetServerService {
    if (this.instance == null) {
      this.instance = new AssetServerService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getCmdb() + '/asset/server';
  }
}

class AssetApplicationService extends BaseService<AssetApplication> {
  private static instance: AssetApplicationService;

  private constructor(config: ApiConfig) {
    super(config);
  }

  public static getInstance(config: ApiConfig): AssetApplicationService {
    if (this.instance == null) {
      this.instance = new AssetApplicationService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getCmdb() + '/asset/application';
  }
}

class DatabaseAccountService extends BaseService<DatabaseAccount> {
  private static instance: DatabaseAccountService;

  private constructor(config: ApiConfig) {
    super(config);
  }

  public static getInstance(config: ApiConfig): DatabaseAccountService {
    if (this.instance == null) {
      this.instance = new DatabaseAccountService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getCmdb() + '/db/account';
  }
}

class DatabaseCatalogService extends BaseService<DatabaseCatalog> {
  private static instance: DatabaseCatalogService;

  private constructor(config: ApiConfig) {
    super(config);
  }

  public static getInstance(config: ApiConfig): DatabaseCatalogService {
    if (this.instance == null) {
      this.instance = new DatabaseCatalogService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getCmdb() + '/db/catalog';
  }
}

class DatabaseInstanceService extends BaseService<DatabaseInstance> {
  private static instance: DatabaseInstanceService;

  private constructor(config: ApiConfig) {
    super(config);
  }

  public static getInstance(config: ApiConfig): DatabaseInstanceService {
    if (this.instance == null) {
      this.instance = new DatabaseInstanceService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getCmdb() + '/db/instance';
  }
}

export {
  AssetServerService,
  AssetApplicationService,
  DatabaseAccountService,
  DatabaseCatalogService,
  DatabaseInstanceService
};
