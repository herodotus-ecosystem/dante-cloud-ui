<template>
  <q-card>
    <q-card-section>
      <h-label size="h6" text="账号密码登录" align="left"></h-label>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <q-btn
        v-if="hasError"
        align="left"
        outline
        color="negative"
        class="q-mb-sm full-width"
        :label="errorMessage"
        icon="mdi-close-circle-outline"
      />
      <q-btn v-if="prompt" align="left" flat class="q-mb-sm full-width" :label="promptMessage" />

      <h-text-field
        v-model="username"
        label="用户名"
        placeholder="请输入用户名"
        dense
        :error="v.username.$error"
        :error-message="v.username.$errors[0] ? v.username.$errors[0].$message : ''"
        tabindex="1"
        :readonly="isDisabled"
        @change="onResetError()"
        @blur="v.username.$validate()"
      >
        <template #before>
          <q-icon color="primary" name="mdi-account" />
        </template>
      </h-text-field>

      <h-text-field
        v-model="password"
        label="密码"
        placeholder="请输入密码"
        dense
        :type="isShowPassword ? 'text' : 'password'"
        :error="v.password.$error"
        :error-message="v.password.$errors[0] ? v.password.$errors[0].$message : ''"
        tabindex="2"
        :readonly="isDisabled"
        @change="onResetError()"
        @blur="v.password.$validate()"
      >
        <template #before>
          <q-icon color="primary" name="mdi-key-chain" />
        </template>
        <template #append>
          <q-icon
            :name="isShowPassword ? 'visibility' : 'visibility_off'"
            class="cursor-pointer"
            @click="isShowPassword = !isShowPassword"
          />
        </template>
      </h-text-field>

      <q-btn
        tabindex="3"
        rounded
        unelevated
        color="primary"
        class="full-width q-mb-md"
        :disable="isDisabled"
        label="登录"
        @click="onShowCaptcha()"
        @keyup.enter="onShowCaptcha()"
      />
      <h-behavior-captcha
        v-model="isShowCaptcha"
        @verify="onCaptchaVerfiy($event)"
      ></h-behavior-captcha>

      <!-- <h-container mode="two" gutter="md" gutter-col horizontal class="q-mb-md">
				<template #left>
					<q-btn outline class="full-width" @click="application.switchToMobilePanel()" label="手机验证码登录" />
				</template>
				<template #right>
					<q-btn outline class="full-width" @click="application.switchToScanPanel()" label="扫码登录" />
				</template>
			</h-container> -->
      <q-btn
        outline
        class="full-width q-mb-md"
        @click="application.switchToMobilePanel()"
        label="手机验证码登录"
      />

      <h-divider label="其它登录方式" class="q-mb-md"></h-divider>

      <h-social-sign-in-list></h-social-sign-in-list>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import { PathEnum } from '@/lib/enums';
import { toast } from '@/lib/utils';
import { useApplicationStore, useCryptoStore, useAuthenticationStore } from '@/stores';
import { HSocialSignInList } from '../components';

export default defineComponent({
  name: 'AccountPanel',

  components: {
    HSocialSignInList,
  },

  setup() {
    const application = useApplicationStore();
    const authentication = useAuthenticationStore();
    const crypto = useCryptoStore();

    const router = useRouter();

    const username = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const isShowPassword = ref(false);
    const isShowCaptcha = ref(false);
    const isSubmitDisabled = ref(false);
    const hasError = ref(false);

    const rules = {
      username: {
        required: helpers.withMessage('用户名不能为空', required),
      },
      password: {
        required: helpers.withMessage('密码不能为空', required),
      },
    };

    const v = useVuelidate(rules, { username, password });

    const signIn = async () => {
      isSubmitDisabled.value = true;

      console.log('---password sign in ---');
      authentication
        .signIn(username.value, password.value)
        .then((response) => {
          if (response) {
            isSubmitDisabled.value = false;
            toast.success('欢迎回来！');
            router.push({
              path: PathEnum.HOME,
            });
          }
        })
        .catch((error) => {
          isSubmitDisabled.value = false;
          if (error.message) {
            errorMessage.value = error.message;
            hasError.value = true;
          }
        });
    };

    const onResetError = () => {
      errorMessage.value = '';
      hasError.value = false;
    };

    const onShowCaptcha = () => {
      v.value.$validate().then((result) => {
        if (result) {
          isShowCaptcha.value = true;
        }
      });
    };

    const prompt = computed(() => {
      return authentication.remainTimes !== 0 && hasError.value;
    });

    const promptMessage = computed(() => {
      return '您还有【' + authentication.remainTimes + '】次尝试机会，之后将会锁定该账户';
    });

    const isDisabled = computed(() => {
      return crypto.sessionId ? false : true;
    });

    const onCaptchaVerfiy = ($event: boolean) => {
      if ($event) {
        isShowCaptcha.value = false;
        signIn();
      }
    };

    const enterKey = (e: any) => {
      // 回车则执行登录方法 enter键的ASCII是13
      if (e.keyCode == 13 || e.keyCode == 100) {
        onShowCaptcha(); // 定义的登录方法
      }
    };

    onMounted(() => {
      window.addEventListener('keydown', (e) => enterKey(e));
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', (e) => enterKey(e), false);
    });

    return {
      application,
      username,
      password,
      isShowPassword,
      isShowCaptcha,
      onShowCaptcha,
      onCaptchaVerfiy,
      v,
      errorMessage,
      hasError,
      onResetError,
      prompt,
      promptMessage,
      isDisabled,
    };
  },
});
</script>
