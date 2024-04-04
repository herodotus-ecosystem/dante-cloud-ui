<template>
  <h-chart-container :options="options"></h-chart-container>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import type { EChartsOption, EChartsCoreOption } from 'echarts';

import HChartContainer from './HChartContainer.vue';

export default defineComponent({
  name: 'HPieChart',

  components: {
    HChartContainer
  },

  setup() {
    const options = ref<EChartsOption>({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        left: 'center',
        bottom: '10',
        data: ['高效', '正常', '略有延迟', '服务降级', '服务熔断']
      },
      calculable: true,
      series: [
        {
          name: 'WEEKLY WRITE ARTICLES',
          type: 'pie',
          roseType: 'radius',
          radius: [15, 95],
          center: ['50%', '38%'],
          data: [
            { value: 320, name: '高效' },
            { value: 240, name: '正常' },
            { value: 149, name: '略有延迟' },
            { value: 100, name: '服务降级' },
            { value: 59, name: '服务熔断' }
          ],
          animationEasing: 'cubicInOut',
          animationDuration: 2600
        }
      ]
    }) as Ref<EChartsOption>;

    return {
      options
    };
  }
});
</script>
