import { Axios, HttpConfig } from './base';
import { DynamicFormService, ProcessCommentsService, ProcessSpecificsService } from './modules';

declare class FormApiResources {
    private static instance;
    private config;
    private constructor();
    static getInstance(config: HttpConfig): FormApiResources;
    getConfig(): HttpConfig;
    dynamicForm(): DynamicFormService;
    processComments(): ProcessCommentsService;
    processSpecifics(): ProcessSpecificsService;
}
declare const createFormApi: (project: string, clientId: string, clientSecret: string, http: Axios) => FormApiResources;
export { createFormApi };
export interface FormDesignerResources {
    dynamicForm(): DynamicFormService;
}
