import type { AssetServer, AssetApplication, DatabaseAccount, DatabaseCatalog, DatabaseInstance, AxiosHttpResult } from '/@/lib/declarations';

import { BaseService } from '../base';
import { service, http } from '/@/lib/utils';

class AssetServerService extends BaseService<AssetServer> {
	private static instance = new AssetServerService();

	private constructor() {
		super();
	}

	public static getInstance(): AssetServerService {
		return this.instance;
	}

	public getBaseAddress(): string {
		return service.getCmdb() + '/asset/server';
	}
}

class AssetApplicationService extends BaseService<AssetApplication> {
	private static instance = new AssetApplicationService();

	private constructor() {
		super();
	}

	public static getInstance(): AssetApplicationService {
		return this.instance;
	}

	public getBaseAddress(): string {
		return service.getCmdb() + '/asset/application';
	}
}

class DatabaseAccountService extends BaseService<DatabaseAccount> {
	private static instance = new DatabaseAccountService();

	private constructor() {
		super();
	}

	public static getInstance(): DatabaseAccountService {
		return this.instance;
	}

	public getBaseAddress(): string {
		return service.getCmdb() + '/db/account';
	}
}

class DatabaseCatalogService extends BaseService<DatabaseCatalog> {
	private static instance = new DatabaseCatalogService();

	private constructor() {
		super();
	}

	public static getInstance(): DatabaseCatalogService {
		return this.instance;
	}

	public getBaseAddress(): string {
		return service.getCmdb() + '/db/catalog';
	}
}

class DatabaseInstanceService extends BaseService<DatabaseInstance> {
	private static instance = new DatabaseInstanceService();

	private constructor() {
		super();
	}

	public static getInstance(): DatabaseInstanceService {
		return this.instance;
	}

	public getBaseAddress(): string {
		return service.getCmdb() + '/db/instance';
	}
}

export function useCmdbApi() {
	return {
		server: AssetServerService.getInstance(),
		application: AssetApplicationService.getInstance(),
		dbAccount: DatabaseAccountService.getInstance(),
		dbCatalog: DatabaseCatalogService.getInstance(),
		dbInstance: DatabaseInstanceService.getInstance(),
	};
}
