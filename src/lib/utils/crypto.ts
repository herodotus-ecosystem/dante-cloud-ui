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
		return '04' + sm2.doEncrypt(content, publicKey, this.cipherMode);
	}

	public decrypt(content: string, privateKey: string) {
		let data = content.substring(2).toLocaleLowerCase();
		return sm2.doDecrypt(data, privateKey, this.cipherMode);
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
		return sm4.doDecrypt(content, privateKey);
	}
}

export const SM2Utils = SM2Utilities.getInstance();
export const SM4Utils = SM4Utilities.getInstance();
