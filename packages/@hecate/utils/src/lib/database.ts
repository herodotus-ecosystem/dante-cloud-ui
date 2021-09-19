import { default as localforage } from 'localforage';

/**
 * 这里使用单例模式，主要是因为将静态类，赋值给Vue.prototype会出现 Property '' is a static member of type '' 错误。
 * 参考以下文章
 * {@see https://techformist.com/static-variables-methods-typescript/}
 * {@see https://www.xspdf.com/resolution/54250655.html}
 * {@see https://www.typescriptlang.org/docs/handbook/classes.html#static-properties}
 *
 * 单例模式饿汉式与懒汉式
 * {@see https://zhuanlan.zhihu.com/p/129264092}
 */
class LocalForage {
    private static instance = new LocalForage();

    private constructor() {}

    public static getInstance(): LocalForage {
        return this.instance;
    }

    /**
     * 参考https://github.com/localForage/localForage/blob/master/typings/localforage.d.ts
     *
     * @param key
     */
    public getItem<T>(key: string): Promise<T | null> {
        return localforage.getItem<T>(key);
    }

    public setItem<T>(key: string, value: T): Promise<T> {
        return localforage.setItem<T>(key, value);
    }

    public removeItem(key: string): Promise<void> {
        return localforage.removeItem(key);
    }

    public clear(): Promise<void> {
        return localforage.clear();
    }

    public length(): Promise<number> {
        return localforage.length();
    }

    public key(keyIndex: number): Promise<string> {
        return localforage.key(keyIndex);
    }

    public keys(): Promise<string[]> {
        return localforage.keys();
    }
    public iterate<T, U>(iteratee: (value: T, key: string, iterationNumber: number) => U): Promise<U> {
        return localforage.iterate<T, U>(iteratee);
    }

    public setDriver(driver: string | string[]): Promise<void> {
        return localforage.setDriver(driver);
    }

    public config(options: LocalForageOptions): boolean {
        return localforage.config(options);
    }

    public createInstance(options: LocalForageOptions): LocalForage {
        return localforage.createInstance(options);
    }
}

export const _localForage: LocalForage = LocalForage.getInstance();

class LocalStorage {
    private static instance = new LocalStorage();

    private constructor() {}

    public static getInstance(): LocalStorage {
        return this.instance;
    }

    public setObject<T>(key: string, value: T): void {
        this.setItem(key, JSON.stringify(value));
    }

    public getObject<T>(key: string): T | null {
        const result = this.getItem(key);
        if (result) {
            return <T>JSON.parse(result);
        }
        return null;
    }

    public setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }
    public getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    public removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    public clear(): void {
        localStorage.clear();
    }

    public isExist(key: string): boolean {
        if (key && key in localStorage) {
            return true;
        } else {
            return false;
        }
    }
}

export const _localStorage: LocalStorage = LocalStorage.getInstance();
