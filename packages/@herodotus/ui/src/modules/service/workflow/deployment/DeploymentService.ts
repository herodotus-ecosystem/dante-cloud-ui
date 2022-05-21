import { BaseBpmnEntity, BaseBpmnQueryParam, BaseBpmnService, _constants, Result } from '@/lib/declarations';
import { _http, HttpContentType } from '@/lib/utils';
import { Singleton } from 'typescript-ioc';

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

@Singleton
export class DeploymentService extends BaseBpmnService<Deployment, DeploymentQueryParam> {
    public getBaseAddress(): string {
        return _constants.BPMN_ADDRESS + '/deployment';
    }

    public getCreateAddress(): string {
        return this.getBaseAddress() + '/create';
    }

    public create(data: FormData): Promise<Result<string>> {
        return _http.post(this.getCreateAddress(), data, HttpContentType.MULTI_PART);
    }
}
