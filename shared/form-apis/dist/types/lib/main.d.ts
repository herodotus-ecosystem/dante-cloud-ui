import { HttpClientOptions } from '../declarations';
import { Axios, HttpConfig } from './base';
import { DynamicFormService, ProcessCommentsService, ProcessSpecificsService } from './modules';
export declare class FormApiResources {
    private static instance;
    private config;
    private constructor();
    static getInstance(config: HttpConfig): FormApiResources;
    getConfig(): HttpConfig;
    dynamicForm(): DynamicFormService;
    processComments(): ProcessCommentsService;
    processSpecifics(): ProcessSpecificsService;
}
declare const createFormApi: (http: Axios, options: HttpClientOptions) => FormApiResources;
export { createFormApi };
export interface FormDesignerResources {
    dynamicForm(): DynamicFormService;
}
