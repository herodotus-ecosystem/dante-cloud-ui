<template>
  <div class="q-gutter-y-md">
    <h-row gutter="md" gutter-col horizontal>
      <h-summary-box
        color="orange"
        icon="people"
        :numeric="websocketStore.onlineCount"
        description="实时在线用户"
        :percent="0.3"
      ></h-summary-box>
      <h-summary-box
        color="info"
        icon="shopping_cart"
        numeric="900"
        description="Total Orders"
        :percent="0.7"
      ></h-summary-box>
      <h-summary-box
        color="red"
        icon="account_balance_wallet"
        numeric="1050"
        description="Total Expenses"
        :percent="0.4"
      ></h-summary-box>
      <h-summary-box
        color="green"
        icon="account_balance"
        numeric="80 %"
        description="Total Profit"
        :percent="0.8"
      ></h-summary-box>
    </h-row>

    <h-row gutter="md" gutter-col horizontal>
      <h-link-box
        color="positive"
        icon="mdi-cog-play"
        description="服务管理配置中心"
        link="http://localhost:8848/nacos "
      ></h-link-box>
      <h-link-box
        color="accent"
        icon="mdi-compare"
        description="服务流控规则中心"
        link="http://localhost:8858"
      ></h-link-box>
      <h-link-box
        color="primary"
        icon="mdi-chart-line"
        description="服务运行监控中心"
        link="http://localhost:8845"
      ></h-link-box>
      <h-link-box
        color="info"
        icon="mdi-map-search"
        description="日志聚合分析中心"
        link="http://localhost:5601"
      ></h-link-box>
      <h-link-box
        color="negative"
        icon="mdi-source-branch-remove"
        description="链路追踪监控中心"
        link="http://localhost:8878"
      ></h-link-box>
      <h-link-box
        color="warning"
        icon="mdi-monitor-dashboard"
        description="接口开发文档中心"
        link="http://localhost:8847/swagger-ui.html "
      ></h-link-box>
    </h-row>

    <h-row gutter="md" gutter-col horizontal>
      <h-column lg="4" md="4" sm="6" xs="12">
        <h-chart-card title="效能分布">
          <h-pie-chart></h-pie-chart>
        </h-chart-card>
      </h-column>
      <h-column lg="4" md="4" sm="6" xs="12">
        <h-chart-card title="资源使用分析">
          <h-radar-chart></h-radar-chart>
        </h-chart-card>
      </h-column>
      <h-column lg="4" md="4" sm="6" xs="12">
        <h-chart-card title="运行分析">
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

import { useConstantsStore, useWebSocketStore } from '@/stores';

import {
  HBarChart,
  HCategoryChart,
  HPieChart,
  HFunnelChart,
  HRadarChart,
  HRichChart,
  HScatterChart,
  HSankeyChart,
  HSummaryBox,
  HLinkBox,
} from '../charts';

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
    HSummaryBox,
    HLinkBox,
  },

  setup() {
    const constantsStore = useConstantsStore();
    const websocketStore = useWebSocketStore();

    onMounted(() => {
      constantsStore.init();
    });

    return {
      websocketStore,
    };
  },
});
</script>
