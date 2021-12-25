import axios, {
    AxiosResponse,
    AxiosRequestConfig,
    AxiosInstance,
    AxiosError,
    CancelTokenStatic,
    Canceler,
} from 'axios';
import qs from 'qs';
import { _lib } from './base';
import { _action } from './dispatch';
import { _token, _session } from './repository';
import { RestResponse } from '@/lib/declarations';

interface HttpRequestType {
    config: AxiosRequestConfig;
    serializer: (params: Record<string, any>) => any;
}

interface Pending {
    url: string;
    cancel: Canceler;
}

export enum HttpContentType {
    URL_ENCODED,
    MULTI_PART,
    TEXT,
    JSON,
}

class Request {
    private service: AxiosInstance;
    protected pending: Array<Pending> = [];
    protected cancelToken: CancelTokenStatic = axios.CancelToken;

    private static _instance: Request;

    // 构造函数 初始化工作
    private constructor() {
        this.service = this.createAxiosInstance();
        this.interceptorsRequest();
        this.interceptorsResponse();
    }

    public static getInstance(): Request {
        // 如果 instance 是一个实例 直接返回，  如果不是 实例化后返回
        this._instance || (this._instance = new Request());
        return this._instance;
    }

    private createAxiosInstance(): AxiosInstance {
        // axios.defaults.withCredentials = true;
        return axios.create({
            timeout: 1000 * 12,
        });
    }

