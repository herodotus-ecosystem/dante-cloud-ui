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
        return this.db.setItem(_constants.ENUMS, JSON.stringify(value));
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
