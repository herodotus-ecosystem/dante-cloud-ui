import type { HttpClientOptions } from '@herodotus-cloud/core';

import { createApi } from '@herodotus-cloud/apis';
import { createBpmnApi } from '@herodotus-cloud/bpmn-apis';
import { createFormApi } from '@herodotus-cloud/form-apis';
import { createOssApi } from '@herodotus-cloud/oss-apis';
import { Axios, ContentTypeEnum, HttpConfig } from '@herodotus-cloud/core';

import { VARIABLES } from '@/configurations';
import { axiosInstanceHooks } from './axios';
import { BpmnDesignerStorage, FormDesignerStorage } from './resources';

const http = new Axios(
  {
    timeout: 1000 * 12,
    withCredentials: true,
  },
  axiosInstanceHooks,
  {
    contentType: ContentTypeEnum.JSON,
    // 是否阻止重复请求，
    prohibitRepeatRequests: true,
    // 需要对返回数据进行处理
    isTransformResponse: true,
    // 消息提示类型
    errorMessageMode: 'message',
    // 是否携带token
    withToken: true,
  },
);

const options: HttpClientOptions = {
  project: VARIABLES.getProject(),
  clientId: VARIABLES.getClientId(),
  clientSecret: VARIABLES.getClientSecret(),
  oidc: VARIABLES.isUseOidc(),
};

export const config = new HttpConfig(http, options);

const api = createApi(http, options);
const bpmnApi = createBpmnApi(http, options);
const formApi = createFormApi(http, options);
const ossApi = createOssApi(http, options);

export const API = {
  core: api,
  bpmn: bpmnApi,
  form: formApi,
  oss: ossApi,
  bpmnStorage: BpmnDesignerStorage.getInstance(bpmnApi, formApi),
  formStorage: FormDesignerStorage.getInstance(formApi),
};

export const BpmnDesignerInstance = BpmnDesignerStorage.getInstance(bpmnApi, formApi);
export const FormDesignerInstance = FormDesignerStorage.getInstance(formApi);
