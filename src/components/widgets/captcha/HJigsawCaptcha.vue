<template>
	<div>
		<div class="captcha-body" :style="`height: ${canvasHeight}px`">
			<!-- 主图，有缺口 -->
			<img :src="backgroundImage" :width="canvasWidth" :height="canvasHeight" :style="`width:${canvasWidth}px;height:${canvasHeight}px`" />
			<!-- 小图 -->
			<img class="jigsaw-slider" :src="jigsawImage" :height="canvasHeight" :style="`transform:translateX(${styleWidth - sliderSize}px)`" />
			<h-behavior-captcha-feedback
				:width="canvasWidth"
				:height="canvasHeight"
				:loading="isLoading"
				:success="isSuccess"
				:show-message="isShowMessage"
				:message="message"
				@reset="onReset()"
			></h-behavior-captcha-feedback>
		</div>
		<div class="slider-control">
			<div class="range-box" :style="`height:${sliderSize}px`">
				<div class="range-text">{{ sliderTips }}</div>
				<div class="range-slider" ref="RangeSlider" :style="`width:${styleWidth}px`">
					<div
						:class="['range-btn', { isDown: isMouseDown }]"
						:style="`width:${sliderSize}px`"
						@mousedown="onRangeMouseDown($event)"
						@touchstart="onRangeMouseDown($event)"
					>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onMounted, onBeforeMount, watch, PropType, computed } from 'vue';

import { JigsawCaptcha } from '/@/lib/declarations';
import { useOpenApi } from '/@/apis';

import HBehaviorCaptchaFeedback from './HBehaviorCaptchaFeedback.vue';

