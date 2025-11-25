import { BpmnDesignerResources } from '../declarations';
export declare const useResourceStore: import('pinia').StoreDefinition<"BpmnDesignerResources", {
    resources: BpmnDesignerResources;
}, {
    userService: (state: {
        resources: {
            user: () => import('@herodotus-cloud/bpmn-apis').UserService;
            group: () => import('@herodotus-cloud/bpmn-apis').GroupService;
            deployment: () => import('@herodotus-cloud/bpmn-apis').DeploymentService;
            dynamicForm: () => import('@herodotus-cloud/form-apis').DynamicFormService;
        };
    } & import('pinia').PiniaCustomStateProperties<{
        resources: BpmnDesignerResources;
    }>) => import('@herodotus-cloud/bpmn-apis').UserService;
    groupService: (state: {
        resources: {
            user: () => import('@herodotus-cloud/bpmn-apis').UserService;
            group: () => import('@herodotus-cloud/bpmn-apis').GroupService;
            deployment: () => import('@herodotus-cloud/bpmn-apis').DeploymentService;
            dynamicForm: () => import('@herodotus-cloud/form-apis').DynamicFormService;
        };
    } & import('pinia').PiniaCustomStateProperties<{
        resources: BpmnDesignerResources;
    }>) => import('@herodotus-cloud/bpmn-apis').GroupService;
    deploymentService: (state: {
        resources: {
            user: () => import('@herodotus-cloud/bpmn-apis').UserService;
            group: () => import('@herodotus-cloud/bpmn-apis').GroupService;
            deployment: () => import('@herodotus-cloud/bpmn-apis').DeploymentService;
            dynamicForm: () => import('@herodotus-cloud/form-apis').DynamicFormService;
        };
    } & import('pinia').PiniaCustomStateProperties<{
        resources: BpmnDesignerResources;
    }>) => import('@herodotus-cloud/bpmn-apis').DeploymentService;
    dynamicFormService: (state: {
        resources: {
            user: () => import('@herodotus-cloud/bpmn-apis').UserService;
            group: () => import('@herodotus-cloud/bpmn-apis').GroupService;
            deployment: () => import('@herodotus-cloud/bpmn-apis').DeploymentService;
            dynamicForm: () => import('@herodotus-cloud/form-apis').DynamicFormService;
        };
    } & import('pinia').PiniaCustomStateProperties<{
        resources: BpmnDesignerResources;
    }>) => import('@herodotus-cloud/form-apis').DynamicFormService;
}, {
    init(instance: BpmnDesignerResources): void;
}>;
