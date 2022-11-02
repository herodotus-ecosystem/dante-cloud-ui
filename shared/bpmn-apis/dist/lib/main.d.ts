import { Axios, HttpConfig } from './base';
import { DeploymentService, ProcessDefinitionService, ProcessInstanceService } from './modules';
declare class BpmnApiResources {
    private static instance;
    private config;
    private constructor();
    static getInstance(config: HttpConfig): BpmnApiResources;
    getConfig(): HttpConfig;
    deployment(): DeploymentService;
    processDefinition(): ProcessDefinitionService;
    processInstance(): ProcessInstanceService;
}
declare const createBpmnApi: (project: string, clientId: string, clientSecret: string, http: Axios) => BpmnApiResources;
export { createBpmnApi };
