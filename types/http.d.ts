type Result<T = unknown> = {
	code: number;
	message: string;
	path: string;
	data: T;
	status: number;
	timestamp: string;
	error?: { detail: string; message: string; code: string; field: string };
};

type OAuth2Token = {
	access_token: string;
	expires_in: number;
	refresh_token: string;
	license: string;
	openid: string;
	scope: string;
	token_type: string;
	id_token: string;
};

type OAuth2IdToken = {
	sub: string;
	openid: string;
	roles: Array<string>;
	iss: string;
	active: boolean;
	token_type: string;
	client_id: string;
	aud: Array<string>;
	license: string;
	nbf: number;
	scope: string;
	exp: number;
	iat: number;
	jti: string;
};

type BpmnListCount = {
	count: number;
};

type HttpResult<T = unknown> = OAuth2Token & Result<T> & BpmnListCount & T[] & unknown;
