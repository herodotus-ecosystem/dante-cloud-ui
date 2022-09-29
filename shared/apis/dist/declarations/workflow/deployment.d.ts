import type { BaseBpmnEntity, BaseBpmnQueryParam } from '../base';
export interface Deployment extends BaseBpmnEntity {
    id: string;
    name: string;
    source: string;
    tenantId: string;
    deploymentTime: Date;
}
export interface DeploymentQueryParam extends BaseBpmnQueryParam {
    id: string;
    name: string;
    nameLike: string;
    source: string;
    withoutSource: string;
    tenantIdIn: string;
    withoutTenantId: boolean;
    includeDeploymentsWithoutTenantId: boolean;
    after: Date;
    before: Date;
}
