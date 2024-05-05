import type { AxiosResponse, ResponseStatus } from '/@/declarations';

export const parseResponseStatus = (response: AxiosResponse<any>, message?: string): ResponseStatus => {
  const data = response.data;

  const responseStatus = {} as ResponseStatus;
  responseStatus.status = response.status;
  responseStatus.code = response.data && response.data.code ? response.data.code : 0;
  responseStatus.detail = data.error && data.error.detail ? data.error.detail : '';

  if (data.message) {
    responseStatus.message = data.message;
  } else {
    if (data.error && data.error.message) {
      responseStatus.message = data.error.message;
    } else {
      if (message) {
        responseStatus.message = message;
      }
    }
  }

  return responseStatus;
};
