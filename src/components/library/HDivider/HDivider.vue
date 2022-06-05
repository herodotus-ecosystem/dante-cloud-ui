<template>
	<h-container column="three" :offset="2" :modeForThree="justify">
		<template #left> <q-separator /> </template>
		<h-label :text="label" :weight="weight"></h-label>
		<template #right>
			<q-separator />
		</template>
	</h-container>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

import { HContainer } from '../HContainer';
import { HLabel } from '../HLabel';

export default defineComponent({
	name: 'HDivider',

	components: {
		HContainer,
		HLabel,
	},

	props: {
		justify: { type: String as PropType<'start' | 'center' | 'end'>, default: 'center' },
		weight: { type: String as PropType<'thin' | 'light' | 'regular' | 'medium' | 'bold' | 'bolder'>, default: 'medium' },
		label: String,
	},

	setup(props) {
		const textWeight = computed(() => {
			return 'text-center text-weight-' + props.weight;
		});

		return {
			textWeight,
		};
	},
});
</script>
