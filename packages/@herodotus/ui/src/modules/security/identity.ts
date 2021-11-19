import { RestResponse } from '@/lib/declarations';
import { SweetAlertResult } from 'sweetalert2';
import { _token, _lib, _router, _http, _constants, HttpContentType, _session, _aes } from '@/lib/utils';

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
const SECURE_SESSION = _constants.UAA_ADDRESS + '/open/identity/session';
const SECURE_EXCHANGE = _constants.UAA_ADDRESS + '/open/identity/exchange';

export class Authorization {
    private static instance = new Authorization();

    private constructor() {}

    public static getInstance(): Authorization {
        return this.instance;
    }

    public signin(username: string, password: string): Promise<RestResponse> {
        console.log('Authorization signin');
        return _http.post(
            OAUTH_TOKEN,
            {
                username: username,
                password: password,
                grant_type: GRANT_TYPE,
                scope: 'all',
            },
            HttpContentType.URL_ENCODED,
            true,
            {
                Authorization: 'Basic ' + _lib.Base64.encode(CLIENT_ID + ':' + CLIENT_SECRET),
            }
        );
    }
    public signout(token: string): Promise<RestResponse> {
        return _http.get(OAUTH_SIGNOUT, { access_token: token });
    }

    public getSession(sessionId = ''): Promise<RestResponse> {
        return _http.post(
            SECURE_SESSION,
            {
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                sessionId: sessionId,
            },
            HttpContentType.JSON,
            true
        );
    }

    public exchange(sessionId: string, confidential: string): Promise<RestResponse> {
        return _http.post(
            SECURE_EXCHANGE,
            {
                confidential: confidential,
                sessionId: sessionId,
            },
            HttpContentType.JSON,
            true
        );
    }
}

export const _authorization: Authorization = Authorization.getInstance();

export class Identity {
    private static instance = new Identity();

    private constructor() {}

    public static getInstance(): Identity {
        return this.instance;
    }

    public exchangeAesKey(sessionKey = ''): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            _authorization
                .getSession(sessionKey)
                .then((response) => {
                    if (response.data) {
                        const sessionId = response.data.sessionId;
                        const backendPublicKey = response.data.publicKey;
                        const rsa = _lib._rsa.create();
                        const encryptedPublicKey = _lib._rsa.encrypt(backendPublicKey, rsa.publicKey);
                        _authorization.exchange(sessionId, encryptedPublicKey).then((result) => {
                            if (result.data) {
                                const confidential = result.data;
                                const aesKey = _lib._rsa.decrypt(rsa.privateKey, confidential);
                                _aes.set(aesKey);
                                _session.set(sessionId);
                                resolve(aesKey);
                            }
                        });
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    public async signin(username: string, password: string): Promise<RestResponse> {
        const aesUsername = await _aes.encrypt(username);
        const aesPassword = await _aes.encrypt(password);
        return new Promise<RestResponse>((resolve, reject) => {
            _authorization
                .signin(aesUsername, aesPassword)
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
                            _token.clear();
                            _router.signin();
                        });
                    }
                });
            }
        });
    }
}

export const _identity: Identity = Identity.getInstance();
