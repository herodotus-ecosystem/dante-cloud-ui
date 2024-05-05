import { BpmnDesignerResources } from '../declarations';

export declare const useResourceStore: import('pinia').StoreDefinition<"BpmnDesignerResources", {
    resources: BpmnDesignerResources;
}, {
    userService: (state: {
        resources: {
            user: () => import('../declarations').UserService;
            group: () => import('../declarations').GroupService;
            deployment: () => import('../declarations').DeploymentService;
            dynamicForm: () => import('../declarations').DynamicFormService;
        };
    } & import('pinia').PiniaCustomStateProperties<{
        resources: BpmnDesignerResources;
    }>) => import('../declarations').UserService;
    groupService: (state: {
        resources: {
            user: () => import('../declarations').UserService;
            group: () => import('../declarations').GroupService;
            deployment: () => import('../declarations').DeploymentService;
            dynamicForm: () => import('../declarations').DynamicFormService;
        };
    } & import('pinia').PiniaCustomStateProperties<{
        resources: BpmnDesignerResources;
    }>) => import('../declarations').GroupService;
    deploymentService: (state: {
        resources: {
            user: () => import('../declarations').UserService;
            group: () => import('../declarations').GroupService;
            deployment: () => import('../declarations').DeploymentService;
            dynamicForm: () => import('../declarations').DynamicFormService;
        };
    } & import('pinia').PiniaCustomStateProperties<{
        resources: BpmnDesignerResources;
    }>) => import('../declarations').DeploymentService;
    dynamicFormService: (state: {
        resources: {
            user: () => import('../declarations').UserService;
            group: () => import('../declarations').GroupService;
            deployment: () => import('../declarations').DeploymentService;
            dynamicForm: () => import('../declarations').DynamicFormService;
        };
    } & import('pinia').PiniaCustomStateProperties<{
        resources: BpmnDesignerResources;
    }>) => import('../declarations').DynamicFormService;
}, {
    init(instance: BpmnDesignerResources): void;
}>;
