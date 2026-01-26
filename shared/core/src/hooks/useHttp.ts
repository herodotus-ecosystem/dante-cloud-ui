import type {
  AxiosHttpResult,
  HttpResult,
  CreateAxiosDefaults,
  AxiosRequestConfig,
  AxiosResponse,
} from '@/declarations';

import axios from 'axios';
import qs from 'qs';
import { useAxios } from '@vueuse/integrations/useAxios';

import { Base64 } from '@/lib';
import { assignIn } from 'lodash-es';
import { ContentTypeEnum, HttpMethodEnum, AuthorizationTokenEnum } from '@herodotus-cloud/core';

/**
 * Http 请求 Hooks
 * @param config Axios 实例配置
 * @param headers 请求通用 Headers
 */
export default function useHttp(config?: CreateAxiosDefaults) {
  const defaultAxiosConfig = {
    timeout: 1000 * 12,
    paramsSerializer: (data: unknown) => {
      return qs.stringify(data, { arrayFormat: 'brackets' });
    },
  };

  const createConfig = (): CreateAxiosDefaults => {
    if (config) {
      return assignIn(defaultAxiosConfig, config);
    } else {
      return defaultAxiosConfig;
    }
  };

  const getContentType = (contentType: ContentTypeEnum): Record<string, string> => {
    switch (contentType) {
      case ContentTypeEnum.URL_ENCODED:
        return {
          'Content-Type': 'application/x-www-form-urlencoded',
        };
      case ContentTypeEnum.MULTI_PART:
        return { 'Content-Type': 'multipart/form-data' };
      default:
        return { 'Content-Type': 'application/json' };
    }
  };

  const createHeaderWithBearer = (
    token: string,
    sessionId?: string,
    tenantId?: string,
  ): Record<string, string> => {
    const headers = {
      Authorization: AuthorizationTokenEnum.BEARER + token,
    } as Record<string, string>;

    if (sessionId) {
      headers['X-Herodotus-Session-Id'] = sessionId;
    }

    if (tenantId) {
      headers['X-Herodotus-Tenant-Id'] = tenantId;
    }

    return headers;
  };

  const createHeaderWithBasic = (
    clientId: string,
    clientSecret: string,
    sessionId?: string,
    tenantId?: string,
  ): Record<string, string> => {
    const headers = {
      Authorization: AuthorizationTokenEnum.BASIC + Base64.encode(clientId + ':' + clientSecret),
    } as Record<string, string>;

    if (sessionId) {
      headers['X-Herodotus-Session-Id'] = sessionId;
    }

    if (tenantId) {
      headers['X-Herodotus-Tenant-Id'] = tenantId;
    }

    return headers;
  };

  const createHeaders = (contentType: ContentTypeEnum, headers?: Record<string, string>) => {
    const contentTypeHeader = getContentType(contentType);

    if (headers) {
      return assignIn({}, contentTypeHeader, headers);
    } else {
      return contentTypeHeader;
    }
  };

  const instance = axios.create(createConfig());

  const request = <T, D>(
    url: string,
    data = {} as D,
    params = {},
    method = HttpMethodEnum.GET,
    contentType = ContentTypeEnum.JSON,
    headers?: Record<string, string>,
  ): Promise<AxiosHttpResult<T>> => {
    const { execute } = useAxios<HttpResult<T>, AxiosResponse<HttpResult<T>>, D>(
      url,
      { headers: createHeaders(contentType, headers), method: method },
      instance,
      { immediate: false },
    );

    const config = {} as AxiosRequestConfig<D>;
    if (data) {
      config.data = data;
    }
    if (params) {
      config.params = params;
    }

    return new Promise<AxiosHttpResult<T>>((resolve, reject) => {
      execute(config)
        .then((result) => {
          const data = result.response.value as AxiosResponse<HttpResult<T>>;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const doGet = <T>(
    url: string,
    params = {},
    headers?: Record<string, string>,
  ): Promise<AxiosHttpResult<T>> => {
    return request<T, string>(url, '', params, HttpMethodEnum.GET, ContentTypeEnum.JSON, headers);
  };

  const doPost = <T, D>(
    url: string,
    data = {} as D,
    contentType = ContentTypeEnum.JSON,
    params = {},
    headers?: Record<string, string>,
  ): Promise<AxiosHttpResult<T>> => {
    return request<T, D>(url, data, params, HttpMethodEnum.POST, contentType, headers);
  };

  const doPut = <T, D>(
    url: string,
    data = {} as D,
    contentType = ContentTypeEnum.JSON,
    params = {},
  ): Promise<AxiosHttpResult<T>> => {
    return request<T, D>(url, data, params, HttpMethodEnum.PUT, contentType);
  };

  const doDelete = <T, D>(
    url: string,
    data = {} as D,
    contentType = ContentTypeEnum.JSON,
    params = {},
  ): Promise<AxiosHttpResult<T>> => {
    return request<T, D>(url, data, params, HttpMethodEnum.DELETE, contentType);
  };

  return {
    doGet,
    doPost,
    doPut,
    doDelete,
    createHeaderWithBearer,
    createHeaderWithBasic,
  };
}
