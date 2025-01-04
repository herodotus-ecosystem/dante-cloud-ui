<template>
	<q-btn v-bind="$attrs">
		<template v-if="tooltip" #default>
			<q-tooltip v-if="tooltip">{{ tooltip }}</q-tooltip>
		</template>

		<template #loading>
			<slot name="loading"></slot>
		</template>
	</q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'HButton',

	props: {
		tooltip: { type: String, default: '' },
	},
});
</script>
