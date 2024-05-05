<template>
	<div class="canvas-background" :style="`height: ${canvasHeight}px`">
		<img :src="backgroundImage" :width="canvasWidth" :height="canvasHeight" :style="`width: ${canvasWidth}px; height: ${canvasHeight}px`" />
		<slot></slot>

		<h-behavior-captcha-feedback
			:canvas-width="canvasWidth"
			:canvas-height="canvasHeight"
			:loading="loading"
			:success="success"
			:show-message="showMessage"
			:message="message"
		></h-behavior-captcha-feedback>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import HBehaviorCaptchaFeedback from './HBehaviorCaptchaFeedback.vue';

export default defineComponent({
	name: 'HBehaviorCaptchaBackground',

	components: {
		HBehaviorCaptchaFeedback,
	},

	props: {
		backgroundImage: { type: String, required: true },
		canvasWidth: { type: Number, required: true },
		canvasHeight: { type: Number, required: true },
		// 是否显示加载
		loading: { type: Boolean, default: false },
		// 是否成功
		success: { type: Boolean, default: false },
		// 是否显示信息
		showMessage: { type: Boolean, default: false },
		// 滑块区域提示信息
		message: { type: String, default: '' },
	},
});
</script>

<style lang="scss">
.canvas-background {
	position: relative;
	overflow: hidden;
	border-radius: 3px;
}
</style>
