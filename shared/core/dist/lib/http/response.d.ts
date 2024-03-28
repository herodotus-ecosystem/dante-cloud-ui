import { AxiosResponse, ResponseStatus } from '../../declarations';

export declare const parseResponseStatus: (response: AxiosResponse<any>, message?: string) => ResponseStatus;
