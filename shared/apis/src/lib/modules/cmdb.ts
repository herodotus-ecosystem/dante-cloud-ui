import type {
  AssetServerEntity,
  AssetApplicationEntity,
  DatabaseAccountEntity,
  DatabaseCatalogEntity,
  DatabaseInstanceEntity
} from '/@/declarations';

import { BaseService, HttpConfig } from '../base';

class AssetServerService extends BaseService<AssetServerEntity> {
  private static instance: AssetServerService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): AssetServerService {
    if (this.instance == null) {
      this.instance = new AssetServerService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getCmdb() + '/asset/server';
  }
}

class AssetApplicationService extends BaseService<AssetApplicationEntity> {
  private static instance: AssetApplicationService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): AssetApplicationService {
    if (this.instance == null) {
      this.instance = new AssetApplicationService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getCmdb() + '/asset/application';
  }
}

class DatabaseAccountService extends BaseService<DatabaseAccountEntity> {
  private static instance: DatabaseAccountService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): DatabaseAccountService {
    if (this.instance == null) {
      this.instance = new DatabaseAccountService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getCmdb() + '/db/account';
  }
}

class DatabaseCatalogService extends BaseService<DatabaseCatalogEntity> {
  private static instance: DatabaseCatalogService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): DatabaseCatalogService {
    if (this.instance == null) {
      this.instance = new DatabaseCatalogService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getCmdb() + '/db/catalog';
  }
}

class DatabaseInstanceService extends BaseService<DatabaseInstanceEntity> {
  private static instance: DatabaseInstanceService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): DatabaseInstanceService {
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
