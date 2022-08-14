<template>
	<q-card>
		<q-card-section>
			<h-label size="h6" text="手机验证码登录" align="left"></h-label>
		</q-card-section>

		<q-separator inset />

		<q-card-section>
			<h-text-field v-model="mobile" label="手机号码" class="q-mr-sm" placeholder="请输入手机号码" dense>
				<template #before>
					<q-icon color="primary" name="mdi-cellphone" />
				</template>
			</h-text-field>
			<h-container mode="two" :offset="1" wider="start">
				<h-text-field v-model="verificationCode" label="手机验证码" placeholder="请先输入正确的图形验证" dense>
					<template #before>
						<q-icon color="primary" name="mdi-android-messages" />
					</template>
				</h-text-field>
				<template #right>
					<div class="q-px-sm">
						<q-btn
							v-if="showPrompt"
							unelevated
							outline
							color="primary"
							class="full-width q-mb-md"
							:disable="!isVerificationCodeValid"
							@click="sendVerificationCode"
							:label="isVerificationCodeValid ? '获取验证码' : '请验证图形验证码'"
						/>
						<q-btn v-else unelevated outline color="primary" disable readonly class="full-width q-mb-md" :label="readSeconds" />
					</div>
				</template>
			</h-container>

			<h-graphic-captcha v-model="isVerificationCodeValid"></h-graphic-captcha>

			<q-btn rounded unelevated color="primary" class="full-width q-mb-md" :disable="!isVerificationCodeValid" label="登录" />

			<q-divider></q-divider>

			<q-btn rounded unelevated outline class="full-width" label="返回" @click="application.switchToAccountPanel()" />
		</q-card-section>
	</q-card>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';

import { useApplicationStore } from '/@/stores';

export default defineComponent({
	name: 'MobilePanel',

	setup(props) {
		const application = useApplicationStore();

		const mobile = ref('');
		const verificationCode = ref('');
		const TIME_COUNT = ref(120);
		const count = ref();
		const timer = ref(null) as Ref<NodeJS.Timer | null>;
		const showPrompt = ref(true);
		const isVerificationCodeValid = ref(false);

		const readSeconds = computed(() => {
			return count.value + ' 秒后获取';
		});

		const canBeObtainedVerificationCode = computed(() => {
			return isVerificationCodeValid.value && showPrompt.value;
		});

		//点击发送验证码
		const sendVerificationCode = () => {
			if (!timer.value) {
				count.value = TIME_COUNT.value;
				showPrompt.value = false;
				timer.value = setInterval(() => {
					if (count.value > 0 && count.value <= TIME_COUNT.value) {
						count.value--;
					} else {
						showPrompt.value = true;
						clearInterval(timer.value as NodeJS.Timer);
						timer.value = null;
					}
				}, 1000);
			}
		};

		return {
			application,
			mobile,
			verificationCode,
			showPrompt,
			readSeconds,
			sendVerificationCode,
			isVerificationCodeValid,
		};
	},
});
</script>
