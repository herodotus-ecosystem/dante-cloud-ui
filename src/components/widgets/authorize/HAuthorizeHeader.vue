<template>
	<q-toolbar class="bg-black text-white">
		<q-toolbar-title> 已配置 </q-toolbar-title>
		<q-btn flat round dense>
			<q-icon name="more_vert" />
		</q-btn>
		<q-btn flat round dense>
			<q-icon name="menu" />
		</q-btn>
		<h-button flat round icon="mdi-content-save-cog" tooltip="保存" @click="onSave()"></h-button>
		<h-button flat round icon="mdi-delete-empty" tooltip="清空" @click="onClear()"></h-button>
	</q-toolbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HButton } from '../../library';

export default defineComponent({
	name: 'HAuthorizeHeader',

	components: {
		HButton,
	},

	emits: ['save', 'clear'],

	setup(props, { emit }) {
		const onSave = () => {
			emit('save');
		};

		const onClear = () => {
			emit('clear');
		};

		return {
			onSave,
			onClear,
		};
	},
});
</script>
