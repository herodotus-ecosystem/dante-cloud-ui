import type {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  ParamsSerializerOptions,
  InternalAxiosRequestConfig,
  AxiosHttpResult,
  AxiosInstanceHooks,
  AxiosRequestConfig,
  HttpHeaderPolicy,
  HttpRequestOptions,
  HttpRequestPolicy,
  HttpResult,
} from '@/declarations';

import { ContentTypeEnum, HttpMethodEnum } from '@/enums';

import axios from 'axios';
import qs from 'qs';

import { AxiosCanceler } from './canceler';
import { isEmpty, merge, isFunction } from 'lodash-es';

/**
 * @description:  axios module
 */
export class Axios {
  private axiosInstance: AxiosInstance;
  private readonly defaultAxiosRequestConfig: AxiosRequestConfig;
  private readonly defaultRequestOptions: HttpRequestOptions;
  private readonly axiosInstanceHooks: AxiosInstanceHooks;

  constructor(
    defaultAxiosRequestConfig: AxiosRequestConfig,
    axiosInstanceHooks: AxiosInstanceHooks,
    defaultRequestOptions: HttpRequestOptions,
  ) {
    this.defaultAxiosRequestConfig = defaultAxiosRequestConfig;
    this.defaultRequestOptions = defaultRequestOptions;
    this.axiosInstanceHooks = axiosInstanceHooks;
    this.axiosInstance = this.createAxiosInstance(defaultAxiosRequestConfig);
    this.setupInterceptors();
  }

  private createAxiosInstance(config: AxiosRequestConfig): AxiosInstance {
    return axios.create(config);
  }

  private getDefaultAxiosRequestConfig(): AxiosRequestConfig {
    return this.defaultAxiosRequestConfig;
  }
  private getDefaultRequestOptions(): HttpRequestOptions {
    return this.defaultRequestOptions;
  }

  private getAxiosInstanceHooks(): AxiosInstanceHooks {
    return this.axiosInstanceHooks;
  }

  private getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  private createHttpHeaderPolicy<D = any>(contentType: ContentTypeEnum): HttpHeaderPolicy {
    switch (contentType) {
      case ContentTypeEnum.URL_ENCODED:
        return {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          dataConvert: (data: D) => {
            return qs.stringify(data, { arrayFormat: 'brackets' });
          },
        };
      case ContentTypeEnum.MULTI_PART:
        return {
          headers: { 'Content-Type': 'multipart/form-data' },
          dataConvert: (data: D) => {
            return data;
          },
        };
      default:
        return {
          headers: { 'Content-Type': 'application/json' },
          dataConvert: (data: D) => {
            return JSON.stringify(data);
          },
        };
    }
  }

  private setupInterceptors(): void {
    const instanceHooks = this.getAxiosInstanceHooks();

    if (!instanceHooks) {
      return;
    }

    const {
      requestInterceptors,
      requestInterceptorsError,
      responseInterceptors,
      responseInterceptorsError,
    } = instanceHooks;

    const axiosCanceler = new AxiosCanceler();

    // Request interceptor configuration processing
    this.getAxiosInstance().interceptors.request.use(
      (config: InternalAxiosRequestConfig<any>) => {
        // If cancel repeat request is turned on, then cancel repeat request is prohibited
        const { prohibitRepeatRequests } = this.getDefaultRequestOptions();

        if (prohibitRepeatRequests) {
          axiosCanceler.addPending(config);
        }
        return requestInterceptors(config);
      },
      (error: AxiosError) => {
        return requestInterceptorsError(this.getAxiosInstance(), error);
      },
    );

    // Response result interceptor processing
    this.getAxiosInstance().interceptors.response.use(
      (response: AxiosResponse<any>) => {
        response && axiosCanceler.removePending(response.config);
        return responseInterceptors(response);
      },
      (error: AxiosError) => {
        return responseInterceptorsError(this.getAxiosInstance(), error);
      },
    );
  }

  /**
   * 把当前请求的 options 与全局 options 整合获得一个完整的 options
   * @param currentRequestOptions 当前请求的 options
   * @returns 合并后的 options
   */
  private mergeHttpRequestOptions(currentRequestOptions?: HttpRequestOptions): HttpRequestOptions {
    const defaultRequestOptions = this.getDefaultRequestOptions();
    if (!isEmpty(currentRequestOptions)) {
      return merge({}, defaultRequestOptions, currentRequestOptions);
    } else {
      return defaultRequestOptions;
    }
  }

