<template>
	<h-chart-container :options="options"></h-chart-container>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import * as echarts from 'echarts';

import HChartContainer from './HChartContainer.vue';

export default defineComponent({
	name: 'HGaugeChart',

	components: {
		HChartContainer,
	},

	setup() {
		const options = ref<echarts.EChartsOption>({
			tooltip: {
				formatter: '{a} <br/>{b} : {c}%',
			},
			toolbox: {
				feature: {
					restore: {},
					saveAsImage: {},
				},
			},
			series: [
				{
					name: '业务指标',
					type: 'gauge',
					detail: { formatter: '{value}%' },
					data: [{ value: 50, name: '完成率' }],
				},
			],
		}) as Ref<echarts.EChartsOption>;

		return {
			options,
		};
	},
});
</script>
