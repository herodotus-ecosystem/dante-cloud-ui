<template>
	<q-chip v-if="status" color="red" text-color="white"><q-tooltip>不允许删除的数据</q-tooltip>保留数据</q-chip>
	<q-chip v-else color="green" text-color="white"><q-tooltip>可以删除的数据</q-tooltip>非保留数据</q-chip>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'HTableItemChip',

	props: {
		status: { type: Boolean, default: false },
	},
});
</script>
