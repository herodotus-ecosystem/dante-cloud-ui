<template>
	<div class="control-body">
		<div class="control-box" :style="`height:${size}px`">
			<div class="control-text">{{ tips }}</div>
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
	name: 'HBehaviorCaptchaControl',

	props: {
		size: { type: Number, default: 30 },
		description: { type: String, required: true },
		prompt: { type: String, default: '' },
	},

	setup(props) {
		const tips = computed(() => {
			return props.prompt ? props.description + '【' + props.prompt + '】' : props.description;
		});

		return {
			tips,
		};
	},
});
</script>

<style lang="scss">
.control-body {
	.control-box {
		position: relative;
		width: 100%;
		background-color: #eef1f8;
		margin-top: 20px;
		border-radius: 3px;
		box-shadow: 0 0 8px rgba(240, 240, 240, 0.6) inset;
		.control-text {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			font-size: 14px;
			color: #b7bcd1;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			text-align: center;
			width: 100%;
		}
	}
}
</style>
