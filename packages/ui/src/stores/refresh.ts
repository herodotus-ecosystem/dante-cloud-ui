import { defineStore } from 'pinia';

import { useAuthenticationStore } from '@/stores';
import { ActionUtils } from '@/lib/utils';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { RetryRequest } from '@/lib/declarations';

export const useRefreshStore = defineStore('Refresh', {
  state: () => ({
    refreshing: false,
    requests: [] as Array<RetryRequest>,
  }),

  getters: {},

  actions: {
    onRefresh(axiosInstance: AxiosInstance, config: AxiosRequestConfig): Promise<any> {
      if (!this.refreshing) {
        this.refreshing = true;
        const auth = useAuthenticationStore();
        return auth
          .refreshToken()
          .then((res) => {
            // 已经刷新了token，将所有队列中的请求进行重试
            const newToken = auth.access_token;
            if (config.headers) config.headers.Authorization = 'Bearer ' + newToken;
            this.requests.forEach(function (resolve) {
              resolve(axiosInstance(config));
              console.log('listed func');
            });
            this.requests = [];
            return axiosInstance(config);
          })
          .catch((res) => {
            console.error('refreshtoken error =>', res);
            ActionUtils.tokenExpires('认证失效!', '登录认证已过期，请重新登录！', 'warning');
          })
          .finally(() => {
            this.refreshing = false;
          });
      } else {
        // 正在刷新token，将返回一个未执行resolve的promise
        return new Promise((resolve) => {
          // 将resolve放进队列，等token刷新后直接执行
          this.requests.push(resolve);
        });
      }
    },
  },
});
