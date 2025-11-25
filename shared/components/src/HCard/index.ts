import type { App } from 'vue';

import HCardTitle from './HCardTitle.vue';
import HChartCard from './HChartCard.vue';

HCardTitle.install = (app: App): void => {
  app.component(HCardTitle.name as string, HCardTitle);
};

HChartCard.install = (app: App): void => {
  app.component(HChartCard.name as string, HChartCard);
};

export { HCardTitle, HChartCard };
