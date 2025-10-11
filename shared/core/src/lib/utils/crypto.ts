import { sm2, sm4 } from 'sm-crypto-v2';
import { Base64 } from 'js-base64';

class SM2Utilities {
  private static instance = new SM2Utilities();
  private cipherMode = 1; // 1 - C1C3C2，0 - C1C2C3

  private constructor() {}

  public static getInstance(): SM2Utilities {
    return this.instance;
  }

  public createKeyPair(): sm2.KeyPair {
    return sm2.generateKeyPairHex();
  }

  public encrypt(content: string, publicKey: string): string {
    return '04' + sm2.doEncrypt(content, publicKey, this.cipherMode);
  }

  public decrypt(content: string, privateKey: string): string {
    let data = content.substring(2).toLocaleLowerCase();
    return sm2.doDecrypt(data, privateKey, this.cipherMode, { output: 'string' });
  }
}

class SM4Utilities {
  private static instance = new SM4Utilities();

  private constructor() {}

  public static getInstance(): SM4Utilities {
    return this.instance;
  }

  public encrypt(content: string, publicKey: string): string {
    return sm4.encrypt(content, publicKey, { output: 'string' });
  }

  public decrypt(content: string, privateKey: string): string {
    return sm4.decrypt(content, privateKey, { output: 'string' });
  }
}

export const SM2Utils = SM2Utilities.getInstance();
export const SM4Utils = SM4Utilities.getInstance();
export { Base64 };
