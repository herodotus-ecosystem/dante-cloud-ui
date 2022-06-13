<template>
	<q-btn outline :color="color(method)" class="full-width">
		<div class="row justify-center full-width">
			<div class="col-2">
				<q-chip square :color="color(method)" text-color="white">
					{{ method }}
				</q-chip>
			</div>
			<div class="col-6">
				<div class="column items-start">
					<div class="col"><q-btn flat :label="url" class="text-weight-bold" /></div>
				</div>
			</div>
			<div class="col-4">
				<div class="column items-end">
					<div class="col"><q-btn flat :label="description" class="text-lowercase" /></div>
				</div>
			</div>
		</div>
	</q-btn>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import type { HttpMethod } from '/@/lib/declarations';

import { useHttpMethodStyle } from '/@/hooks';

import {} from '/@/settings';

export default defineComponent({
	name: 'HSwaggerItem',

	props: {
		method: { type: String as PropType<HttpMethod>, required: true },
		url: { type: String, required: true },
		description: { type: String },
	},

	setup() {
		const { color } = useHttpMethodStyle();

		return {
			color,
		};
	},
});
</script>
