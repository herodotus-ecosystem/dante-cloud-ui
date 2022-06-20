<template>
	<q-table :loading="loading" v-bind="$attrs">
		<template v-for="slotName in (Object.keys($slots) as Array<keyof typeof $slots>)" v-slot:[slotName]="props">
			<slot :name="slotName" v-bind="props" />
		</template>

		<template #loading v-if="loading && spinner && !$slots.loading">
			<q-inner-loading showing :color="color" style="z-index: 50">
				<q-spinner-audio v-if="spinner === 'audio'" :size="spinnerSize" :color="color" />
				<q-spinner-bars v-else-if="spinner === 'bars'" :size="spinnerSize" :color="color" />
				<q-spinner-cube v-else-if="spinner === 'cube'" :size="spinnerSize" :color="color" />
				<q-spinner-dots v-else-if="spinner === 'dots'" :size="spinnerSize" :color="color" />
				<q-spinner-facebook v-else-if="spinner === 'facebook'" :size="spinnerSize" :color="color" />
				<q-spinner-gears v-else-if="spinner === 'gears'" :size="spinnerSize" :color="color" />
				<q-spinner-grid v-else-if="spinner === 'grid'" :size="spinnerSize" :color="color" />
				<q-spinner-hourglass v-else-if="spinner === 'hourglass'" :size="spinnerSize" :color="color" />
				<q-spinner-ios v-else-if="spinner === 'ios'" :size="spinnerSize" :color="color" />
				<q-spinner-pie v-else-if="spinner === 'pie'" :size="spinnerSize" :color="color" />
				<q-spinner-oval v-else-if="spinner === 'oval'" :size="spinnerSize" :color="color" />
				<q-spinner-tail v-else :size="spinnerSize" :color="color" />
			</q-inner-loading>
		</template>
	</q-table>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, computed } from 'vue';

import { Spinners } from '/@/lib/declarations';

export default defineComponent({
	name: 'HTable',

	props: {
		loading: { type: Boolean, default: false },
		color: { type: String, default: 'primary' },
		spinner: { type: String as PropType<Spinners>, default: 'bars' },
		spinnerSize: { type: String, default: '60px' },
	},

	setup(props, { slots }) {
		const dynamicSlot = computed(() => (name: string | number) => {
			return name as string;
		});

		return {
			dynamicSlot,
		};
	},
});
</script>
