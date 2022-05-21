import CryptoJS from 'crypto-js';
import NodeRSA from 'node-rsa';

class AES {
    private static instance = new AES();

    private constructor() {}

    public static getInstance(): AES {
        return this.instance;
    }

    private default_key = 'abcd12345sxyzhkj';

    //加密
    public encrypt(content: unknown, key: string): string {
        key = key ? key : this.default_key;
        const _key = CryptoJS.enc.Utf8.parse(key);
        const _srcs = CryptoJS.enc.Utf8.parse(content);
        const encrypted = CryptoJS.AES.encrypt(_srcs, _key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.toString();
    }

    //解密
    public decrypt(content: unknown, key: string): string {
        key = key ? key : this.default_key;
        const _key = CryptoJS.enc.Utf8.parse(key);
        const decrypt = CryptoJS.AES.decrypt(content, _key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }
}

export const _aes: AES = AES.getInstance();

class RSA {
    private static instance = new RSA();

    private constructor() {}

    public static getInstance(): RSA {
        return this.instance;
    }

    public create(): RSAPair {
        const key = new NodeRSA({ b: 512 });
        key.setOptions({ encryptionScheme: 'pkcs1' });
        return { publicKey: key.exportKey('pkcs8-public'), privateKey: key.exportKey('pkcs8-private') };
    }

    public encrypt(content: any, publicKey: string): string {
        const key = new NodeRSA(publicKey, 'pkcs8-public', { encryptionScheme: 'pkcs1' });
        if (content instanceof Object || content instanceof Array) {
            return key.encrypt(JSON.stringify(content), 'base64', 'utf8');
        } else {
            return key.encrypt(new String(content), 'base64', 'utf8');
        }
    }

    public decrypt(content: string, privateKey: string): any {
        const key = new NodeRSA(privateKey, 'pkcs8-private', { encryptionScheme: 'pkcs1' });
        return key.decrypt(content, 'utf8');
    }
}

export const _rsa: RSA = RSA.getInstance();

import { sm2, sm4 } from 'sm-crypto';

class SM2Utilities {
    private static instance = new SM2Utilities();
    private cipherMode = 1; // 1 - C1C3C2，0 - C1C2C3

    private constructor() {}

    public static getInstance(): SM2Utilities {
        return this.instance;
    }

    public createKeyPair() {
        return sm2.generateKeyPairHex();
    }

    public encrypt(content: string, publicKey: string) {
        return '04' + sm2.doEncrypt(content, publicKey, 1);
    }

    public decrypt(content: string, privateKey: string) {
        const data = content.substring(2).toLocaleLowerCase();
        return sm2.doDecrypt(data, privateKey, 1);
    }
}

class SM4Utilities {
    private static instance = new SM4Utilities();

    private constructor() {}

    public static getInstance(): SM4Utilities {
        return this.instance;
    }

    public encrypt(content: string, publicKey: string) {
        return sm4.encrypt(content, publicKey);
    }

    public decrypt(content: string, privateKey: string) {
        return sm4.decrypt(content, privateKey);
    }
}

export const SM2Utils = SM2Utilities.getInstance();
export const SM4Utils = SM4Utilities.getInstance();