export default defineComponent({
	name: 'HJigsawCaptcha',

	components: {
		HBehaviorCaptchaFeedback,
	},

	props: {
		schema: { type: Object as PropType<JigsawCaptcha>, default: () => {} },
		loading: { type: Boolean, default: false },
		canOperate: { type: Boolean, default: false },
		canvasWidth: { type: Number, default: 310 },
		canvasHeight: { type: Number, default: 155 },
		sliderSize: { type: Number, default: 30 },
		successText: { type: String, default: '验证通过!' },
		failedText: { type: String, default: '验证失败，请重试!' },
		identity: { type: String, default: '', required: true },
		captchaType: { type: String, default: '', required: true },
	},

	setup(props, { emit }) {
		const RangeSlider = ref<HTMLDivElement | null>(null);

		const state = reactive({
			// 后台生成的背景图Base64
			backgroundImageBase64: '',
			// 后台生成的拼图滑块Base64
			jigsawImageBase64: '',
			// 验证成功
			isSuccess: false,
			// 是否正在加在中，主要是等图片onload
			isLoading: false,
			// 提示信息是否出现
			isShowMessage: false,
			// 提示等信息
			message: '',
			// 是否可以拉动滑动条
			canAction: false,
			// 鼠标点下去时父级的width
			startWidth: 50,
			// 鼠标按下时的X
			startX: 0,
			// 鼠标当前的偏移X
			newX: 0,
			// 鼠标是否在按钮上按下
			isMouseDown: false,
			// 为了解决Mac上的click BUG
			isCloseDown: false,
			// setTimout
			timer: null as NodeJS.Timeout | null,
			sliderTips: '拖动滑块完成拼图',

			defautImage:
				'iVBORw0KGgoAAAANSUhEUgAAAQQAAACgCAIAAABlkIURAAAFQ0lEQVR42u3dsXLbMAyA4b7/e2XNmLFj1o4ZXV1wh+JAiZZdt5bt7x9yiRPRiYPfBEiR/PEF4JsfXgKADAAZADIAZADIAJABIANABoAMABkAMgBkAMgAkAEgA0AGgAwAGQAyAGQAyACQASADQAaADAAZADIAZADIAJABIANABoAMABkAMgBkAEAGgAwAGQAyAGQAyACQASADQAaADAAZADIAZDgcP7fx4pDhtfj4+HhfY3nci0MGMpCBDC/Dr8JEhl//C/8RMtyHz8/P94OhPiHDsfKiOyIlIwMZyECGY8iw5EtLvk4GMpDhfTHhdDodoaMgAxnuKcPSLYxZ03wEaSlzyUCGJ5Th9E2TYQn30zZ7cqqltZi9XmRbPu7sdshAhgeTYT4mu1y7NWNwdjCXDGR4kp4hkqsI+tYVREcRzzvJsshAhsPJsHz+uc1qNEccT2ayc+Rq0reQgQyHk+G6wrf1GB+FlkctzzgxCmR4YBlilKl1LEub2XgbgwofxmckAxkeW4YW2VEb1BpjtXpu/pCBDM8gwxLTGegRzdlmraTHknp8UjKQ4YFlaDEd9XGMOJ1tcBxZIgMZHliGSIri2uwW9pgQ5rTciQxkeHgZJmNK82vJQIanlWH/nRc5V00GMjyhDBfx9vY23jpOBjI8TwF99TAUGcjw8DKsDgrtt8hoEhmeSoaYbL7JVWQgwyFk+Msbky7qHLYuIQMZHluGyb1Gk8xqdQSWDGR47DSpzj3vaSTWPLiFmwxPK0Ndq7DVVK7vsZUlGY4ow9f3DRRfN9pGKaM5hk1zH+/cdmC+8pMMZLinDLFW87ZbxdToTzf2TE6TgQz3lOGidN++SWR4chnGlZlkIMOLymCvVTK8OjHscyhapQEyAGQAyACQASADQAaADAAZ/i9XnLgc+xfVFsabi9rPTw5hmFwytnD2+Oe4z8+/lQzXsHPF2XhJBmUsu5mEYNx5ulOGiOaY7c47WKOFnPWbXD7+tiDDBTLkiWwRbbEjS5J3bt9QhsnZ5hMZcu/h1i9V6i7Fe3oSkGE9r8gQzHNGMvSvk2F1rWY8mIe41Wvb+Sbtyzzxrcqwc48Z/2gy7JUhe4AaoxGOWzLsCb66LCE/afLUz/fvElBlqOcG1V1Zcw0dGchwQZoUH/Put3rK7ZYMqc1IC75sIbOdLRlqWtVyoYzp1ni7vKnSOjGQYW+aVNdYtnfrSZp0lqx6o/0WwS1N2lotXXfhbuUHGchwy56hLtypRxLmt0YZWp09KVUzXtOrLRny9Kq6GDq3D1sdTWpHsrcCWppEhot7hiTr1BhcWq0Zzu579zcyZIaWOVvKUJM3BTQZ/m2aVAdYJ2nS6lm32V2sDii18mNSM8y3Zx0nGRTQZLi9DDU1qsOXTYYIuHEgdax6x6w9k5x5AV3zt8y+sv2Wj7UvW80w/nC0MHmkza+T4UV7hgyOHAwdZVjNVSYy1Cy/ns+wNc+wukNMHeCKrmbrz5nPQI/dS/1LawX/ap0JGf68AY/DoxHEGZo1VlZviFiVIR/MdlY3024yRL9Ua4acA8lf6ToZxm6tuZ0TgnoGMvxctSLDKwrc1XfNLRnqBtpjFzFPk2rX1EqC62T4GqYpxkdes8Agw0pWfcUP/KMwqs/bsvyb/LYgA0AGgAwAGQAyAGQAyACQASADQAaADAAZADIAZADIAJABIANABoAMABkAMgBkAMgAkAEgA0AGgAwAGQAyAGQAyACQASADQAaADAAZvAQAGQAyAGQAyACQASADQAaADAAZADIAZADIAJABIANABoAMwH34DTVVB+Uksi5yAAAAAElFTkSuQmCC',
		});

		onMounted(() => {
			addEventListener();
		});

		onBeforeMount(() => {
			removeEventListener();
		});

		/**
		 * 添加移动/结束事件监听
		 */
		const addEventListener = () => {
			document.addEventListener('mousemove', onRangeMouseMove, false);
			document.addEventListener('mouseup', onRangeMouseUp, false);
			document.addEventListener('touchmove', onRangeMouseMove, {
				passive: false,
			});
			document.addEventListener('touchend', onRangeMouseUp, false);
		};

		/**
		 * 移除移动/结束事件监听
		 */
		const removeEventListener = () => {
			timeoutClear();
			// document.body.removeChild(this.$el);
			document.removeEventListener('mousemove', onRangeMouseMove, false);
			document.removeEventListener('mouseup', onRangeMouseUp, false);
			document.removeEventListener('touchmove', onRangeMouseMove, {
				capture: false,
			});
			document.removeEventListener('touchend', onRangeMouseUp, false);
		};

		watch(
			() => props.schema,
			(newValue) => {
				init(newValue);
			}
		);

		const onReset = () => {
			resetStatus();
			emit('reset');
		};

		const resetStatus = () => {
			state.canAction = props.canOperate;
			state.isSuccess = false;
			state.isShowMessage = false;
			state.isLoading = props.loading;
			// 鼠标点下去时父级的width
			state.startWidth = props.sliderSize;
			// 鼠标按下时的X
			state.startX = 0;
			// 鼠标当前的偏移X
			state.newX = 0;
		};

		const init = (value: JigsawCaptcha) => {
			resetStatus();
			state.backgroundImageBase64 = value.originalImageBase64;
			state.jigsawImageBase64 = value.sliderImageBase64;
		};

		/**
		 * styleWidth是底部用户操作的滑块的父级，就是轨道在鼠标的作用下应该具有的宽度
		 */
		const styleWidth = computed(() => {
			const w = state.startWidth + state.newX - state.startX;
			return w < props.sliderSize ? props.sliderSize : w > props.canvasWidth ? props.canvasWidth : w;
		});

		const getImage = (content: string): string => {
			let backgroundImage = '';
			if (content) {
				backgroundImage = content;
			} else {
				backgroundImage = state.defautImage;
			}

			let image = 'data:image/png;base64,';
			if (backgroundImage.startsWith(image)) {
				return backgroundImage;
			} else {
				return image + state.defautImage;
			}
		};

		const backgroundImage = computed(() => {
			return getImage(state.backgroundImageBase64);
		});

		const jigsawImage = computed(() => {
			return getImage(state.jigsawImageBase64);
		});

		// 鼠标按下准备拖动
		const onRangeMouseDown = (e: any) => {
			if (state.canAction) {
				state.isMouseDown = true;
				const slider = RangeSlider.value as HTMLDivElement;
				state.startWidth = slider.clientWidth;
				state.newX = e.clientX || e.changedTouches[0].clientX;
				state.startX = e.clientX || e.changedTouches[0].clientX;
			}
		};

		// 鼠标移动
		const onRangeMouseMove = (e: any) => {
			if (state.isMouseDown) {
				e.preventDefault();
				state.newX = e.clientX || e.changedTouches[0].clientX;
			}
		};

		// 鼠标抬起
		const onRangeMouseUp = () => {
			if (state.isMouseDown) {
				state.isMouseDown = false;
				verify();
			}
		};

		const timeoutClear = () => {
			if (state.timer) {
				clearTimeout(state.timer);
			}
		};

		const verify = () => {
			const openApi = useOpenApi();
			state.canAction = false;
			state.isLoading = true;
			const x = state.newX - state.startX;

			openApi
				.verifyCaptcha(props.identity, props.captchaType, { x: x, y: 5 })
				.then((result) => {
					if (result.data) {
						state.message = props.successText;
						state.isSuccess = true;
						state.isShowMessage = true;
						state.canAction = false;

						timeoutClear();
						state.timer = setTimeout(() => {
							// 成功的回调
							emit('verify', true);
						}, 800);
					}
				})
				.catch((error) => {
					if (error.code && error.code === 40610) {
						// 失败
						state.message = props.failedText;
					} else {
						state.message = error.message;
					}
					state.isSuccess = false;
					state.isShowMessage = true;
					state.canAction = false;

					// 800ms后重置
					timeoutClear();
					state.timer = setTimeout(() => {
						emit('verify', false);
						onReset();
					}, 800);
				});
		};

		return {
			...toRefs(state),
			backgroundImage,
			jigsawImage,
			styleWidth,
			onRangeMouseDown,
			onReset,
			RangeSlider,
		};
	},
});
</script>

