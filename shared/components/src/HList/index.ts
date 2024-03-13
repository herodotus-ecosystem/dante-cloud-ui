import type { App } from 'vue';

import HListItem from './HListItem.vue';

HListItem.install = (app: App): void => {
  app.component(HListItem.name as string, HListItem);
};

export { HListItem };
