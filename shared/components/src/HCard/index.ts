import type { App } from 'vue';

import HChartCard from './HChartCard.vue';

HChartCard.install = (app: App): void => {
  app.component(HChartCard.name as string, HChartCard);
};

export { HChartCard };
