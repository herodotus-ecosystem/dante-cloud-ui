import type { OAuth2Application, OAuth2Scope, OAuth2Token, OAuth2Compliance, AxiosHttpResult, OAuth2ScopeAssigned } from '/@/lib/declarations';

import { BaseService } from '../base';
import { service, http } from '/@/lib/utils';

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

	public getAssignedAddress(): string {
		return this.getBaseAddress() + '/assigned';
	}

	public getScopeCodePath(scopeCode: string): string {
		return this.getParamPath(this.getBaseAddress(), scopeCode);
	}

	public fetchByScopeCode(scopeCode: string): Promise<AxiosHttpResult<OAuth2Scope>> {
		return http.get<OAuth2Scope, string>(this.getScopeCodePath(scopeCode));
	}

	public assigned(data: OAuth2ScopeAssigned): Promise<AxiosHttpResult<OAuth2Scope>> {
		return http.post(this.getAssignedAddress(), data);
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

class OAuth2ComplianceService extends BaseService<OAuth2Compliance> {
	private static instance = new OAuth2ComplianceService();

	private constructor() {
		super();
	}

	public static getInstance(): OAuth2ComplianceService {
		return this.instance;
	}

	public getBaseAddress(): string {
		return service.getUaa() + '/authorize/compliance';
	}
}

export function useAuthorizeApi() {
	return {
		application: OAuth2ApplicationService.getInstance(),
		scope: OAuth2ScopeService.getInstance(),
		token: OAuth2TokenService.getInstance(),
		compliance: OAuth2ComplianceService.getInstance(),
	};
}
