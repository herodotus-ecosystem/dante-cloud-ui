import { HttpClientOptions } from '../declarations';
import { Axios, HttpConfig } from './base';
import { DeploymentService, ProcessDefinitionService, ProcessInstanceService, TaskService, HistoryActivityInstanceService, HistoryProcessInstanceService, HistoryTaskService, GroupService, GroupMemberService, TenantService, TenantUserService, TenantGroupService, UserService } from './modules';
export declare class BpmnApiResources {
    private static instance;
    private config;
    private constructor();
    static getInstance(config: HttpConfig): BpmnApiResources;
    getConfig(): HttpConfig;
    deployment(): DeploymentService;
    processDefinition(): ProcessDefinitionService;
    processInstance(): ProcessInstanceService;
    task(): TaskService;
    historyActivityInstance(): HistoryActivityInstanceService;
    historyProcessInstance(): HistoryProcessInstanceService;
    historyTask(): HistoryTaskService;
    group(): GroupService;
    groupMember(): GroupMemberService;
    tenant(): TenantService;
    tenantUser(): TenantUserService;
    tenantGroup(): TenantGroupService;
    user(): UserService;
}
declare const createBpmnApi: (http: Axios, options: HttpClientOptions) => BpmnApiResources;
export { createBpmnApi };
