import { ConstantDictionary } from '../declarations';
import { _lib, _constants } from './base';

export class Token {
    private static instance = new Token();

    private constructor() {}

    public static getInstance(): Token {
        return this.instance;
    }

    private db = _lib._localForage;

    public async set(token: string, expiresIn: number): Promise<void> {
        const expires = _lib.moment().add(expiresIn, 'seconds').valueOf();
        await this.db.setItem(_constants.AUTHORIZATION_KEY_TOKEN, token);
        await this.db.setItem(_constants.AUTHORIZATION_KEY_EXPIRES, expires);
    }

    public get(): Promise<string | null> {
        return this.db.getItem(_constants.AUTHORIZATION_KEY_TOKEN);
    }

    public async expires(): Promise<number | null> {
        return await this.db.getItem(_constants.AUTHORIZATION_KEY_EXPIRES);
    }

    public remove(key: string): void {
        this.db.removeItem(key);
    }
    public clear(): Promise<void> {
        return this.db.clear();
    }

    public isNotExpired(expires: number | null, bufferTime = 60): boolean {
        if (expires) {
            const flag = _lib.moment(expires).diff(_lib.moment(), 'seconds');
            return flag >= bufferTime;
        } else {
            return false;
        }
    }
}

export const _token: Token = Token.getInstance();

export class Session {
    private static instance = new Session();

    private constructor() {}

    public static getInstance(): Session {
        return this.instance;
    }

    private db = _lib._localForage;

    public async set(sessionId: string): Promise<void> {
        await this.db.setItem(_constants.AUTHORIZATION_KEY_SESSION, sessionId);
    }

    public get(): Promise<string | null> {
        return this.db.getItem(_constants.AUTHORIZATION_KEY_SESSION);
    }
}

export const _session: Session = Session.getInstance();

export class Aes {
    private static instance = new Aes();

    private constructor() {}

    public static getInstance(): Aes {
        return this.instance;
    }

    private db = _lib._localForage;
    private secretKey = _constants.LOCAL_SECRET_KEY;

    public async set(aesKey: string): Promise<void> {
        if (this.secretKey) {
            const value = _lib._aes.encrypt(this.secretKey, aesKey);
            await this.db.setItem(_constants.AUTHORIZATION_KEY_SECRET_KEY, value);
        }
    }

    public get(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.db
                .getItem(_constants.AUTHORIZATION_KEY_SECRET_KEY)
                .then((value) => {
                    if (value) {
                        const aesKey = _lib._aes.decrypt(this.secretKey, value);
                        if (aesKey) {
                            resolve(aesKey);
                        }
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    public decrypt(content: unknown): Promise<string> {
        return new Promise((resolve, reject) => {
            this.get()
                .then((aesKey) => {
                    if (aesKey) {
                        const value = _lib._aes.decrypt(aesKey, content);
                        resolve(value);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    public encrypt(content: unknown): Promise<string> {
        return new Promise((resolve, reject) => {
            this.get()
                .then((aesKey) => {
                    if (aesKey) {
                        const value = _lib._aes.encrypt(aesKey, content);
                        resolve(value);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

export const _aes: Aes = Aes.getInstance();

export class Enums {
    private static instance = new Enums();

    private constructor() {}

    public static getInstance(): Enums {
        return this.instance;
    }

    private db = _lib._localForage;

    public get(): Promise<string | null> {
        return this.db.getItem(_constants.ENUMS);
    }
    public set(value: Dictionary<ConstantDictionary[]>): Promise<string> {
        return this.merge(value);
    }

    public async merge(value: Dictionary<ConstantDictionary[]>): Promise<string> {
        let enums = {};
        const constants = await this.get();
        if (constants) {
            const dataObject = JSON.parse(constants);
            enums = Object.assign(dataObject, value);
        } else {
            enums = value;
        }

        return this.db.setItem(_constants.ENUMS, JSON.stringify(enums));
    }

    public getItem(name: string): Promise<ConstantDictionary[]> {
        return new Promise((resolve, reject) => {
            this.get()
                .then((constants) => {
                    if (constants) {
                        const dataObject = JSON.parse(constants);
                        if (!_lib.lodash.isEmpty(dataObject)) {
                            resolve(dataObject[name]);
                        }
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

export const _enums: Enums = Enums.getInstance();
