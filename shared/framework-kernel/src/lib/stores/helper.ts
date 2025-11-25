import { useCryptoStore } from './crypto';
import { useAuthenticationStore } from './authentication';
import { OptionsUtilities } from '../utilities';
import { AuthorizationTokenEnum } from '@herodotus-cloud/core';

export const getSystemHeaders = () => {
  const authentication = useAuthenticationStore();
  const crypto = useCryptoStore();
  const token = authentication.access_token;
  const sessionId = crypto.sessionId;

  const headers = {} as Record<string, string>;

  if (token) {
    headers['Authorization'] = AuthorizationTokenEnum.BEARER + token;
  }

  if (sessionId) {
    headers['X-Herodotus-Session-Id'] = sessionId;
  }

  const tenantId = OptionsUtilities.getTenantId();
  if (tenantId) {
    headers['X-Herodotus-Tenant-Id'] = tenantId;
  }

  return headers;
};
