import { sm2 } from 'sm-crypto-v2';
import { Base64 } from 'js-base64';
declare class SM2Utilities {
    private static instance;
    private cipherMode;
    private constructor();
    static getInstance(): SM2Utilities;
    createKeyPair(): sm2.KeyPair;
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
export { Base64 };
