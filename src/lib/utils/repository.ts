import { ConstantDictionary } from '/@/lib/declarations';
import { localForage } from '/@/lib/core';
import { constants, moment, lodash } from './base';

class Token {
	private static instance = new Token();

	private constructor() {}

	public static getInstance(): Token {
		return this.instance;
	}

	private db = localForage;

	public async set(token: string, expiresIn: number): Promise<void> {
		const expires = moment().add(expiresIn, 'seconds').valueOf();
		await this.db.setItem(constants.AUTHORIZATION_KEY_TOKEN, token);
		await this.db.setItem(constants.AUTHORIZATION_KEY_EXPIRES, expires);
	}

	public async get(): Promise<string | null> {
		return await this.db.getItem(constants.AUTHORIZATION_KEY_TOKEN);
	}

	public async expires(): Promise<number | null> {
		return await this.db.getItem(constants.AUTHORIZATION_KEY_EXPIRES);
	}

	public remove(key: string): void {
		this.db.removeItem(key);
	}
	public clear(): Promise<void> {
		return this.db.clear();
	}

	public isNotExpired(expires: number | null, bufferTime = 60): boolean {
		if (expires) {
			const flag = moment(expires).diff(moment(), 'seconds');
			return flag >= bufferTime;
		} else {
			return false;
		}
	}
}

const token: Token = Token.getInstance();

class Session {
	private static instance = new Session();

	private constructor() {}

	public static getInstance(): Session {
		return this.instance;
	}

	private db = localForage;

	public async set(sessionId: string): Promise<void> {
		await this.db.setItem(constants.AUTHORIZATION_KEY_SESSION, sessionId);
	}

	public async get(): Promise<string | null> {
		return await this.db.getItem(constants.AUTHORIZATION_KEY_SESSION);
	}
}

const session: Session = Session.getInstance();

class SecretKey {
	private static instance = new SecretKey();

	private constructor() {}

	public static getInstance(): SecretKey {
		return this.instance;
	}

	private db = localForage;
	private secretKey = constants.LOCAL_SECRET_KEY;

	public async set(aesKey: string): Promise<void> {
		if (this.secretKey) {
			// const value = aes.encrypt(this.secretKey, aesKey);
			await this.db.setItem(constants.AUTHORIZATION_KEY_SECRET_KEY, aesKey);
		}
	}

	public get(): Promise<string> {
		return new Promise((resolve, reject) => {
			this.db
				.getItem(constants.AUTHORIZATION_KEY_SECRET_KEY)
				.then((value) => {
					// if (value) {
					// 	// const aesKey = aes.decrypt(this.secretKey, value);
					// 	if (value) {
					// 		resolve(aesKey);
					// 	}
					// }
					resolve(value as string);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	public decrypt(content: unknown): Promise<string> {
		return new Promise((resolve, reject) => {
			this.get()
				.then((aesKey) => {
					if (aesKey) {
						// const value = aes.decrypt(aesKey, content);
						resolve(content as string);
					}
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	public encrypt(content: unknown): Promise<string> {
		return new Promise((resolve, reject) => {
			this.get()
				.then((aesKey) => {
					if (aesKey) {
						// const value = aes.encrypt(aesKey, content);
						resolve(content as string);
					}
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
}

const secretKey: SecretKey = SecretKey.getInstance();

class Enums {
	private static instance = new Enums();

	private constructor() {}

	public static getInstance(): Enums {
		return this.instance;
	}

	private db = localForage;

	public get(): Promise<string | null> {
		return this.db.getItem(constants.ENUMS);
	}
	public set(value: Dictionary<ConstantDictionary[]>): Promise<string> {
		return this.merge(value);
	}

	public async merge(value: Dictionary<ConstantDictionary[]>): Promise<string> {
		let enums = {};
		const data = await this.get();
		if (data) {
			const dataObject = JSON.parse(data);
			enums = Object.assign(dataObject, value);
		} else {
			enums = value;
		}

		return this.db.setItem(constants.ENUMS, JSON.stringify(enums));
	}

	public getItem(name: string): Promise<ConstantDictionary[]> {
		return new Promise((resolve, reject) => {
			this.get()
				.then((constants) => {
					if (constants) {
						const dataObject = JSON.parse(constants);
						if (!lodash.isEmpty(dataObject)) {
							resolve(dataObject[name]);
						}
					}
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
}

const enums: Enums = Enums.getInstance();

export { token, session, secretKey, enums };
