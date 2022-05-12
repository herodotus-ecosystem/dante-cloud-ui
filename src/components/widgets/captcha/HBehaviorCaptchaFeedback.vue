<template>
	<div>
		<div :class="['loading-box', { hide_: !loading }]">
			<div class="loading-gif">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
		<div :class="['message-box', { show: showMessage }, { fail: !success }]">
			{{ message }}
		</div>
		<div
			:class="['flash', { show: success }]"
			:style="`transform: translateX(${success ? `${width + height * 0.578}px` : `-${height * 0.578}px`}) skew(-30deg, 0);`"
		></div>
		<img class="reset" @click="onReset()" src="../../../static/images/captcha/reset.png" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'HBehaviorCaptchaFeedback',

	emits: ['reset'],

	props: {
		// 主canvas的宽
		width: {
			type: Number,
			default: 310,
		},
		// 主canvas的高
		height: {
			type: Number,
			default: 155,
		},
		// 是否成功
		success: {
			type: Boolean,
			default: false,
		},
		// 是否显示加载
		loading: {
			type: Boolean,
			default: false,
		},
		// 是否显示信息
		showMessage: {
			type: Boolean,
			default: false,
		},
		// 滑块区域提示信息
		message: {
			type: String,
			default: '',
		},
	},

	setup(props, context) {
		const onReset = () => {
			context.emit('reset');
		};

		return {
			onReset,
		};
	},
});
</script>

<style lang="scss">
.loading-box {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.8);
	z-index: 20;
	opacity: 1;
	transition: opacity 200ms;
	display: flex;
	align-items: center;
	justify-content: center;
	&.hide_ {
		opacity: 0;
		pointer-events: none;
		.loading-gif {
			span {
				animation-play-state: paused;
			}
		}
	}
	.loading-gif {
		flex: none;
		height: 5px;
		line-height: 0;
		@keyframes load {
			0% {
				opacity: 1;
				transform: scale(1.3);
			}
			100% {
				opacity: 0.2;
				transform: scale(0.3);
			}
		}
		span {
			display: inline-block;
			width: 5px;
			height: 100%;
			margin-left: 2px;
			border-radius: 50%;
			background-color: #888;
			animation: load 1.04s ease infinite;
			&:nth-child(1) {
				margin-left: 0;
			}
			&:nth-child(2) {
				animation-delay: 0.13s;
			}
			&:nth-child(3) {
				animation-delay: 0.26s;
			}
			&:nth-child(4) {
				animation-delay: 0.39s;
			}
			&:nth-child(5) {
				animation-delay: 0.52s;
			}
		}
	}
}
.message-box {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 24px;
	line-height: 24px;
	text-align: center;
	overflow: hidden;
	font-size: 13px;
	background-color: #83ce3f;
	opacity: 0;
	transform: translateY(24px);
	transition: all 200ms;
	color: #fff;
	z-index: 30;
	&.show {
		opacity: 0.95;
		transform: translateY(0);
	}
	&.fail {
		background-color: #ce594b;
	}
}
.flash {
	position: absolute;
	top: 0;
	left: 0;
	width: 30px;
	height: 100%;
	background-color: rgba(255, 255, 255, 0.1);
	z-index: 3;
	&.show {
		transition: transform 600ms;
	}
}
.reset {
	position: absolute;
	top: 2px;
	right: 2px;
	width: 35px;
	height: auto;
	z-index: 12;
	cursor: pointer;
	transition: transform 200ms;
	transform: rotate(0deg);
	&:hover {
		transform: rotate(-90deg);
	}
}
</style>
