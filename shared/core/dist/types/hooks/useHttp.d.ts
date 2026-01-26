import { AxiosHttpResult, CreateAxiosDefaults } from '../declarations';
import { ContentTypeEnum } from '@herodotus-cloud/core';
/**
 * Http 请求 Hooks
 * @param config Axios 实例配置
 * @param headers 请求通用 Headers
 */
export default function useHttp(config?: CreateAxiosDefaults): {
    doGet: <T>(url: string, params?: {}, headers?: Record<string, string>) => Promise<AxiosHttpResult<T>>;
    doPost: <T, D>(url: string, data?: D, contentType?: ContentTypeEnum, params?: {}, headers?: Record<string, string>) => Promise<AxiosHttpResult<T>>;
    doPut: <T, D>(url: string, data?: D, contentType?: ContentTypeEnum, params?: {}) => Promise<AxiosHttpResult<T>>;
    doDelete: <T, D>(url: string, data?: D, contentType?: ContentTypeEnum, params?: {}) => Promise<AxiosHttpResult<T>>;
    createHeaderWithBearer: (token: string, sessionId?: string, tenantId?: string) => Record<string, string>;
    createHeaderWithBasic: (clientId: string, clientSecret: string, sessionId?: string, tenantId?: string) => Record<string, string>;
};
