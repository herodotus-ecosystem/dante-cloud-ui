import type { BaseBpmnEntity, BaseBpmnQueryParam } from '../base';
export interface ProcessDefinition extends BaseBpmnEntity {
    id: string;
    key: string;
    category: string;
    description: string;
    name: string;
    version: number;
    resource: string;
    deploymentId: string;
    diagram: string;
    suspended: boolean;
    tenantId: string;
    versionTag: string;
    historyTimeToLive: number;
    startableInTasklist: boolean;
}
export interface ProcessDefinitionQueryParam extends BaseBpmnQueryParam {
    processDefinitionId: string;
    processDefinitionIdIn: string;
    name: string;
    nameLike: string;
    deploymentId: string;
    key: string;
    keysIn: string;
    keyLike: string;
    category: string;
    categoryLike: string;
    version: string;
    latestVersion: string;
    resourceName: string;
    resourceNameLike: string;
    startableBy: string;
    active: boolean;
    suspended: boolean;
    incidentId: string;
    incidentType: string;
    incidentMessage: string;
    incidentMessageLike: string;
    tenantIdIn: string;
    withoutTenantId: boolean;
    includeProcessDefinitionsWithoutTenantId: boolean;
    versionTag: string;
    versionTagLike: string;
    withoutVersionTag: string;
    startableInTasklist: string;
    startablePermissionCheck: string;
    notStartableInTasklist: string;
}