<style lang="scss">
.captcha-body {
	position: relative;
	overflow: hidden;
	border-radius: 3px;
	.jigsaw-slider {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		z-index: 2;
	}
}
.slider-control {
	.range-box {
		position: relative;
		width: 100%;
		background-color: #eef1f8;
		margin-top: 20px;
		border-radius: 3px;
		box-shadow: 0 0 8px rgba(240, 240, 240, 0.6) inset;
		.range-text {
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
		.range-slider {
			position: absolute;
			height: 100%;
			width: 50px;
			background-color: rgba(106, 160, 255, 0.8);
			border-radius: 3px;
			.range-btn {
				position: absolute;
				display: flex;
				align-items: center;
				justify-content: center;
				right: 0;
				width: 50px;
				height: 100%;
				background-color: #fff;
				border-radius: 3px;
				box-shadow: 0 0 4px #ccc;
				cursor: pointer;
				& > div {
					width: 0;
					height: 40%;

					transition: all 200ms;
					&:nth-child(2) {
						margin: 0 4px;
					}
					border: solid 1px #6aa0ff;
				}
				&:hover,
				&.isDown {
					& > div:first-child {
						border: solid 4px transparent;
						height: 0;
						border-right-color: #6aa0ff;
					}
					& > div:nth-child(2) {
						border-width: 3px;
						height: 0;
						border-radius: 3px;
						margin: 0 6px;
						border-right-color: #6aa0ff;
					}
					& > div:nth-child(3) {
						border: solid 4px transparent;
						height: 0;
						border-left-color: #6aa0ff;
					}
				}
			}
		}
	}
}
</style>