  /**
   * 把当前请求的 AxiosRequestConfig 与全局 AxiosRequestConfig 整合获得一个完整的 AxiosRequestConfig
   * @param currentAxiosRequestConfig 当前请求的 AxiosRequestConfig
   * @returns 合并后的 AxiosRequestConfig
   */
  private mergeAxiosRequestConfigs<D = unknown>(
    currentAxiosRequestConfig?: AxiosRequestConfig<D>,
  ): AxiosRequestConfig<D> {
    const defaultAxiosRequestConfig = this.getDefaultAxiosRequestConfig();

    const paramsSerializer: ParamsSerializerOptions = {
      serialize(params: any): string {
        // return Object.keys(params)
        //   .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        //   .join('&');
        return qs.stringify(params, { arrayFormat: 'brackets' });
      },
    };

    const result = merge({}, defaultAxiosRequestConfig, { paramsSerializer });

    if (!isEmpty(currentAxiosRequestConfig)) {
      return merge({}, result, currentAxiosRequestConfig);
    } else {
      return result;
    }
  }

  private setupRequestStrategy<D = any>(
    url: string,
    currentAxiosRequestConfig: AxiosRequestConfig<D>,
    currentHttpRequestOptions: HttpRequestOptions,
  ): HttpRequestPolicy {
    const { onRequestHook } = this.getAxiosInstanceHooks();

    // 合并 options。把当前请求的 options 与全局 options 整合获得一个完整的 options
    const httpRequestOptions = this.mergeHttpRequestOptions(currentHttpRequestOptions);

    // 合并 axios request config。把当前请求的 AxiosRequestConfig 与全局 AxiosRequestConfig 整合获得一个完整的 AxiosRequestConfig
    let axiosRequestConfig: AxiosRequestConfig<D> =
      this.mergeAxiosRequestConfigs(currentAxiosRequestConfig);
    if (onRequestHook && isFunction(onRequestHook)) {
      // 允许在 onRequestHook 中，对 AxiosRequestConfig 进行一些额外的设置
      axiosRequestConfig = onRequestHook(axiosRequestConfig, httpRequestOptions);
    }

    const httpHeaderPolicy = this.createHttpHeaderPolicy(httpRequestOptions.contentType);

    if (axiosRequestConfig.headers) {
      axiosRequestConfig.headers = merge(axiosRequestConfig.headers, httpHeaderPolicy.headers);
    } else {
      axiosRequestConfig.headers = httpHeaderPolicy.headers;
    }

    axiosRequestConfig.url = url;
    if (!isEmpty(axiosRequestConfig.data)) {
      axiosRequestConfig.data = httpHeaderPolicy.dataConvert(axiosRequestConfig.data);
    }

    return {
      config: axiosRequestConfig,
      options: httpRequestOptions,
    };
  }

  /**
   * 请求核心方法
   * @param config axios request 必要参数
   * @param options 针对每个请求特别指定的参数
   * @returns 响应数据
   */
  public request<T = any, D = any>(
    config: AxiosRequestConfig<D>,
    options?: HttpRequestOptions,
  ): Promise<AxiosHttpResult<T>> {
    return new Promise<AxiosHttpResult<T>>((resolve, reject) => {
      const { onResponseErrorHook, onResponseSuccessHook } = this.getAxiosInstanceHooks();
      this.getAxiosInstance()
        .request<HttpResult<T>, AxiosResponse<HttpResult<T>>, D>(config)
        .then((response: AxiosResponse<HttpResult<T>>) => {
          if (onResponseSuccessHook && isFunction(onResponseSuccessHook)) {
            const result = onResponseSuccessHook(response, options);
            resolve(result);
          } else {
            resolve(response);
          }
        })
        .catch((error: AxiosError) => {
          if (onResponseErrorHook && isFunction(onResponseErrorHook)) {
            const result = onResponseErrorHook(error, options);
            reject(result);
          } else {
            reject(error);
          }
        });
    });
  }

  /**
   * 处理请求。提取公共代码，避免每个方法中都要写一遍
   * @param url 请求地址
   * @param config axios request 必要参数
   * @param options 针对每个请求特别指定的参数
   * @returns 响应数据
   */
  private process<T = any, D = any>(
    url: string,
    config: AxiosRequestConfig<D>,
    options = {} as HttpRequestOptions,
  ): Promise<AxiosHttpResult<T>> {
    let strategy = this.setupRequestStrategy<D>(url, config, options);
    return this.request<T, D>(strategy.config, strategy.options);
  }

  /**
   * GET
   *
   * <T> 返回响应中实际 data 中的内容类型
   * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
   *
   * @param url 请求地址
   * @param params 拼接在请求地址路径后面的参数，根据实际情况也可能不需要。
   * @param options 对当前请求设置的参数
   * @returns
   */
  public get<T = any, D = any>(
    url: string,
    params = {},
    options = { contentType: ContentTypeEnum.JSON },
  ): Promise<AxiosHttpResult<T>> {
    return this.process<T, D>(
      url,
      {
        params,
        method: HttpMethodEnum.GET,
      },
      options,
    );
  }

