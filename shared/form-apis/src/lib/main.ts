import type { HttpClientOptions } from '@/declarations';
import { Axios, HttpConfig } from './base';
import { DynamicFormService, ProcessCommentsService, ProcessSpecificsService } from './modules';

export class FormApiResources {
  private static instance: FormApiResources;
  private config = {} as HttpConfig;

  private constructor(config: HttpConfig) {
    this.config = config;
  }

  public static getInstance(config: HttpConfig): FormApiResources {
    if (this.instance == null) {
      this.instance = new FormApiResources(config);
    }
    return this.instance;
  }

  public getConfig(): HttpConfig {
    return this.config;
  }

  public dynamicForm(): DynamicFormService {
    return DynamicFormService.getInstance(this.config);
  }

  public processComments(): ProcessCommentsService {
    return ProcessCommentsService.getInstance(this.config);
  }

  public processSpecifics(): ProcessSpecificsService {
    return ProcessSpecificsService.getInstance(this.config);
  }
}

const createFormApi = (http: Axios, options: HttpClientOptions): FormApiResources => {
  const config = new HttpConfig(http, options);
  return FormApiResources.getInstance(config);
};

export { createFormApi };

export interface FormDesignerResources {
  dynamicForm(): DynamicFormService;
}
