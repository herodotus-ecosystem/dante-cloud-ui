<template>
  <h-chart-container :options="options"></h-chart-container>
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { defineComponent, ref } from 'vue';
import * as echarts from 'echarts';

import HChartContainer from './HChartContainer.vue';

export default defineComponent({
  name: 'HScatterChart',

  components: {
    HChartContainer,
  },

  setup() {
    const data = [
      [
        [28604, 77, 17096869, 'UAA', 2023],
        [31163, 77.4, 27662440, 'Gateway', 2023],
        [1516, 68, 1154605773, 'UPMS', 2023],
        [13670, 74.7, 10582082, 'BPMN', 2023],
        [28599, 75, 4986705, 'CMDB', 2023],
        [29476, 77.1, 56943299, 'External', 2023],
        [31476, 75.4, 78958237, 'OSS', 2023],
        [28666, 78.1, 254830, 'SMS', 2023],
        [1777, 57.7, 870601776, 'UAA', 2023],
        [29550, 79.1, 122249285, 'Gateway', 2023],
        [2076, 67.9, 20194354, 'UPMS', 2023],
        [12087, 72, 42972254, 'MSG', 2023],
        [24021, 75.4, 3397534, 'OSS', 2023],
        [43296, 76.8, 4240375, 'SMS', 2023],
        [10088, 70.8, 38195258, 'BPMN', 2023],
        [19349, 69.6, 147568552, 'CMDB', 2023],
        [10670, 67.3, 53994605, 'External', 2023],
        [26424, 75.7, 57110117, 'UAA', 2023],
        [37062, 75.4, 252847810, 'MEG', 2023],
      ],
      [
        [44056, 81.8, 23968973, 'UAA', 2024],
        [43294, 81.7, 35939927, 'Gateway', 2024],
        [13334, 76.9, 1376048943, 'UPMS', 2024],
        [21291, 78.5, 11389562, 'BPMN', 2024],
        [38923, 80.8, 5503457, 'CMDB', 2024],
        [37599, 81.9, 64395345, 'External', 2024],
        [44053, 81.1, 80688545, 'OSS', 2024],
        [42182, 82.8, 329425, 'SMS', 2024],
        [5903, 66.8, 1311050527, 'UAA', 2024],
        [36162, 83.5, 126573481, 'Gateway', 2024],
        [1390, 71.4, 25155317, 'UPMS', 2024],
        [34644, 80.7, 50293439, 'MSG', 2024],
        [34186, 80.6, 4528526, 'OSS', 2024],
        [64304, 81.6, 5210967, 'SMS', 2024],
        [24787, 77.3, 38611794, 'BPMN', 2024],
        [23038, 73.13, 143456918, 'CMDB', 2024],
        [19360, 76.5, 78665830, 'External', 2024],
        [38225, 81.4, 64715810, 'UAA', 2024],
        [53354, 79.1, 321773631, 'MEG', 2024],
      ],
    ];

    const options = ref<echarts.EChartsCoreOption>({
      title: {
        text: '资源使用趋势',
      },
      legend: {
        right: 10,
        data: ['2023', '2024'],
      },
      xAxis: {
        splitLine: {
          lineStyle: {
            type: 'dashed',
          },
        },
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            type: 'dashed',
          },
        },
        scale: true,
      },
      series: [
        {
          name: '2023',
          data: data[0],
          type: 'scatter',
          symbolSize: (data: any) => Math.sqrt(data[2]) / 5e2,

          emphasis: {
            label: {
              show: true,
              formatter: (param: any) => param.data[3],
              position: 'top',
            },
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(120, 36, 50, 0.5)',
            shadowOffsetY: 5,
            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
              {
                offset: 0,
                color: 'rgb(251, 118, 123)',
              },
              {
                offset: 1,
                color: 'rgb(204, 46, 72)',
              },
            ]),
          },
        },
        {
          name: '2024',
          data: data[1],
          type: 'scatter',
          symbolSize: (data: any) => Math.sqrt(data[2]) / 5e2,
          emphasis: {
            label: {
              show: true,
              formatter: (param: any) => param.data[3],
              position: 'top',
            },
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(25, 100, 150, 0.5)',
            shadowOffsetY: 5,
            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
              {
                offset: 0,
                color: 'rgb(129, 227, 238)',
              },
              {
                offset: 1,
                color: 'rgb(25, 183, 207)',
              },
            ]),
          },
        },
      ],
    }) as Ref<echarts.EChartsOption>;

    return {
      options,
    };
  },
});
</script>
