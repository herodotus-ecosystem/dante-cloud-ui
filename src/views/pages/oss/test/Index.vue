<template>
	<div>
		<h-renderer-engine :element="element"></h-renderer-engine>
		<q-icon name="today" class="text-orange" size="2em" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { HRendererEngine } from '/@/components';

export default {
	name: 'OssTest',

	components: {
		HRendererEngine,
	},

	setup(props) {
		const element = {
			name: 'q-icon',
			attrs: {
				name: 'warning',
				color: 'warning',
				size: '4rem',
			},
		};

		return { element };
	},
};
</script>
