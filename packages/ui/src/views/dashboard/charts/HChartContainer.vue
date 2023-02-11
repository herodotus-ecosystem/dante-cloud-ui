<template>
  <div ref="chartRef" :style="{ height: height, width: width }"></div>
</template>

<script lang="ts">
import type { EChartsOption, EChartsCoreOption } from '/@/lib/declarations';

import { defineComponent, PropType, ref, Ref, onMounted, watch } from 'vue';
import elementResize from 'element-resize-detector';
import { echartsInjectionKey } from '/@/lib/symbol';

export default defineComponent({
  name: 'HChartContainer',

  props: {
    options: { type: Object as PropType<EChartsOption | EChartsCoreOption>, required: true },
    width: { type: String, default: '100%' },
    height: { type: String, default: '300px' }
  },

  setup(props) {
    const echarts = inject<any>(echartsInjectionKey);
    const chartRef = ref<HTMLElement>() as Ref<HTMLElement>;
    const chart = ref<echarts.ECharts>() as Ref<echarts.ECharts>;

    const setOptions = (options: EChartsOption | EChartsCoreOption) => {
      chart.value.setOption(options);
    };

    onMounted(() => {
      chart.value = echarts.init(chartRef.value as HTMLElement);
      chart.value.setOption(props.options);

      // 初始化element-resize-detector组件
      const resizer = elementResize({
        strategy: 'scroll', // <- 推荐监听滚动，提升性能
        callOnAdd: true // 添加侦听器时是否应调用,默认true
      });

      resizer.listenTo(chartRef.value, () => {
        chart.value.setOption(props.options);
        chart.value.resize();
      });
    });

    watch(
      () => props.options,
      newValue => {
        setOptions(newValue);
      },
      {
        deep: true
      }
    );

    return {
      chartRef,
      chart
    };
  }
});
</script>
