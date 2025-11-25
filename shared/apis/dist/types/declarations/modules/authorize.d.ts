import { AbstractSysEntity, Entity, Conditions, AbstractAuditEntity } from '../base';
export interface BaseRegisteredClientEntity extends AbstractSysEntity {
    clientIdIssuedAt: string;
    clientSecretExpiresAt: string;
    clientAuthenticationMethods: Array<string>;
    authorizationGrantTypes: Array<string>;
    redirectUris: string;
    postLogoutRedirectUris: string;
    clientId: string;
    clientSecret: string;
    requireProofKey: boolean;
    requireAuthorizationConsent: boolean;
    jwkSetUrl: string;
    authenticationSigningAlgorithm: string;
    x509CertificateSubjectDN: string;
    authorizationCodeTimeToLive: string;
    deviceCodeTimeToLive: string;
    accessTokenTimeToLive: string;
    refreshTokenTimeToLive: string;
    tokenFormat: string;
    reuseRefreshTokens: boolean;
    idTokenSignatureAlgorithmJwsAlgorithm: string;
    x509CertificateBoundAccessTokens: boolean;
    scopes: Array<OAuth2ScopeEntity>;
}
export interface OAuth2ApplicationEntity extends BaseRegisteredClientEntity {
    applicationId: string;
    applicationName: string;
    abbreviation: string;
    logo: string;
    homepage: string;
    applicationType: string;
}
export interface OAuth2PermissionEntity extends AbstractSysEntity {
    permissionId: string;
    permissionCode: string;
    permissionName: string;
}
export interface OAuth2ScopeEntity extends AbstractSysEntity {
    scopeId: string;
    scopeCode: string;
    scopeName: string;
    permissions: Array<OAuth2PermissionEntity>;
}
export interface OAuth2AuthorizationEntity extends Entity {
    id: string;
    registeredClientId: string;
    principalName: string;
    authorizationGrantType: string;
    accessTokenIssuedAt: string;
    accessTokenExpiresAt: string;
    refreshTokenIssuedAt: string;
    refreshTokenExpiresAt: string;
}
export interface OAuth2CredentialRecordEntity extends Entity {
    credentialId: string;
    signatureCount: number;
    label: string;
    lastUsed: Date;
    created: Date;
    username: string;
}
export interface AbstractAuditRecord extends AbstractAuditEntity {
    principalName: string;
    clientId: string;
    ip: string;
    mobile: boolean;
    browserName: string;
    mobileBrowser: boolean;
    browserVersion: string;
    platformName: string;
    osName: string;
    osVersion: string;
    browserEngineName: string;
    browserEngineVersion: string;
}
export interface OAuth2InterfaceAuditEntity extends AbstractAuditRecord {
    auditId: string;
    requestMethod: string;
    url: string;
    serviceId: string;
}
export interface OAuth2UserLoggingEntity extends AbstractAuditRecord {
    loggingId: string;
    operation: string;
    location: string;
}
export interface OAuth2ApplicationConditions extends Conditions {
}
export interface OAuth2PermissionCondition extends Conditions {
}
export interface OAuth2ScopeConditions extends Conditions {
}
export interface OAuth2AuthorizationConditions extends Conditions {
}
export interface OAuth2CredentialRecordConditions extends Conditions {
    username: string;
}
export interface OAuth2UserLoggingConditions extends Conditions {
    principalName: string;
    clientId: string;
    ip: string;
}
export interface OAuth2InterfaceAuditConditions extends OAuth2UserLoggingConditions {
    requestMethod: string;
    url: string;
}
export type OAuth2ApplicationProps = keyof OAuth2ApplicationEntity;
export type OAuth2PermissionProps = keyof OAuth2PermissionEntity;
export type OAuth2ScopeProps = keyof OAuth2ScopeEntity;
export type OAuth2AuthorizationProps = keyof OAuth2AuthorizationEntity;
export type OAuth2CredentialRecordProps = keyof OAuth2CredentialRecordEntity;
export type OAuth2UserLoggingProps = keyof OAuth2UserLoggingEntity;
export type OAuth2InterfaceAuditProps = keyof OAuth2InterfaceAuditEntity;
export interface OAuth2PermissionBody extends Conditions {
    permissionId: string;
    permissionCode: string;
    permissionName: string;
}
export interface OAuth2ScopeAssignedBody extends Conditions {
    scopeId: string;
    permissions: Array<OAuth2PermissionBody>;
}
