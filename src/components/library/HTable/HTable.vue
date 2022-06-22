<template>
	<q-table :loading="loading" v-bind="$attrs">
		<template v-for="slotName in Object.keys($slots)" v-slot:[slotName]="props">
			<slot :name="slotName" v-bind="props" />
		</template>

		<template #loading v-if="loading && !$slots.loading">
			<h-loading type="DOTS" size="100px"></h-loading>
		</template>
	</q-table>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, computed } from 'vue';

import { Spinners } from '/@/lib/declarations';
import { HLoading } from '../HLoading';

export default defineComponent({
	name: 'HTable',

	components: {
		HLoading,
	},

	props: {
		loading: { type: Boolean, default: false },
	},
});
</script>