    private logResponse(response: AxiosResponse): void {
        if (process.env.NODE_ENV === 'development') {
            const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(
                Math.random() * 255
            )},${Math.round(Math.random() * 255)})`;
            console.log(
                '%c┍------------------------------------------------------------------------------------------┑',
                `color:${randomColor};`
            );
            console.log('| 请求地址：', response.config.url);
            console.log('| 请求类型：', _lib.lodash.toUpper(response.config.method));
            console.log('| 请求参数：', qs.parse(response.config.params));
            console.log('| 响应数据：', response.data);
            console.log(
                '%c┕------------------------------------------------------------------------------------------┙',
                `color:${randomColor};`
            );
        }
    }

    protected interceptorsRequest(): void {
        this.service.interceptors.request.use(
            async (config: AxiosRequestConfig) => {
                const token = await _token.get();
                if (token) {
                    // 让每个请求携带自定义 token 请根据实际情况自行修改
                    config.headers.Authorization = 'Bearer ' + token;
                }

                const sessionId = await _session.get();
                if (sessionId) {
                    config.headers['X-Herodotus-Session'] = sessionId;
                }
                return config;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );
    }

    private isSuccess(status: number): boolean {
        //=>自定义成功失败规则：RESOLVE / REJECT（默认规则：状态码以2开头算作成功）
        return /^(2|3)\d{2}$/.test(String(status));
    }

    private responseHandler<T>(response: AxiosResponse<RestResponse<T>>): RestResponse<T> {
        return response.data;
    }

    private responseMessageHandler<T>(response: AxiosResponse<unknown>, message?: string): string | T {
        const data = response.data as RestResponse<T>;
        if (data.message) {
            return data.message;
        } else {
            if (data.error && data.error.message) {
                return data.error.message;
            } else {
                if (message) {
                    return message;
                } else {
                    return '';
                }
            }
        }
    }

    protected interceptorsResponse(): void {
        this.service.interceptors.response.use(
            (response: AxiosResponse) => {
                this.logResponse(response);
                // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
                // 否则的话抛出错误
                if (this.isSuccess(response.status)) {
                    return Promise.resolve(response);
                } else {
                    return Promise.reject(response);
                }
            },
            (error: AxiosError) => {
                const { response, message } = error;
                console.log('[EUI] |- ' + message);
                if (!response) {
                    _action.signoutDialog('网络错误!', '响应超时，请稍后再试！', 'error');
                    return Promise.reject(error);
                } else {
                    const message = this.responseMessageHandler<string>(response);
                    const status = response.status;
                    const code = response.data && response.data.code ? response.data.code : '';
                    switch (status) {
                        case 401: // 401: 未登录状态，跳转登录页
                            break;
                        case 404: // 404请求不存在
                            _lib._notify.warning('请求的资源不存在，可能服务未启动！');
                            break;
                        case 406: // 412 token过期。清除token并跳转登录页
                            if (!(code && code >= 40606)) {
                                _lib._notify.error(message);
                            }
                            break;
                        case 412: // 412 token过期。清除token并跳转登录页
                            if (!code || code === 41201) {
                                _action.signoutDialog('认证失效!', '登录认证已过期，请重新登录！', 'warning');
                            }
                            break;
                        case 500: // 404请求不存在
                            if (message) {
                                _lib._notify.error(message);
                            } else {
                                _lib._notify.error('系统错误，请稍后再试！或者联系管理员');
                            }

                            break;
                        case 503: // 404请求不存在
                            _lib._notify.warning('网络抖动，请稍后再试！');
                            break;
                        case 504:
                            _lib._notify.error(message);
                            break;
                        default:
                            _lib._notify.error(message);
                            break;
                    }
                    return Promise.reject(response.data);
                }
            }
        );
    }

    private getHttpRequestType(type: HttpContentType): HttpRequestType {
        let requestType: HttpRequestType = {
            config: { headers: {} },
            serializer: function (params) {
                return params;
            },
        };
        switch (type) {
            case HttpContentType.URL_ENCODED:
                requestType = {
                    config: {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    },
                    serializer: function (params: unknown) {
                        return qs.stringify(params, { arrayFormat: 'brackets' });
                    },
                };
                break;
            case HttpContentType.MULTI_PART:
                requestType = {
                    config: {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    },
                    serializer: function (params: unknown) {
                        return params;
                    },
                };
                break;
            default:
                requestType = {
                    config: {
                        headers: { 'Content-Type': 'application/json' },
                    },
                    serializer: function (params: unknown) {
                        return JSON.stringify(params);
                    },
                };
                break;
        }

        return requestType;
    }

    /**
     * 注 : get、delete请求的参数是params(特殊情况可以直接跟在地址后面)，而post、put、patch的参数是data
     * 封装get方法
     */
    public get<T>(url: string, params = {}): Promise<RestResponse<T>> {
        return new Promise<RestResponse<T>>((resolve, reject) => {
            this.service
                .get<RestResponse<T>>(url, {
                    params,
                })
                .then((response) => {
                    resolve(this.responseHandler<T>(response));
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * 默认情况下, 不写content-type, 是以json的方式来传递, (Content-Type: application/json;charset=UTF-8)
     * content-type改成x-www-form-urlencoded, 即表单提交方式
     */
    public post<T>(
        url: string,
        data = {},
        type = HttpContentType.JSON,
        hide = false,
        headers = {}
    ): Promise<RestResponse<T>> {
        const requestType = this.getHttpRequestType(type);
        Object.assign(requestType.config.headers, headers);
        return new Promise<RestResponse<T>>((resolve, reject) => {
            this.service
                .post<RestResponse<T>>(url, requestType.serializer(data), requestType.config)
                .then((response) => {
                    const message = this.responseMessageHandler<T>(response);
                    if (message && !hide) {
                        _lib._notify.success(message as string).then(() => {
                            resolve(this.responseHandler(response));
                        });
                    } else {
                        resolve(this.responseHandler(response));
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    /**
     * 封装delete请求
     */
    public delete<T>(url: string, data = {}): Promise<RestResponse<T>> {
        return new Promise<RestResponse>((resolve, reject) => {
            _lib.Swal.fire({
                title: '确定删除?',
                text: '您将无法恢复此操作！',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '是的, 删除!',
                cancelButtonText: '取消',
            }).then((confirm: _lib.SweetAlertResult) => {
                if (confirm.value) {
                    this.service
                        .delete<RestResponse<T>>(url, data)
                        .then((response) => {
                            if (this.isSuccess(response.status)) {
                                const message = this.responseMessageHandler<T>(response, '所选数据已成功删除.');
                                _lib.Swal.fire('已删除!', message as string, 'success');
                                resolve(this.responseHandler(response));
                            }
                        })
                        .catch((error) => {
                            const message = error.message ? error.message : '所选数据删除失败.';
                            _lib.Swal.fire('删除失败!', message, 'error');
                            reject(error);
                        });
                }
            });
        });
    }

    /**
     * 默认非JSON提交的参数如下：
     * a[0]: 1,
     * a[1]: 2,
     * a[2]: 3
     *
     * 后端需要的的参数格式：
     * a[]: 1,
     * a[]: 2,
     * a[]: 3
     *
     * 使用qs对字符串进行序列化默认格式：
     * qs.stringify({ a: [1, 2, 3] });
     * // 'a[0]=1&a[1]=2&a[2]=3'
     *
     * 通过设置indices为false可以实现如下效果
     * qs.stringify({ a: [1, 2, 3] }, { indices: false });
     * // 'a=1&a=2&a=3'
     *
     * 而我们后端希望的数据格式，可以通过arrayformat来实现：
     * qs.stringify({ a: [1, 2, 3 ] }, { arrayFormat: 'indices' });
     * // 'a[0]=1&a[1]=2&a[2]=3'
     * qs.stringify( { a: [1, 2, 3 ]} , { arrayFormat: 'brackets' });
     * // 'a[]=1&a[]=2&a[]=3'
     * qs.stringify( {a: [1, 2, 3 ]}, { arrayFormat: 'repeat' } );
     * // 'a=1&a=2&a=3'
     */
    public put<T>(url: string, data = {}, type: HttpContentType): Promise<RestResponse<T>> {
        const requestType = this.getHttpRequestType(type);
        return new Promise<RestResponse<T>>((resolve, reject) => {
            this.service
                .put<RestResponse<T>>(url, requestType.serializer(data), requestType.config)
                .then((response) => {
                    _lib._notify.success('操作成功！');
                    resolve(this.responseHandler(response));
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

const _http: Request = Request.getInstance();

export { _http };
