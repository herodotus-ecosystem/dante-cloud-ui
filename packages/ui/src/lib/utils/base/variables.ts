class EnvironmentVariable {
  private static API_URL: string = import.meta.env.VITE_API_URL;
  private static WS_URL: string = import.meta.env.VITE_WS_URL;
  private static CAPTCHA: string = import.meta.env.VITE_CAPTCHA;
  private static PROJECT: string = import.meta.env.VITE_PROJECT;
  private static PROJECT_NAME: string = import.meta.env.VITE_PROJECT_NAME;
  private static SECRET_KEY: string = import.meta.env.VITE_SECRET_KEY;
  private static AUTO_REFRESH_TOKEN: string = import.meta.env.VITE_AUTO_REFRESH_TOKEN;
  private static MULTI_TENANCY_ID: string = import.meta.env.VITE_MULTI_TENANCY_ID;
  private static USE_CRYPTO: string = import.meta.env.VITE_USE_CRYPTO;
  private static USE_OIDC: string = import.meta.env.VITE_USE_OIDC;
  private static USE_WEBSOCKET: string = import.meta.env.VITE_USE_WEBSOCKET;
  private static CLIENT_ID: string = import.meta.env.VITE_OAUTH2_CLIENT_ID;
  private static CLIENT_SECRET: string = import.meta.env.VITE_OAUTH2_CLIENT_SECRET;
  private static REDIRECT_URI: string = import.meta.env.VITE_OAUTH2_REDIRECT_URI;

  private static instance = new EnvironmentVariable();

  public static getInstance(): EnvironmentVariable {
    return this.instance;
  }

  private constructor() {}

  private toBoolean(value: string): boolean {
    if (value === 'true') {
      return true;
    } else {
      return false;
    }
  }

  public getCaptcha(): string {
    return EnvironmentVariable.CAPTCHA;
  }

  public getProject(): string {
    const project = window.APPLICATION_ENVIRONMENT_VARIABLES_PROJECT;
    if (project === '' || project === 'dante' || project === 'herodotus') {
      return project;
    } else {
      return EnvironmentVariable.PROJECT;
    }
  }

  public getSecretKey(): string {
    return EnvironmentVariable.SECRET_KEY;
  }

  public getClientId(): string {
    return EnvironmentVariable.CLIENT_ID;
  }

  public getClientSecret(): string {
    return EnvironmentVariable.CLIENT_SECRET;
  }

  public isUseOidc(): boolean {
    return this.toBoolean(EnvironmentVariable.USE_OIDC);
  }

  public isUseWebSocket(): boolean {
    return this.toBoolean(EnvironmentVariable.USE_WEBSOCKET);
  }

  public isUseCrypto(): boolean {
    return this.toBoolean(EnvironmentVariable.USE_CRYPTO);
  }

  public getApiUrl(): string {
    return EnvironmentVariable.API_URL;
  }

  public getWebSocketUrl(): string {
    return EnvironmentVariable.WS_URL;
  }

  public getProjectName(): string {
    return EnvironmentVariable.PROJECT_NAME;
  }

  public getAutoRefreshToken(): boolean {
    return this.toBoolean(EnvironmentVariable.AUTO_REFRESH_TOKEN);
  }

  public getCurrentTenantId(): string {
    return EnvironmentVariable.MULTI_TENANCY_ID;
  }

  public getRedirectUri(): string {
    return EnvironmentVariable.REDIRECT_URI;
  }
}

export const variables: EnvironmentVariable = EnvironmentVariable.getInstance();
