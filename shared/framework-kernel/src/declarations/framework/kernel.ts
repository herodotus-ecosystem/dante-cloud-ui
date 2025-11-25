import type { RouteRecordRaw } from 'vue-router';
import type { RouterOptions } from './router';
import type { HttpConfig } from '@herodotus-cloud/core';

interface VariableOptions {
  securityKey: string;
  redirectUri: string;
  tenantId: string;
  isUseCrypto: boolean;
  isAutoRefreshToken: boolean;
}

export interface KernelOptions {
  router: RouterOptions;
  variables: VariableOptions;
  staticRoutes: Array<RouteRecordRaw>;
  config: HttpConfig;
  signOutExtension: () => void;
}
