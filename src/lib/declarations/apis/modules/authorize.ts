import type { BaseSysEntity, Entity } from '../base';

export interface OAuth2Application extends BaseSysEntity {
	applicationId: string;
	applicationName: string;
	abbreviation: string;
	logo: string;
	homepage: string;
	applicationType: number | EmptyObject;
	clientId: string;
	clientSecret: string;
	redirectUris: string;
	authorizationGrantTypes: string;
	clientAuthenticationMethods: string;
	requireProofKey: boolean;
	requireAuthorizationConsent: boolean;
	jwkSetUrl: string;
	accessTokenValidity: string;
	reuseRefreshTokens: boolean;
	refreshTokenValidity: string;
	signature: number | EmptyObject;
	clientSecretExpiresAt: string;
	authenticationSigningAlgorithm: number | EmptyObject;
	accessTokenFormat: number | EmptyObject;
	idTokenSignatureAlgorithm: number | EmptyObject;
	scopes: Set<OAuth2Scope>;
}

export interface OAuth2Authority extends BaseSysEntity {
	authorityId: string;
	authorityCode: string;
	serviceId: string;
	requestMethod: string;
	url: string;
}

export interface OAuth2Scope extends BaseSysEntity {
	scopeId: string;
	scopeCode: string;
	scopeName: string;
	authorities: Array<OAuth2Authority>;
}

export interface OAuth2Token extends Entity {
	id: string;
	registeredClientId: string;
	principalName: string;
	authorizationGrantType: string;
	attributes: string;
	state: string;
	authorizationCode: string;
	authorizationCodeIssuedAt: string;
	authorizationCodeExpiresAt: string;
	authorizationCodeMetadata: string;
	accessToken: string;
	accessTokenIssuedAt: string;
	accessTokenExpiresAt: string;
	accessTokenMetadata: string;
	accessTokenType: string;
	accessTokenScopes: string;
	oidcIdToken: string;
	oidcIdTokenIssuedAt: string;
	oidcIdTokenExpiresAt: string;
	oidcIdTokenMetadata: string;
	oidcIdTokenClaims: string;
	refreshToken: string;
	refreshTokenIssuedAt: string;
	refreshTokenExpiresAt: string;
	refreshTokenMetadata: string;
}
