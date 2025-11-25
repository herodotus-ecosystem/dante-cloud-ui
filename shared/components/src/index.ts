import type { App } from 'vue';

import { HButton, HIconButton, HVisibilityButton } from './HButton';
import { HCardTitle, HChartCard } from './HCard';
import { HDateTime, HDuration } from './HDateTime';
import { HDivider } from './HDivider';
import { HDialog } from './HDialog';
import { HSwitch, HTextField, HSelect, HIconSelect, HFieldLabel, HTreeField, HLabel, HCenterLabel } from './HForm';
import { HColumn, HContainer, HRow } from './HGrid';
import { HListItem } from './HList';
import { HLoading } from './HLoading';
import { HPagination } from './HPagination';
import { HParticles } from './HParticles';
import { HSignInBackground } from './HBackground';

const components = [
  HButton,
  HCardTitle,
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
  HFieldLabel,
  HTreeField,
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
  HVisibilityButton,
];

const install = (app: App) => {
  components.map(component => component.install(app));
};

export {
  HButton,
  HCardTitle,
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
  HFieldLabel,
  HTreeField,
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
  HVisibilityButton,
};

export * from './lib';

export default {
  install,
};
