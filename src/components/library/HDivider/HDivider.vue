<template>
	<h-container column="three" :offset="offset" :wider="wider" align="center">
		<template #left> <q-separator /> </template>
		<h-label :text="label" :weight="weight"></h-label>
		<template #right>
			<q-separator />
		</template>
	</h-container>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue';

import { HContainer } from '../HContainer';
import { HLabel } from '../HLabel';

export default defineComponent({
	name: 'HDivider',

	components: {
		HContainer,
		HLabel,
	},

	props: {
		wider: { type: String as PropType<'start' | 'center' | 'end'>, default: 'center' },
		weight: { type: String as PropType<'thin' | 'light' | 'regular' | 'medium' | 'bold' | 'bolder'>, default: 'medium' },
		offset: { type: Number, default: 0 },
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
