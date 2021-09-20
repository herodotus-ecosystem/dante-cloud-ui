import { RestResponse } from '@/lib/declarations';
import { Base64 } from 'js-base64';
import { SweetAlertResult } from 'sweetalert2';
import { _token, _lib, _router, _http, _constants, HttpContentType } from '@/lib/utils';

/**
 * 获取Token基本参数
 */
const CLIENT_ID = process.env.VUE_APP_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.VUE_APP_OAUTH_CLIENT_SECRET;
const GRANT_TYPE = process.env.VUE_APP_OAUTH_GRANT_TYPE;
/**
 * OAuth2基础操作
 */
const OAUTH_TOKEN = _constants.UAA_ADDRESS + '/oauth/token';
const OAUTH_SIGNOUT = _constants.UAA_ADDRESS + '/open/identity/logout';
export class Authorization {
    private static instance = new Authorization();

    private constructor() {}

    public static getInstance(): Authorization {
        return this.instance;
    }

    public signin(username: string, password: string): Promise<RestResponse> {
        return _http.post(
            OAUTH_TOKEN,
            {
                username: username,
                password: password,
                grant_type: GRANT_TYPE,
                scope: 'all',
            },
            HttpContentType.URL_ENCODED,
            {
                Authorization: 'Basic ' + Base64.encode(CLIENT_ID + ':' + CLIENT_SECRET),
            }
        );
    }
    public signout(token: string): Promise<RestResponse> {
        return _http.get(OAUTH_SIGNOUT, { access_token: token });
    }
}

export const _authorization: Authorization = Authorization.getInstance();

export class Identity {
    private static instance = new Identity();

    private constructor() {}

    public static getInstance(): Identity {
        return this.instance;
    }

    public signin(username: string, password: string): Promise<RestResponse> {
        return new Promise<RestResponse>((resolve, reject) => {
            _authorization
                .signin(username, password)
                .then((response) => {
                    const accessToken = response.access_token;
                    const expiresIn = response.expires_in;
                    if (accessToken && expiresIn != 0) {
                        _token.set(accessToken, expiresIn).then(() => {
                            resolve(response);
                        });
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    public signout(): void {
        _lib.Swal.fire({
            title: '要走了么?',
            text: '您确定要退出系统！',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '是的',
            cancelButtonText: '取消',
        }).then((result: SweetAlertResult) => {
            if (result.value) {
                _token.get().then((token) => {
                    if (token) {
                        _authorization.signout(token).then(() => {
                            _router.signin();
                        });
                    }
                });
            }
        });
    }
}

export const _identity: Identity = Identity.getInstance();
