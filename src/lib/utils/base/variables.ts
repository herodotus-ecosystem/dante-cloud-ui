class EnvironmentVariable {
	private static PROJECT: string = import.meta.env.VITE_PROJECT;
	private static PROJECT_NAME: string = import.meta.env.VITE_PROJECT_NAME;
	private static API_URL: string = import.meta.env.VITE_API_URL;
	private static CAPTCHA: string = import.meta.env.VITE_CAPTCHA;
	private static SECRET_KEY: string = import.meta.env.VITE_SECRET_KEY;
	private static USE_CRYPTO: boolean = import.meta.env.VITE_USE_CRYPTO;
	private static CLIENT_ID: string = import.meta.env.VITE_OAUTH2_CLIENT_ID;
	private static CLIENT_SECRET: string = import.meta.env.VITE_OAUTH2_CLIENT_SECRET;
	private static GRANT_TYPE: string = import.meta.env.VITE_OAUTH2_GRANT_TYPE;

	private static instance = new EnvironmentVariable();

	public static getInstance(): EnvironmentVariable {
		return this.instance;
	}

	private constructor() {}

	public getCaptcha(): string {
		return EnvironmentVariable.CAPTCHA;
	}

	public getProject(): string {
		return EnvironmentVariable.PROJECT;
	}

	public getSecretKey(): string {
		return EnvironmentVariable.SECRET_KEY;
	}

	public isUseCrypto(): boolean {
		return EnvironmentVariable.USE_CRYPTO;
	}

	public getClientId(): string {
		return EnvironmentVariable.CLIENT_ID;
	}

	public getClientSecret(): string {
		return EnvironmentVariable.CLIENT_SECRET;
	}

	public getGrantType(): string {
		return EnvironmentVariable.GRANT_TYPE;
	}

	public getApiUrl(): string {
		return EnvironmentVariable.API_URL;
	}

	public getProjectName(): string {
		return EnvironmentVariable.PROJECT_NAME;
	}
}

export const variables: EnvironmentVariable = EnvironmentVariable.getInstance();
