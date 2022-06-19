<template>
	<q-card>
		<q-toolbar>
			<h-button flat round dense color="red" icon="mdi-arrow-left-box" tooltip="返回" @click="onFinish()"> </h-button>
			<q-toolbar-title>
				{{ title }}
			</q-toolbar-title>
		</q-toolbar>

		<q-separator></q-separator>

		<q-card-section>
			<slot></slot>
		</q-card-section>
	</q-card>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { useQuasar } from 'quasar';

import { useEditFinish } from '/@/hooks';

import { HButton } from '../../library';

export default defineComponent({
	name: 'HDetailContainer',

	components: {
		HButton,
	},

	props: {
		title: { type: String },
		overlay: { type: Boolean, default: false },
	},

	setup(props) {
		const { onFinish } = useEditFinish();
		const $q = useQuasar();

		watch(
			() => props.overlay,
			(newValue: boolean) => {
				if (newValue) {
					$q.loading.show();
				} else {
					$q.loading.hide();
				}
			},
			{
				immediate: true,
			}
		);

		return {
			onFinish,
		};
	},
});
</script>
