import type { App } from 'vue';

import { HButton, HIconButton, HVisibilityButton } from './HButton';
import { HChartCard } from './HCard';
import { HDivider } from './HDivider';
import { HDialog } from './HDialog';
import { HSwitch, HTextField, HSelect, HIconSelect, HDateTime, HDuration } from './HForm';
import { HColumn, HContainer, HRow } from './HGrid';
import { HLabel, HCenterLabel } from './HLabel';
import { HListItem } from './HList';
import { HLoading } from './HLoading';
import { HPagination } from './HPagination';
import { HParticles } from './HParticles';
import { HSignInBackground } from './HBackground';

const components = [
  HButton,
  HCenterLabel,
  HChartCard,
  HColumn,
  HContainer,
  HDateTime,
  HDivider,
  HDialog,
  HDuration,
  HIconButton,
  HIconSelect,
  HLabel,
  HListItem,
  HLoading,
  HPagination,
  HParticles,
  HRow,
  HSelect,
  HSignInBackground,
  HSwitch,
  HTextField,
  HVisibilityButton
];

const install = (app: App) => {
  components.map(component => app.component(component.name as string, component));
};

export {
  HButton,
  HCenterLabel,
  HChartCard,
  HColumn,
  HContainer,
  HDateTime,
  HDivider,
  HDialog,
  HDuration,
  HIconButton,
  HIconSelect,
  HLabel,
  HListItem,
  HLoading,
  HPagination,
  HParticles,
  HRow,
  HSelect,
  HSignInBackground,
  HSwitch,
  HTextField,
  HVisibilityButton
};

export * from './lib';

export default {
  install
};
