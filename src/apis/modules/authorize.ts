import type { OAuth2Application, OAuth2Scope, OAuth2Token } from '/@/lib/declarations';

import { BaseService } from '../base';
import { service } from '/@/lib/utils';

class OAuth2ApplicationService extends BaseService<OAuth2Application> {
	private static instance = new OAuth2ApplicationService();

	private constructor() {
		super();
	}

	public static getInstance(): OAuth2ApplicationService {
		return this.instance;
	}

	public getBaseAddress(): string {
		return service.getUaa() + '/authorize/application';
	}
}

class OAuth2ScopeService extends BaseService<OAuth2Scope> {
	private static instance = new OAuth2ScopeService();

	private constructor() {
		super();
	}

	public static getInstance(): OAuth2ScopeService {
		return this.instance;
	}

	public getBaseAddress(): string {
		return service.getUaa() + '/authorize/scope';
	}
}

class OAuth2TokenService extends BaseService<OAuth2Token> {
	private static instance = new OAuth2TokenService();

	private constructor() {
		super();
	}

	public static getInstance(): OAuth2TokenService {
		return this.instance;
	}

	public getBaseAddress(): string {
		return service.getUaa() + '/authorize/authorization';
	}
}

export function useAuthorizeApi() {
	return {
		application: OAuth2ApplicationService.getInstance(),
		scope: OAuth2ScopeService.getInstance(),
		token: OAuth2TokenService.getInstance(),
	};
}
