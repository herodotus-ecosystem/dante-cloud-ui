import { AuthorizationGrantTypeEnum } from '@/enums';

// ------------------------------ OAuth2 Flow Request Begin  ------------------------------

interface TokenRequest {
  grant_type: string;
}

interface AccessTokenRequest extends TokenRequest {
  client_id?: string;
  client_secret?: string;
  scope?: string;
}

interface RefreshTokenRequest extends TokenRequest {
  access_token: string;
}

interface ClientCredentialsFlowRequest extends AccessTokenRequest {}

interface PasswordFlowRequest extends AccessTokenRequest {
  username: string;
  password: string;
}

export type GrantFlowRequest =
  | AccessTokenRequest
  | RefreshTokenRequest
  | ClientCredentialsFlowRequest
  | PasswordFlowRequest;

export interface OidcClientRegistrationRequest {
  product_key: string;
  grant_types: Array<AuthorizationGrantTypeEnum>;
  redirect_uris: Array<string>;
  client_name: string;
  scope?: string;
  token_endpoint_auth_method?: string;
}

// ------------------------------ OAuth2 Flow Request End  ------------------------------

// ------------------------------ OAuth2 Flow Response Begin  ------------------------------
interface TokenResponse {
  license?: string;
  openid?: string;
  scope: string;
  token_type: string;
}

export interface AccessTokenResponse extends TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  id_token?: string;
}

export interface OidcIdTokenResponse extends TokenResponse {
  roles: Array<string>;
  employeeId: string;
  avatar: string;
  client_id: string;
  active: boolean;
  sub: string;
  iss: string;
  aud: Array<string>;
  nbf: number;
  exp: number;
  iat: number;
  jti: string;
}

export type DeviceAuthorizationResponse = {
  user_code: string;
  device_code: string;
  verification_uri_complete: string;
  verification_uri: string;
  expires_in: number;
};

/**
 * OAuth2 PKCE 参数
 */
export interface PkceCodePair {
  codeVerifier: string;
  codeChallenge: string;
}

// ------------------------------ OAuth2 Flow Response End  ------------------------------
