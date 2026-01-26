import type { Router } from 'vue-router';
import type { KernelOptions } from '@herodotus-cloud/framework-kernel';

import { initializer, RouterUtilities } from '@herodotus-cloud/framework-kernel';
import { Path } from './constants';
import { VARIABLES } from './variables';
import { config } from './http';
import { useWebSocketMessage } from '@/composables/hooks';
import { useDictionaryStore } from '@/composables/stores';

let RouterUtils = {} as RouterUtilities;

const setupKernel = (currentRouter: Router) => {
  const options: KernelOptions = {
    router: {
      instance: currentRouter,
      path: {
        root: { path: Path.ROOT },
        home: { name: Path.HOME_NAME },
        signIn: { name: Path.SIGN_IN_NAME },
      },
    },
    staticRoutes: currentRouter.getRoutes(),
    config: config,
    variables: {
      securityKey: VARIABLES.getSecretKey(),
      tenantId: VARIABLES.getCurrentTenantId(),
      isAutoRefreshToken: VARIABLES.getAutoRefreshToken(),
      isUseCrypto: VARIABLES.isUseCrypto(),
      redirectUri: VARIABLES.getRedirectUri(),
    },
    signOutExtension: () => {
      const { disconnect } = useWebSocketMessage();
      disconnect();
      useDictionaryStore().$reset();
    },
  };

  initializer(options);

  RouterUtils = RouterUtilities.getInstance();
};

export { setupKernel, RouterUtils };
