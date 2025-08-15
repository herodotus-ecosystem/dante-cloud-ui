import { Base64 } from 'js-base64';
declare class SM2Utilities {
    private static instance;
    private cipherMode;
    private constructor();
    static getInstance(): SM2Utilities;
    createKeyPair(): any;
    encrypt(content: string, publicKey: string): string;
    decrypt(content: string, privateKey: string): any;
}
declare class SM4Utilities {
    private static instance;
    private constructor();
    static getInstance(): SM4Utilities;
    encrypt(content: string, publicKey: string): any;
    decrypt(content: string, privateKey: string): any;
}
export declare const SM2Utils: SM2Utilities;
export declare const SM4Utils: SM4Utilities;
export { Base64 };
