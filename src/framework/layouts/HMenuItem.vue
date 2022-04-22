<template>
	<v-list-item :title="(item.meta?.title as string)" :value="(item.meta?.title as string)" :prepend-icon="(item.meta?.icon as string)"></v-list-item>
</template>
<script lang="ts">
import type { RouteRecordRaw } from 'vue-router';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
	name: 'HMenuItem',
	props: {
		item: {
			type: Object as PropType<RouteRecordRaw>,
			default: () => {},
			require: true,
		},
	},
});
</script>
