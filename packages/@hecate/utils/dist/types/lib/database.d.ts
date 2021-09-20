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
declare class LocalForage {
    private static instance;
    private constructor();
    static getInstance(): LocalForage;
    /**
     * 参考https://github.com/localForage/localForage/blob/master/typings/localforage.d.ts
     *
     * @param key
     */
    getItem<T>(key: string): Promise<T | null>;
    setItem<T>(key: string, value: T): Promise<T>;
    removeItem(key: string): Promise<void>;
    clear(): Promise<void>;
    length(): Promise<number>;
    key(keyIndex: number): Promise<string>;
    keys(): Promise<string[]>;
    iterate<T, U>(iteratee: (value: T, key: string, iterationNumber: number) => U): Promise<U>;
    setDriver(driver: string | string[]): Promise<void>;
    config(options: LocalForageOptions): boolean;
    createInstance(options: LocalForageOptions): LocalForage;
}
export declare const _localForage: LocalForage;
declare class LocalStorage {
    private static instance;
    private constructor();
    static getInstance(): LocalStorage;
    setObject<T>(key: string, value: T): void;
    getObject<T>(key: string): T | null;
    setItem(key: string, value: string): void;
    getItem(key: string): string | null;
    removeItem(key: string): void;
    clear(): void;
    isExist(key: string): boolean;
}
export declare const _localStorage: LocalStorage;
export {};
//# sourceMappingURL=database.d.ts.map