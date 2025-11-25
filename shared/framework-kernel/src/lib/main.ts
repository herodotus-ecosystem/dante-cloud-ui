import type { KernelOptions } from '@/declarations';

// 防止 store 类出现异常提示
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { SecurityApiResources } from './api';
import { OptionsUtilities, RouterUtilities, SignOutUtilities } from './utilities';

const initializer = (options: KernelOptions) => {
  OptionsUtilities.initialize(options);
  RouterUtilities.initialize(options.router);
  SecurityApiResources.initialize(options.config);
  SignOutUtilities.initialize(options.signOutExtension);
};

export { initializer };
