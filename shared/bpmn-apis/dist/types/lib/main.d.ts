import { Axios, HttpConfig } from './base';
import { DeploymentService, ProcessDefinitionService, ProcessInstanceService, TaskService, HistoryActivityInstanceService, HistoryProcessInstanceService, HistoryTaskService, GroupService, GroupMemberService, TenantService, TenantUserService, TenantGroupService, UserService } from './modules';
declare class BpmnApiResources {
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
declare const createBpmnApi: (project: string, clientId: string, clientSecret: string, http: Axios) => BpmnApiResources;
export { createBpmnApi };
