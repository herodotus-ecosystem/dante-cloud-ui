export type Result<T = any> = {
    code: number;
    data: T;
    message: string;
    path: string;
    status: number;
    timestamp: string;
    error?: any;
};

export type OAuth2Token = {
    access_token: string;
    expires_in: number;
    jti: string;
    license: string;
    openid: string;
    scope: string;
    token_type: string;
};

export type BpmnListCount = {
    count: number;
};

export type RestResponse<T = any> = OAuth2Token & Result<T> & BpmnListCount & T[];
