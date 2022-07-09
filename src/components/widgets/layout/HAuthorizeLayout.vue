<template>
	<h-detail-container :title="title" :overlay="overlay">
		<h-container mode="two" :offset="3" wider="start">
			<slot></slot>

			<template #right>
				<slot name="right"></slot>
			</template>
		</h-container>
	</h-detail-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HDetailContainer from './HDetailContainer.vue';
import { HContainer } from '../../library';

export default defineComponent({
	name: 'HAuthorizeLayout',

	components: {
		HContainer,
		HDetailContainer,
	},

	props: {
		overlay: { type: Boolean, default: false },
		title: { type: String, default: '' },
	},
});
</script>
