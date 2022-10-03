import type { App } from 'vue';

import { HButton, HIconButton, HVisibilityButton } from './HButton';
import { HChartCard } from './HCard';
import { HDivider } from './HDivider';
import { HSwitch, HTextField } from './HForm';
import { HColumn, HContainer, HRow } from './HGrid';
import { HLabel } from './HLabel';
import { HListItem } from './HListItem';
import { HLoading } from './HLoading';
import { HPagination } from './HPagination';
import { HParticles } from './HParticles';
import { HSelect } from './HSelect';

const components = [
  HButton,
  HChartCard,
  HColumn,
  HContainer,
  HDivider,
  HIconButton,
  HLabel,
  HListItem,
  HLoading,
  HPagination,
  HParticles,
  HRow,
  HSelect,
  HSwitch,
  HTextField,
  HVisibilityButton
];

const install = (app: App) => {
  components.map(component => app.component(component.name, component));
};

export {
  HButton,
  HChartCard,
  HColumn,
  HContainer,
  HDivider,
  HIconButton,
  HLabel,
  HLoading,
  HListItem,
  HPagination,
  HParticles,
  HRow,
  HSelect,
  HSwitch,
  HTextField,
  HVisibilityButton
};

export * from './lib';

export default {
  install
};
