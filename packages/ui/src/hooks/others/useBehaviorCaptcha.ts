import type { Ref } from 'vue';
import { ref } from 'vue';
import type { BehaviorCaptchaCategory, CaptchaResource, CaptchaData } from '@/lib/declarations';

import { api } from '@/lib/utils';
import { useCryptoStore } from '@/stores';

export default function useBehaviorCaptcha() {
  const timer = ref<ReturnType<typeof setTimeout> | null>(null);
  const message = ref<string>('');
  const canOperate = ref<boolean>(true);
  const isLoading = ref<boolean>(false);
  const isSuccess = ref<boolean>(false);
  const isShowMessage = ref<boolean>(false);
  const schema = ref({}) as Ref<CaptchaResource>;

  const successText = '验证通过!';
  const failedText = '验证失败，请重试!';
  const defautImage =
    'iVBORw0KGgoAAAANSUhEUgAAAQQAAACgCAIAAABlkIURAAAFQ0lEQVR42u3dsXLbMAyA4b7/e2XNmLFj1o4ZXV1wh+JAiZZdt5bt7x9yiRPRiYPfBEiR/PEF4JsfXgKADAAZADIAZADIAJABIANABoAMABkAMgBkAMgAkAEgA0AGgAwAGQAyAGQAyACQASADQAaADAAZADIAZADIAJABIANABoAMABkAMgBkAEAGgAwAGQAyAGQAyACQASADQAaADAAZADIAZDgcP7fx4pDhtfj4+HhfY3nci0MGMpCBDC/Dr8JEhl//C/8RMtyHz8/P94OhPiHDsfKiOyIlIwMZyECGY8iw5EtLvk4GMpDhfTHhdDodoaMgAxnuKcPSLYxZ03wEaSlzyUCGJ5Th9E2TYQn30zZ7cqqltZi9XmRbPu7sdshAhgeTYT4mu1y7NWNwdjCXDGR4kp4hkqsI+tYVREcRzzvJsshAhsPJsHz+uc1qNEccT2ayc+Rq0reQgQyHk+G6wrf1GB+FlkctzzgxCmR4YBlilKl1LEub2XgbgwofxmckAxkeW4YW2VEb1BpjtXpu/pCBDM8gwxLTGegRzdlmraTHknp8UjKQ4YFlaDEd9XGMOJ1tcBxZIgMZHliGSIri2uwW9pgQ5rTciQxkeHgZJmNK82vJQIanlWH/nRc5V00GMjyhDBfx9vY23jpOBjI8TwF99TAUGcjw8DKsDgrtt8hoEhmeSoaYbL7JVWQgwyFk+Msbky7qHLYuIQMZHluGyb1Gk8xqdQSWDGR47DSpzj3vaSTWPLiFmwxPK0Ndq7DVVK7vsZUlGY4ow9f3DRRfN9pGKaM5hk1zH+/cdmC+8pMMZLinDLFW87ZbxdToTzf2TE6TgQz3lOGidN++SWR4chnGlZlkIMOLymCvVTK8OjHscyhapQEyAGQAyACQASADQAaADAAZ/i9XnLgc+xfVFsabi9rPTw5hmFwytnD2+Oe4z8+/lQzXsHPF2XhJBmUsu5mEYNx5ulOGiOaY7c47WKOFnPWbXD7+tiDDBTLkiWwRbbEjS5J3bt9QhsnZ5hMZcu/h1i9V6i7Fe3oSkGE9r8gQzHNGMvSvk2F1rWY8mIe41Wvb+Sbtyzzxrcqwc48Z/2gy7JUhe4AaoxGOWzLsCb66LCE/afLUz/fvElBlqOcG1V1Zcw0dGchwQZoUH/Put3rK7ZYMqc1IC75sIbOdLRlqWtVyoYzp1ni7vKnSOjGQYW+aVNdYtnfrSZp0lqx6o/0WwS1N2lotXXfhbuUHGchwy56hLtypRxLmt0YZWp09KVUzXtOrLRny9Kq6GDq3D1sdTWpHsrcCWppEhot7hiTr1BhcWq0Zzu579zcyZIaWOVvKUJM3BTQZ/m2aVAdYJ2nS6lm32V2sDii18mNSM8y3Zx0nGRTQZLi9DDU1qsOXTYYIuHEgdax6x6w9k5x5AV3zt8y+sv2Wj7UvW80w/nC0MHmkza+T4UV7hgyOHAwdZVjNVSYy1Cy/ns+wNc+wukNMHeCKrmbrz5nPQI/dS/1LawX/ap0JGf68AY/DoxHEGZo1VlZviFiVIR/MdlY3024yRL9Ua4acA8lf6ToZxm6tuZ0TgnoGMvxctSLDKwrc1XfNLRnqBtpjFzFPk2rX1EqC62T4GqYpxkdes8Agw0pWfcUP/KMwqs/bsvyb/LYgA0AGgAwAGQAyAGQAyACQASADQAaADAAZADIAZADIAJABIANABoAMABkAMgBkAMgAkAEgA0AGgAwAGQAyAGQAyACQASADQAaADAAZvAQAGQAyAGQAyACQASADQAaADAAZADIAZADIAJABIANABoAMwH34DTVVB+Uksi5yAAAAAElFTkSuQmCC';

  const crypto = useCryptoStore();

  const verifyCaptcha = (
    category: BehaviorCaptchaCategory,
    data: CaptchaData,
    successCallback: () => void,
    failedCallback: () => void,
  ) => {
    canOperate.value = false;
    isLoading.value = true;

    const identity = crypto.sessionId;

    api
      .open()
      .verifyCaptcha(identity, category, data)
      .then((result) => {
        if (result.data) {
          message.value = successText;
          isSuccess.value = true;
          isShowMessage.value = true;
          canOperate.value = false;
          timeoutSet(successCallback);
        }
      })
      .catch((error) => {
        if (error.code && error.code === 40610) {
          // 失败
          message.value = failedText;
        } else {
          message.value = error.message;
        }
        isSuccess.value = false;
        isShowMessage.value = true;
        canOperate.value = false;
        timeoutSet(failedCallback);
      });
  };

  const fetchCaptcha = (category: BehaviorCaptchaCategory) => {
    isLoading.value = true;

    const identity = crypto.sessionId;

    if (identity) {
      api
        .open()
        .createCaptcha(identity, category)
        .then((result) => {
          schema.value = result.data as CaptchaResource;
          canOperate.value = true;
          isLoading.value = false;
        })
        .catch(() => {
          isLoading.value = false;
        });
    }
  };

  const reset = () => {
    message.value = '';
    isSuccess.value = false;
    isShowMessage.value = false;
    canOperate.value = true;
    isLoading.value = false;
  };

  const getImage = (date: string): string => {
    let image = '';
    if (date) {
      image = date;
    } else {
      image = defautImage;
    }

    const prefix = 'data:image/png;base64,';
    if (image.startsWith(prefix)) {
      return image;
    } else {
      return prefix + defautImage;
    }
  };

  const timeoutClear = () => {
    if (timer.value) {
      clearTimeout(timer.value);
    }
  };

  const timeoutSet = (callback: () => void) => {
    timer.value = setTimeout(callback, 800);
  };

  return {
    getImage,
    timeoutClear,
    timeoutSet,
    message,
    canOperate,
    isLoading,
    isSuccess,
    isShowMessage,
    verifyCaptcha,
    reset,
    fetchCaptcha,
    schema,
  };
}