  /**
   * POST
   *
   * 针对 url 中有参数同时 request body 中也有数据的情况。额外增加一个方法，以防对现有的代码产生影响。
   *
   * <T> 返回响应中实际 data 中的内容类型
   * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
   *
   * @param url 请求地址
   * @param data 放置在 RequestBody 中的数据
   * @param options 对当前请求设置的参数。
   * @param config 当前请求对 axios 特殊设置。POST 操作会有不同的 Content Type，以及不同的设置。
   * @returns
   */
  public post<T = any, D = any>(
    url: string,
    data: D,
    options = { contentType: ContentTypeEnum.JSON },
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosHttpResult<T>> {
    return this.process<T, D>(
      url,
      {
        ...config,
        data,
        method: HttpMethodEnum.POST,
      },
      options,
    );
  }

  /**
   * POST
   *
   * <T> 返回响应中实际 data 中的内容类型
   * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
   *
   * @param url 请求地址
   * @param params 拼接在请求地址路径后面的参数，根据实际情况也可能不需要。
   * @param data 放置在 RequestBody 中的数据，根据实际情况也可能不需要
   * @param config 当前请求对 axios 特殊设置
   * @returns
   */
  public postWithParams<T = any, D = any>(
    url: string,
    params: Record<string, any>,
    data = {} as D,
    options = { contentType: ContentTypeEnum.JSON },
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosHttpResult<T>> {
    return this.process<T, D>(
      url,
      {
        ...config,
        params,
        data,
        method: HttpMethodEnum.POST,
      },
      options,
    );
  }

  /**
   * PUT。更新操作。
   *
   * 针对 url 中有参数同时 request body 中也有数据的情况。额外增加一个方法，以防对现有的代码产生影响。
   *
   * <T> 返回响应中实际 data 中的内容类型
   * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
   *
   * @param url 请求地址
   * @param data 放置在 RequestBody 中的数据
   * @param options 对当前请求设置的参数。
   * @param config 当前请求对 axios 特殊设置
   * @returns 响应数据
   */
  public put<T = any, D = any>(
    url: string,
    data: D,
    options = { contentType: ContentTypeEnum.JSON },
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosHttpResult<T>> {
    return this.process<T, D>(
      url,
      {
        ...config,
        data,
        method: HttpMethodEnum.PUT,
      },
      options,
    );
  }

  /**
   * PUT。更新操作。
   *
   * 针对 url 中有参数同时 request body 中也有数据的情况。额外增加一个方法，以防对现有的代码产生影响。
   *
   * <T> 返回响应中实际 data 中的内容类型
   * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
   *
   * @param url 请求地址
   * @param data 放置在 RequestBody 中的数据
   * @param options 对当前请求设置的参数。
   * @param config 当前请求对 axios 特殊设置
   * @returns 响应数据
   */
  public putWithParams<T = any, D = any>(
    url: string,
    params: Record<string, any>,
    data = {} as D,
    options = { contentType: ContentTypeEnum.JSON },
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosHttpResult<T>> {
    return this.process<T, D>(
      url,
      {
        ...config,
        params,
        data,
        method: HttpMethodEnum.PUT,
      },
      options,
    );
  }

  /**
   * DELETE。删除操作
   *
   * <T> 返回响应中实际 data 中的内容类型
   * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
   *
   * @param url 请求地址
   * @param params 拼接在请求地址路径后面的参数，根据实际情况也可能不需要。
   * @param data 放置在 RequestBody 中的数据，根据实际情况也可能不需要
   * @param options 对当前请求设置的参数。
   * @returns 响应数据
   */
  public delete<T = any, D = any>(
    url: string,
    data = {} as D,
    options = { contentType: ContentTypeEnum.JSON },
  ): Promise<AxiosHttpResult<T>> {
    return this.process<T, D>(
      url,
      {
        data,
        method: HttpMethodEnum.DELETE,
      },
      options,
    );
  }

  /**
   * DELETE。删除操作
   *
   * 针对 url 中有参数同时 request body 中也有数据的情况。额外增加一个方法，以防对现有的代码产生影响。
   *
   * <T> 返回响应中实际 data 中的内容类型
   * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
   *
   * @param url 请求地址
   * @param params 拼接在请求地址路径后面的参数，根据实际情况也可能不需要。
   * @param data 放置在 RequestBody 中的数据，根据实际情况也可能不需要
   * @param options 对当前请求设置的参数。
   * @returns 响应数据
   */
  public deleteWithParams<T = any, D = any>(
    url: string,
    params: Record<string, any>,
    data = {} as D,
    options = { contentType: ContentTypeEnum.JSON },
  ): Promise<AxiosHttpResult<T>> {
    return this.process<T, D>(
      url,
      {
        params,
        data,
        method: HttpMethodEnum.DELETE,
      },
      options,
    );
  }
}
