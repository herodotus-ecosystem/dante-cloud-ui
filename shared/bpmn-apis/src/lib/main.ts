import { Axios, HttpConfig } from './base';
import {
  DeploymentService,
  ProcessDefinitionService,
  ProcessInstanceService,
  TaskService,
  HistoryActivityInstanceService,
  HistoryProcessInstanceService,
  HistoryTaskService,
  GroupService,
  GroupMemberService,
  TenantService,
  TenantUserService,
  TenantGroupService,
  UserService
} from './modules';

class BpmnApiResources {
  private static instance: BpmnApiResources;
  private config = {} as HttpConfig;

  private constructor(config: HttpConfig) {
    this.config = config;
  }

  public static getInstance(config: HttpConfig): BpmnApiResources {
    if (this.instance == null) {
      this.instance = new BpmnApiResources(config);
    }
    return this.instance;
  }

  public getConfig(): HttpConfig {
    return this.config;
  }

  public deployment(): DeploymentService {
    return DeploymentService.getInstance(this.config);
  }

  public processDefinition(): ProcessDefinitionService {
    return ProcessDefinitionService.getInstance(this.config);
  }

  public processInstance(): ProcessInstanceService {
    return ProcessInstanceService.getInstance(this.config);
  }

  public task(): TaskService {
    return TaskService.getInstance(this.config);
  }

  public historyActivityInstance(): HistoryActivityInstanceService {
    return HistoryActivityInstanceService.getInstance(this.config);
  }

  public historyProcessInstance(): HistoryProcessInstanceService {
    return HistoryProcessInstanceService.getInstance(this.config);
  }

  public historyTask(): HistoryTaskService {
    return HistoryTaskService.getInstance(this.config);
  }

  public group(): GroupService {
    return GroupService.getInstance(this.config);
  }

  public groupMember(): GroupMemberService {
    return GroupMemberService.getInstance(this.config);
  }

  public tenant(): TenantService {
    return TenantService.getInstance(this.config);
  }

  public tenantUser(): TenantUserService {
    return TenantUserService.getInstance(this.config);
  }

  public tenantGroup(): TenantGroupService {
    return TenantGroupService.getInstance(this.config);
  }

  public user(): UserService {
    return UserService.getInstance(this.config);
  }
}

const createBpmnApi = (project: string, clientId: string, clientSecret: string, http: Axios): BpmnApiResources => {
  const config = new HttpConfig(project, clientId, clientSecret, http);
  return BpmnApiResources.getInstance(config);
};

export { createBpmnApi };
