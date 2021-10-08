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
    public encrypt(key: string, content: unknown): string {
        key = key ? key : this.default_key;
        const _key = CryptoJS.enc.Utf8.parse(key);
        const _srcs = CryptoJS.enc.Utf8.parse(content);
        const encrypted = CryptoJS.AES.encrypt(_srcs, _key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.toString();
    }

    //解密
    public decrypt(key: string, content: unknown): string {
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

    public encrypt(publicKey: string, content: any): string {
        const key = new NodeRSA(publicKey, 'pkcs8-public', { encryptionScheme: 'pkcs1' });
        if (content instanceof Object || content instanceof Array) {
            return key.encrypt(JSON.stringify(content), 'base64', 'utf8');
        } else {
            return key.encrypt(new String(content), 'base64', 'utf8');
        }
    }

    public decrypt(privateKey: string, content: string): any {
        const key = new NodeRSA(privateKey, 'pkcs8-private', { encryptionScheme: 'pkcs1' });
        return key.decrypt(content, 'utf8');
    }
}

export const _rsa: RSA = RSA.getInstance();
