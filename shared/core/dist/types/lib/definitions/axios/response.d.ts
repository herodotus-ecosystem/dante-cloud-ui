import { AxiosHttpResult, AxiosResponseStatus } from '../../../declarations';
export declare const parseResponseStatus: <T = any>(response: AxiosHttpResult<T>, message?: string) => AxiosResponseStatus;
export declare const logResponse: <T = any>(response: AxiosHttpResult<T>) => void;
export declare const isSuccess: <T = any>(response: AxiosHttpResult<T>) => boolean;
