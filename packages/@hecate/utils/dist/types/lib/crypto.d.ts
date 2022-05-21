declare class AES {
    private static instance;
    private constructor();
    static getInstance(): AES;
    private default_key;
    encrypt(content: unknown, key: string): string;
    decrypt(content: unknown, key: string): string;
}
export declare const _aes: AES;
declare class RSA {
    private static instance;
    private constructor();
    static getInstance(): RSA;
    create(): RSAPair;
    encrypt(content: any, publicKey: string): string;
    decrypt(content: string, privateKey: string): any;
}
export declare const _rsa: RSA;
declare class SM2Utilities {
    private static instance;
    private cipherMode;
    private constructor();
    static getInstance(): SM2Utilities;
    createKeyPair(): import("sm-crypto").KeyPairHex;
    encrypt(content: string, publicKey: string): string;
    decrypt(content: string, privateKey: string): string;
}
declare class SM4Utilities {
    private static instance;
    private constructor();
    static getInstance(): SM4Utilities;
    encrypt(content: string, publicKey: string): string;
    decrypt(content: string, privateKey: string): string;
}
export declare const SM2Utils: SM2Utilities;
export declare const SM4Utils: SM4Utilities;
export {};
//# sourceMappingURL=crypto.d.ts.map