<template>
  <h-chart-container :options="options"></h-chart-container>
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { defineComponent, ref } from 'vue';
import type { EChartsOption } from 'echarts';

import HChartContainer from './HChartContainer.vue';

export default defineComponent({
  name: 'HBarChart',

  components: {
    HChartContainer,
  },

  setup() {
    const options = ref<EChartsOption>({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        top: 10,
        left: '2%',
        right: '2%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: ['周六', '周日', '周一', '周二', '周三', '周四', '周五'],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisTick: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: 'pageA',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [79, 52, 200, 334, 390, 330, 220],
          animationDuration: 500,
        },
        {
          name: 'pageB',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [80, 52, 200, 334, 390, 330, 220],
          animationDuration: 500,
        },
        {
          name: 'pageC',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [30, 52, 200, 334, 390, 330, 220],
          animationDuration: 500,
        },
      ],
    }) as Ref<EChartsOption>;

    return {
      options,
    };
  },
});
</script>
