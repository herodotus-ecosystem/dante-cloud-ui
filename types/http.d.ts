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
};

type BpmnListCount = {
	count: number;
};

type HttpResult<T = unknown> = OAuth2Token & Result<T> & BpmnListCount & T[] & unknown;
