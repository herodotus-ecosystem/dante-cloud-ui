import type { ShallowRef, Ref } from 'vue';
import type { PingResponse } from '@/declarations';

import { shallowRef, ref } from 'vue';

import { SecurityApiResources } from '../api';

export default function useDeviceAuthorize(
  deviceCode: ShallowRef<string>,
  clientId: ShallowRef<string>,
  clientSecret: ShallowRef<string>,
  scope = '',
) {
  const handler = shallowRef(0);
  const interval = shallowRef(5);
  const isSuccess = shallowRef(false);
  const isFailed = shallowRef(false);
  const successResponse = shallowRef({});
  const pullingResponse = ref([]) as Ref<Array<PingResponse>>;

  const message = (text: string, isSuccess = false) => {
    const id = pullingResponse.value.length + 1;
    if (!isSuccess) {
      pullingResponse.value.push({ id: id, icon: 'mdi-alert-circle', color: 'error', text: text });
    } else {
      pullingResponse.value.push({ id: id, icon: 'mdi-information', color: 'green', text: text });
    }
  };

  const pulling = (status: string) => {
    if (status === 'authorization_pending') {
      message('Authorization pending, continuing to poll...');
    } else if (status === 'slow_down') {
      message('Slowing down...');
      slowDown();
    } else if (status === 'token_expired') {
      message('Token expired, stopping...');
      clear();
      isFailed.value = true;
    } else if (status === 'access_denied') {
      message('Access denied, stopping...');
      clear();
      isFailed.value = true;
    }
  };

  const process = () => {
    SecurityApiResources.getInstance()
      .oauth2()
      .deviceCodeFlow(deviceCode.value, clientId.value, clientSecret.value, scope)
      .then((response) => {
        message('Authorization successful', true);
        clear();
        isSuccess.value = true;
        successResponse.value = response;
      })
      .catch((error) => {
        pulling(error.error);
      });
  };

  const schedule = () => {
    handler.value = window.setInterval(process, interval.value * 1000);
  };

  const clear = () => {
    window.clearInterval(handler.value);
  };

  const slowDown = () => {
    interval.value += 5;
    clear();
    schedule();
  };

  return {
    pullingResponse,
    successResponse,
    isFailed,
    isSuccess,
    schedule,
    clear,
    slowDown,
  };
}
