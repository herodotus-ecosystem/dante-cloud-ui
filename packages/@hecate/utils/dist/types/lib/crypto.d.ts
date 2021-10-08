declare class AES {
    private static instance;
    private constructor();
    static getInstance(): AES;
    private default_key;
    encrypt(key: string, content: unknown): string;
    decrypt(key: string, content: unknown): string;
}
export declare const _aes: AES;
declare class RSA {
    private static instance;
    private constructor();
    static getInstance(): RSA;
    create(): RSAPair;
    encrypt(publicKey: string, content: any): string;
    decrypt(privateKey: string, content: string): any;
}
export declare const _rsa: RSA;
export {};
//# sourceMappingURL=crypto.d.ts.map