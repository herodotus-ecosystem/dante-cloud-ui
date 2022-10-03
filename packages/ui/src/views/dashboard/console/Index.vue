<template>
  <div class="q-gutter-y-md">
    <h-row gutter="md" gutter-col horizontal>
      <h-summary-box
        color="info"
        icon="shopping_cart"
        numeric="900"
        description="Total Orders"
        :percent="0.7"></h-summary-box>
      <h-summary-box
        color="red"
        icon="account_balance_wallet"
        numeric="1050"
        description="Total Expenses"
        :percent="0.4"></h-summary-box>
      <h-summary-box
        color="green"
        icon="account_balance"
        numeric="80 %"
        description="Total Profit"
        :percent="0.8"></h-summary-box>
      <h-summary-box
        color="orange"
        icon="people"
        numeric="720"
        description="New Customers"
        :percent="0.3"></h-summary-box>
    </h-row>

    <h-row gutter="md" gutter-col horizontal>
      <h-column lg="4" md="4" sm="6" xs="12">
        <h-chart-card title="Pie">
          <h-pie-chart></h-pie-chart>
        </h-chart-card>
      </h-column>
      <h-column lg="4" md="4" sm="6" xs="12">
        <h-chart-card title="Radar">
          <h-radar-chart></h-radar-chart>
        </h-chart-card>
      </h-column>
      <h-column lg="4" md="4" sm="6" xs="12">
        <h-chart-card title="Bar">
          <h-bar-chart></h-bar-chart>
        </h-chart-card>
      </h-column>
    </h-row>

    <h-row gutter="md" gutter-col horizontal>
      <h-column lg="8" md="8" sm="12" xs="12">
        <h-chart-card title="Scatter"><h-scatter-chart></h-scatter-chart></h-chart-card>
      </h-column>
      <h-column lg="4" md="4" sm="12" xs="12">
        <h-chart-card title="Sankey"><h-sankey-chart></h-sankey-chart></h-chart-card>
      </h-column>
    </h-row>

    <h-row gutter="md" gutter-col horizontal>
      <h-column lg="7" md="7" sm="6" xs="12">
        <h-chart-card title="Rich"><h-rich-chart></h-rich-chart></h-chart-card>
      </h-column>
      <h-column lg="5" md="5" sm="6" xs="12">
        <h-chart-card title="Funnel"><h-funnel-chart></h-funnel-chart></h-chart-card>
      </h-column>
    </h-row>

    <h-row gutter="md" gutter-col horizontal>
      <h-column>
        <h-chart-card title="Categroy"><h-category-chart></h-category-chart></h-chart-card>
      </h-column>
    </h-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import { useConstantsStore } from '/@/stores';

import {
  HBarChart,
  HCategoryChart,
  HPieChart,
  HFunnelChart,
  HRadarChart,
  HRichChart,
  HScatterChart,
  HSankeyChart,
  HSummaryBox
} from '/@/components';

export default defineComponent({
  name: 'DashboardConsole',

  components: {
    HBarChart,
    HCategoryChart,
    HFunnelChart,
    HPieChart,
    HRadarChart,
    HRichChart,
    HScatterChart,
    HSankeyChart,
    HSummaryBox
  },

  setup() {
    const constants = useConstantsStore();

    onMounted(() => {
      constants.init();
    });
  }
});
</script>
