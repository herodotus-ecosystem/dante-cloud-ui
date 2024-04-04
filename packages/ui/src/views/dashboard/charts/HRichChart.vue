<template>
  <h-chart-container :options="options"></h-chart-container>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import type { EChartsOption, EChartsCoreOption } from 'echarts';

import HChartContainer from './HChartContainer.vue';

export default defineComponent({
  name: 'HRichChart',

  components: {
    HChartContainer
  },

  setup() {
    const options = ref<EChartsCoreOption>({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['Web', 'Java客户端', 'Node客户端', 'Python', 'IOS', 'Android', 'Kafka', 'Mqtt', 'Redis', '其他']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          selectedMode: 'single',
          radius: [0, '30%'],

          label: {
            position: 'inner'
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 335, name: 'Web', selected: true },
            { value: 679, name: 'Java客户端' },
            { value: 1548, name: 'Node客户端' }
          ]
        },
        {
          name: '访问来源',
          type: 'pie',
          radius: ['40%', '55%'],
          label: {
            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
            backgroundColor: '#eee',
            borderColor: '#aaa',
            borderWidth: 1,
            borderRadius: 4,
            shadowBlur: 3,
            shadowOffsetX: 2,
            shadowOffsetY: 2,
            shadowColor: '#999',
            padding: [0, 7],
            rich: {
              a: {
                color: '#999',
                lineHeight: 22,
                align: 'center'
              },
              abg: {
                backgroundColor: '#333',
                width: '100%',
                align: 'right',
                height: 22,
                borderRadius: [4, 4, 0, 0]
              },
              hr: {
                borderColor: '#aaa',
                width: '100%',
                borderWidth: 0.5,
                height: 0
              },
              b: {
                fontSize: 16,
                lineHeight: 33
              },
              per: {
                color: '#eee',
                backgroundColor: '#334455',
                padding: [2, 4],
                borderRadius: 2
              }
            }
          },
          data: [
            { value: 335, name: 'Web' },
            { value: 310, name: 'Python' },
            { value: 234, name: 'IOS' },
            { value: 135, name: 'Android' },
            { value: 1048, name: 'Kafka' },
            { value: 251, name: 'Mqtt' },
            { value: 147, name: 'Redis' },
            { value: 102, name: '其他' }
          ]
        }
      ]
    }) as Ref<EChartsOption>;

    return {
      options
    };
  }
});
</script>
