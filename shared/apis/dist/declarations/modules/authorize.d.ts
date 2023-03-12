import type { BaseSysEntity, Entity, Conditions, BaseEntity, EmptyObject } from '../base';
export interface OAuth2ApplicationEntity extends BaseSysEntity {
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
    scopes: Array<OAuth2ScopeEntity>;
}
export interface OAuth2AuthorityEntity extends BaseSysEntity {
    authorityId: string;
    authorityCode: string;
    authorityName: string;
}
export interface OAuth2ScopeEntity extends BaseSysEntity {
    scopeId: string;
    scopeCode: string;
    scopeName: string;
    authorities: Array<OAuth2Authority>;
}
export interface OAuth2AuthorizationEntity extends Entity {
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
export interface OAuth2ComplianceEntity extends BaseEntity {
    complianceId: string;
    principalName: string;
    clientId: string;
    ip: string;
    mobile: boolean;
    osName: string;
    browserName: string;
    mobileBrowser: boolean;
    engineName: string;
    mobilePlatform: boolean;
    iphoneOrIpod: boolean;
    ipad: boolean;
    ios: boolean;
    android: boolean;
    operation: string;
}
export interface OAuth2ApplicationConditions extends Conditions {
}
export interface OAuth2Authority extends Conditions {
}
export interface OAuth2ScopeConditions extends Conditions {
}
export interface OAuth2AuthorizationConditions extends Conditions {
}
export interface OAuth2ComplianceConditions extends Conditions {
    principalName: string;
    clientId: string;
    ip: string;
}
export interface OAuth2AuthorityAssigned extends Conditions {
    authorityId: string;
    authorityCode: string;
    serviceId: string;
    requestMethod: string;
    url: string;
}
export interface OAuth2ScopeAssigned extends Conditions {
    scopeId: string;
    authorities: Array<OAuth2AuthorityAssigned>;
}
export type OAuth2ApplicationProps = keyof OAuth2ApplicationEntity;
export type OAuth2AuthorityProps = keyof OAuth2AuthorityEntity;
export type OAuth2ScopeProps = keyof OAuth2ScopeEntity;
export type OAuth2AuthorizationProps = keyof OAuth2AuthorizationEntity;
export type OAuth2ComplianceProps = keyof OAuth2ComplianceEntity;
