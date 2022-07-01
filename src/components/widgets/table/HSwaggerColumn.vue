<template>
	<q-btn outline :color="color(method)" class="full-width" :dense="dense" :size="size">
		<div class="row justify-center full-width">
			<div class="col-2">
				<q-chip square :color="color(method)" text-color="white" :dense="dense" :size="size">
					{{ method }}
				</q-chip>
			</div>
			<div class="col-6">
				<div class="column items-start">
					<div class="col"><q-btn flat :label="url" :dense="dense" :size="size" class="text-weight-bold text-lowercase" /></div>
				</div>
			</div>
			<div class="col-4">
				<div class="column items-end">
					<div class="col"><q-btn flat :dense="dense" :size="size" :label="description" /></div>
				</div>
			</div>
		</div>
	</q-btn>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

import type { HttpMethod } from '/@/lib/declarations';

import { useDisplayElement } from '/@/hooks';
import { useSettingsStore } from '/@/stores';

import { HTTP_METHOD_STYLE_GROUP } from '/@/settings';

export default defineComponent({
	name: 'HSwaggerColumn',

	props: {
		method: { type: String as PropType<HttpMethod>, required: true },
		url: { type: String, required: true },
		description: { type: String },
	},

	setup() {
		const { color } = useDisplayElement(HTTP_METHOD_STYLE_GROUP);
		const settings = useSettingsStore();

		const dense = computed(() => {
			return settings.display.table.dense;
		});

		const size = computed(() => {
			return settings.display.table.dense ? 'sm' : 'md';
		});

		return {
			color,
			dense,
			size,
		};
	},
});
</script>
