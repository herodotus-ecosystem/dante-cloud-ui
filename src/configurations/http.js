/**
 * axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from "axios";
import $qs from "qs";
import {
    storage,
    storageSync,
    authrization,
    notify,
    swal,
    moment,
    utils,
} from "./utils";

const logout = (title, text, type) => {
    swal.fire({
        title: title,
        text: text,
        icon: type,
        showClass: true,
        confirmButtonText: "已阅!",
        willClose: () => {
            utils.auth.logout();
        },
    });
};

// 请求超时时间
// 创建axios实例
const instance = axios.create({
    timeout: 1000 * 15,
});

/**
 * 登录流程控制中，根据本地是否存在token判断用户的登录情况
 * 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
 * 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
 * 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
 *
 * localforage获取数据为异步，为了防止token没有拿到，请求就发出去的情况修改为以下方式
 */

instance.interceptors.request.use(
    async (config) => {
        let token = await storage.getItem("token");
        if (token) {
            // 让每个请求携带自定义 token 请根据实际情况自行修改
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    (response) => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response.status === 200 || response.status === 204) {
            return Promise.resolve(responseHandler(response));
        } else {
            return Promise.reject(responseHandler(response));
        }
    },
    (error) => {
        const { response } = error;
        if (!response) {
            logout("平台错误!", "响应超时，请稍后再试！", "error");
            return Promise.reject(response);
        } else {
            let message = response.data.message
                ? response.data.message
                : response.data.data;
            let status = response.status;
            switch (status) {
                case 401: // 401: 未登录状态，跳转登录页
                    notify.error(message);
                    break;
                case 403: // 403 token过期。清除token并跳转登录页
                    logout(
                        "认证失效!",
                        "登录认证已过期，请重新登录！",
                        "warning"
                    );
                    break;
                case 404: // 404请求不存在
                    notify.warning("请求的资源不存在，可能服务未启动！");
                    break;
                case 503: // 404请求不存在
                    notify.warning("网络抖动，请稍后再试！");
                    break;
                default:
                    notify.error(message);
                    break;
            }
            return Promise.reject(response.data);
        }
    }
);

const header = {
    urlencoded() {
        return {
            headers: { "Content-type": "application/x-www-form-urlencoded" },
        };
    },
    multipart() {
        return { headers: { "Content-type": "multipart/form-data" } };
    },
    text() {
        return { headers: { "Content-type": "text/xml" } };
    },
    json() {
        return { headers: { "Content-type": "application/json" } };
    },
};

const responseHandler = (response) => {
    return response.data ? response.data : response;
};

const assign = (additional, contentType) => {
    let full = { headers: {} };
    full.headers = { ...additional, ...contentType.headers };
    return full;
};

const http = {
    /**
     * 注 : get、delete请求的参数是params(特殊情况可以直接跟在地址后面)，而post、put、patch的参数是data
     * 封装get方法
     */
    get: (url, params = {}) => {
        return new Promise((resolve, reject) => {
            instance
                .get(url, {
                    params: params,
                })
                .then((response) => {
                    resolve(responseHandler(response));
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },

    /**
     * 默认情况下, 不写content-type, 是以json的方式来传递, (Content-Type: application/json;charset=UTF-8)
     * content-type改成x-www-form-urlencoded, 即表单提交方式
     */
    post: (url, data = {}, type = "", additionalHeaders = {}) => {
        console.log({ headers: additionalHeaders });
        console.log(assign(additionalHeaders, header.urlencoded()));
        switch (type) {
            case "urlencoded":
                return new Promise((resolve, reject) => {
                    instance
                        .post(
                            url,
                            $qs.stringify(data, { arrayFormat: "brackets" }),
                            assign(additionalHeaders, header.urlencoded())
                        )
                        .then((response) => {
                            if (response.message) {
                                notify.success(response.message).then(() => {
                                    resolve(response);
                                });
                            } else {
                                resolve(response);
                            }
                        })
                        .catch((error) => {
                            reject(error);
                        });
                });
            case "multipart":
                return new Promise((resolve, reject) => {
                    instance
                        .post(
                            url,
                            data,
                            assign(additionalHeaders, header.multipart())
                        )
                        .then((response) => {
                            if (response.message) {
                                notify.success(response.message).then(() => {
                                    resolve(response);
                                });
                            } else {
                                resolve(response);
                            }
                        })
                        .catch((error) => {
                            reject(error);
                        });
                });
            default:
                return new Promise((resolve, reject) => {
                    instance
                        .post(
                            url,
                            JSON.stringify(data),
                            assign(additionalHeaders, header.json())
                        )
                        .then((response) => {
                            if (response.message) {
                                notify.success(response.message).then(() => {
                                    resolve(response);
                                });
                            } else {
                                resolve(response);
                            }
                        })
                        .catch((error) => {
                            reject(error);
                        });
                });
        }
    },

    /**
     * 封装delete请求
     */
    delete: (url, data = {}) => {
        return new Promise((resolve, reject) => {
            swal.fire({
                title: "确定删除?",
                text: "您将无法恢复此操作！",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "是的, 删除!",
                cancelButtonText: "取消",
            }).then((confirm) => {
                if (confirm.value) {
                    instance
                        .delete(url, { data: data })
                        .then((response) => {
                            if (
                                response.status === 200 ||
                                response.status === 204
                            ) {
                                let message = response.message
                                    ? response.message
                                    : "所选数据已成功删除.";
                                swal.fire("已删除!", message, "success");
                                resolve(response);
                            }
                        })
                        .catch((error) => {
                            let message = error.message
                                ? error.message
                                : "所选数据删除失败.";
                            swal.fire("删除失败!", message, "error");
                            reject(error);
                        });
                }
            });
        });
    },

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
    put: (url, data = {}, type = "") => {
        if (type && type === "urlencoded") {
            return new Promise((resolve, reject) => {
                instance
                    .put(
                        url,
                        $qs.stringify(data, { arrayFormat: "brackets" }),
                        header.urlencoded()
                    )
                    .then((response) => {
                        notify.success("操作成功！");
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        } else {
            return new Promise((resolve, reject) => {
                instance
                    .put(url, JSON.stringify(data), header.json())
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        }
    },
};

export {
    header,
    http,
    axios,
    storage,
    storageSync,
    authrization,
    notify,
    swal,
    moment,
    utils,
};
