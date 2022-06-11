<template>
	<q-toolbar>
		<h-button flat round dense color="red" icon="mdi-arrow-left-box" tooltip="返回" @click="onFinish()"> </h-button>
		<q-toolbar-title>
			{{ title }}
		</q-toolbar-title>
	</q-toolbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useEditFinish } from '/@/hooks';

import { HButton } from '../../library';

export default defineComponent({
	name: 'HDetailHeader',

	components: {
		HButton,
	},

	props: {
		title: { type: String },
	},

	setup(props) {
		const { onFinish } = useEditFinish();

		return {
			onFinish,
		};
	},
});
</script>
