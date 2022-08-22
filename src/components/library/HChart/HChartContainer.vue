<template>
	<div ref="chartRef" :style="{ height: height, width: width }"></div>
</template>

<script lang="ts">
import * as echarts from 'echarts';
import 'echarts/theme/macarons';

import { defineComponent, PropType, ref, Ref, onMounted, watch } from 'vue';

export default defineComponent({
	name: 'HChartContainer',

	props: {
    loading: { type: Boolean, default:true },
		options: { type: Object as PropType<echarts.EChartsOption>, required: true },
		width: { type: String, default: '100%' },
		height: { type: String, default: '300px' },
	},

	setup(props) {
		const chartRef = ref<HTMLElement>() as Ref<HTMLElement>;
    // const chart = ref<echarts.ECharts>() as Ref<echarts.ECharts>;
		let chart = null;


		const setOptions = (options: echarts.EChartsOption) => {
			 chart.setOption(options);
		};
		onMounted(() => {
			// chart.value = echarts.init(chartRef.value as HTMLElement);
      // chart.value.setOption(props.options);
      chart = echarts.init(chartRef.value as HTMLElement);
      chart.setOption(props.options);
		});

    watch(
      () => props.loading,
      (newValue) => {
        if(newValue)
          chart.showLoading();
        else
          chart.hideLoading();
      }
    );
		watch(
			() => props.options,
			(newValue) => {
				setOptions(newValue);
			},
			{
				deep: true,
			}
		);

		return {
			chartRef,
			chart,
		};
	},
});
</script>
