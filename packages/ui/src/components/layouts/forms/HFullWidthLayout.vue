<template>
	<h-detail-container :title="title" :overlay="overlay">
		<div class="q-gutter-y-md">
			<slot></slot>
			<q-separator class=""></q-separator>
			<q-btn color="red" @click="onFinish()">取消</q-btn>
			<slot name="button"></slot>
		</div>
	</h-detail-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useEditFinish } from '/@/hooks';

import HDetailContainer from './HDetailContainer.vue';

export default defineComponent({
	name: 'HFullWidthLayout',

	components: {
		HDetailContainer,
	},

	props: {
		overlay: { type: Boolean, default: false },
		title: { type: String, default: '' },
	},

	setup(props) {
		const { onFinish } = useEditFinish();

		return {
			onFinish,
		};
	},
});
</script>
