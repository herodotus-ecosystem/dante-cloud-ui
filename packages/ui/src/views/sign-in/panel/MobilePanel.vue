<template>
  <q-card>
    <q-card-section>
      <h-label size="h6" text="手机验证码登录" align="left"></h-label>
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
        icon="mdi-close-circle-outline" />
      <q-btn v-if="prompt" align="left" flat class="q-mb-sm full-width" :label="promptMessage" />
      <h-text-field
        v-model="mobile"
        label="手机号码"
        class="q-mr-sm"
        placeholder="请输入手机号码"
        dense
        :error="v.mobile.$error"
        :error-message="v.mobile.$errors[0] ? v.mobile.$errors[0].$message : ''"
        @blur="v.mobile.$touch()">
        <template #before>
          <q-icon color="primary" name="mdi-cellphone" />
        </template>
      </h-text-field>
      <h-container mode="two" :offset="1" wider="start">
        <h-text-field
          v-model="verificationCode"
          label="手机验证码"
          placeholder="请先输入正确的图形验证"
          dense
          :error="v.verificationCode.$error"
          :error-message="v.verificationCode.$errors[0] ? v.verificationCode.$errors[0].$message : ''"
          @blur="v.verificationCode.$touch()">
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
              :disable="!mobile"
              @click="onGetVerificationCode()"
              :label="'获取验证码'" />
            <q-btn
              v-else
              unelevated
              outline
              color="primary"
              disable
              readonly
              class="full-width q-mb-md"
              :label="readSeconds" />
          </div>
        </template>
      </h-container>

      <h-behavior-captcha v-model="isShowCaptcha" @verify="onCaptchaVerfiy($event)"></h-behavior-captcha>

      <q-btn
        rounded
        unelevated
        color="primary"
        class="full-width q-mb-md"
        :disable="isDisabled"
        @click="onShowCaptcha()"
        label="登录" />

      <q-divider></q-divider>

      <q-btn
        rounded
        unelevated
        outline
        icon="mdi-keyboard-return"
        class="full-width q-mb-md"
        label="返回"
        @click="application.switchToAccountPanel()" />
      <h-divider label="其它登录方式" class="q-mb-md"></h-divider>

      <h-row justify="center"><q-btn round color="primary" icon="mdi-wechat" /></h-row>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { required, helpers } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { useApplicationStore, useAuthenticationStore } from '/@/stores';
import { PathEnum } from '/@/lib/enums';
import { toast, api } from '/@/lib/utils';

export default defineComponent({
  name: 'MobilePanel',

  setup(props) {
    const application = useApplicationStore();
    const authentication = useAuthenticationStore();
    const router = useRouter();

    const mobile = ref('');
    const verificationCode = ref('');
    const TIME_COUNT = ref(120);
    const count = ref();
    const timer = ref(null) as Ref<NodeJS.Timeout | null>;
    const isShowCaptcha = ref(false);
    const errorMessage = ref('');
    const hasError = ref(false);

    const showPrompt = ref(true);
    const isSubmitDisabled = ref(false);

    const rules = {
      mobile: {
        required: helpers.withMessage('手机号码不能为空', required),
        format: helpers.withMessage(
          '手机号格式不正确',
          // 中国手机号(严谨), 根据工信部2019年最新公布的手机号段
          helpers.regex(/^((\+|00)86)?1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/)
        )
      },
      verificationCode: {
        required: helpers.withMessage('手机验证码不能为空', required)
      }
    };
    const v = useVuelidate(rules, { mobile, verificationCode });

    //点击发送验证码
    const onGetVerificationCode = () => {
      if (showPrompt.value) {
        api.open().createVerificationCode(mobile.value);
      }
      if (!timer.value) {
        count.value = TIME_COUNT.value;
        showPrompt.value = false;
        timer.value = setInterval(() => {
          if (count.value > 0 && count.value <= TIME_COUNT.value) {
            count.value--;
          } else {
            showPrompt.value = true;
            clearInterval(timer.value as NodeJS.Timeout);
            timer.value = null;
          }
        }, 1000);
      }
    };

    const signIn = async () => {
      isSubmitDisabled.value = true;

      authentication
        .smsSignIn(mobile.value, verificationCode.value)
        .then(response => {
          if (response) {
            isSubmitDisabled.value = false;
            toast.success('欢迎回来！');
            router.push({
              path: PathEnum.HOME
            });
          }
        })
        .catch(error => {
          isSubmitDisabled.value = false;
          if (error.message) {
            errorMessage.value = error.message;
            hasError.value = true;
          }
        });
    };

    const readSeconds = computed(() => {
      return count.value + ' 秒后获取';
    });

    const prompt = computed(() => {
      return authentication.remainTimes !== 0 && hasError.value;
    });

    const promptMessage = computed(() => {
      return '您还有【' + authentication.remainTimes + '】次尝试机会，之后将会锁定该账户';
    });

    const isDisabled = computed(() => {
      return !(mobile.value && verificationCode.value);
    });

    const onShowCaptcha = () => {
      v.value.$validate().then(result => {
        if (result) {
          isShowCaptcha.value = true;
        }
      });
    };

    const onCaptchaVerfiy = ($event: boolean) => {
      if ($event) {
        isShowCaptcha.value = false;
        signIn();
      }
    };

    const onResetError = () => {
      errorMessage.value = '';
      hasError.value = false;
    };

    return {
      application,
      mobile,
      verificationCode,
      showPrompt,
      readSeconds,
      errorMessage,
      hasError,
      prompt,
      promptMessage,
      isShowCaptcha,
      isDisabled,
      v,
      signIn,
      onShowCaptcha,
      onGetVerificationCode,
      onResetError,
      onCaptchaVerfiy
    };
  }
});
</script>
