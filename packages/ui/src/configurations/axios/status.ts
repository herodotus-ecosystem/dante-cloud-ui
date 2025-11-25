import type { AxiosResponse, AxiosInstance, AxiosError } from '@herodotus-cloud/core';

import { notify, parseResponseStatus } from '@herodotus-cloud/core';

import { SignOutUtilities } from '@herodotus-cloud/framework-kernel';

const excludedRequest = ['/open/captcha', '/oauth2/token'];

const isIncluded = (response: AxiosResponse<any>) => {
  const request = response.config.url;
  return !(request && excludedRequest.includes(request));
};

const statusCode = (
  axiosInstance: AxiosInstance,
  response?: AxiosResponse<any>,
  message?: string,
) => {
  if (response && isIncluded(response)) {
    const information = parseResponseStatus(response, message);
    const content = information.message;
    const detail = information.detail;
    const status = information.status;
    const code = information.code;

    console.log(status);

    switch (status) {
      case 401:
        if (!code || code === 40109) {
          // console.log('--refresh token --', VARIABLES.getAutoRefreshToken());
          // if (VARIABLES.getAutoRefreshToken()) {
          //   return useRefreshStore().onRefresh(axiosInstance, response.config);
          // } else {
          //   ActionUtils.tokenExpires('认证失效!', '登录认证已过期，请重新登录！', 'warning');
          // }
          SignOutUtilities.getInstance().tokenExpires(
            '认证失效!',
            '登录认证已过期，请重新登录！',
            'warning',
          );
        } else if ([40103, 40106, 40105, 40111, 40112].includes(code)) {
        } else {
          notify.error(content, detail);
        }
        break;
      case 403:
        notify.error(content, detail);
        break;
      // 404请求不存在
      case 404:
        notify.warning('请求的资源不存在，可能服务未启动！');
        break;
      case 405:
        break;
      case 406:
        if ([40608].includes(code)) {
        } else {
          notify.error(content, detail);
        }
        break;
      case 408:
        break;
      case 412:
        break;
      case 500:
        if (content) {
          if (content === 'Request failed with status code 500') {
            SignOutUtilities.getInstance().tokenExpires(
              '网络错误!',
              '后端服务无法访问或者尚未启动！',
              'error',
            );
          } else {
            notify.error(content, detail);
          }
        } else {
          notify.error('系统错误，请稍后再试！或者联系管理员');
        }
        break;
      case 503:
        notify.warning('网络抖动，请稍后再试！');
        break;
      case 504:
        notify.error(content, detail);
        break;
      case 505:
        notify.error(content, detail);
        break;
      default:
        notify.error(content, detail);
        break;
    }
  }
};

export const processor = (axiosInstance: AxiosInstance, error: AxiosError) => {
  const { response, message, code } = error;

  console.log(code);

  switch (code) {
    case 'ECONNABORTED':
      SignOutUtilities.getInstance().tokenExpires('网络错误!', '响应超时，请稍后再试！', 'error');
      break;
    case 'ERR_NETWORK':
      SignOutUtilities.getInstance().tokenExpires(
        '网络错误!',
        '系统响应超时，请稍后再试！',
        'error',
        true,
      );
      break;
    // case 'ERR_BAD_RESPONSE':
    //   ActionUtils.tokenExpires('网络错误!', '响应超时，请稍后再试！', 'error');
    //   break;
    case 'ECONNRESET':
      break;
    default:
      // const statusPromise = statusCode(axiosInstance, response, message);
      // if (statusPromise) {
      //   return statusPromise;
      // }

      statusCode(axiosInstance, response, message);
      break;
  }

  return Promise.reject(error);
};
