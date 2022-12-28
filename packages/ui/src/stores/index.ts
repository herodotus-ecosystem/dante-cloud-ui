import { useNotificationStore, useWebSocketStore } from './message';
import { useApplicationStore } from './application';
import { useAuthenticationStore } from './authentication';
import { useConstantsStore } from './constants';
import { useRouteStore } from './route';
import { useCryptoStore } from './crypto';
import { useSettingsStore } from './settings';
import { useTabsStore } from './tabs';

export const clearPersistData = () => {
  console.log('Clear Persist Data');
  useAuthenticationStore().$reset();
  useConstantsStore().$reset();
  useCryptoStore().$reset();
};

export {
  useNotificationStore,
  useWebSocketStore,
  useApplicationStore,
  useAuthenticationStore,
  useConstantsStore,
  useRouteStore,
  useCryptoStore,
  useSettingsStore,
  useTabsStore
};
