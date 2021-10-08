export type Result<T = never> = {
    code: number;
    message: string;
    path: string;
    data: T;
    status: number;
    timestamp: string;
    error?: { detail: string; message: string; code: string; field: string };
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
