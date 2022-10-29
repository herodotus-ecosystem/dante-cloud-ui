import type { AxiosHttpResult, DeleteQueryParams, Deployment, DeploymentDeploy, DeploymentCreate, DeploymentParams, DeploymentRedeployBody, DeploymentResource } from '../../declarations';
import { ApiConfig, BaseBpmnService } from '../base';
declare class DeploymentService extends BaseBpmnService<Deployment, DeploymentParams> {
    private static instance;
    private constructor();
    static getInstance(config: ApiConfig): DeploymentService;
    getBaseAddress(): string;
    private getDuplicateFiltering;
    create(data: DeploymentCreate): Promise<AxiosHttpResult<DeploymentDeploy>>;
    redeploy(id: string, data: DeploymentRedeployBody): Promise<AxiosHttpResult<DeploymentDeploy>>;
    resources(id: string): Promise<AxiosHttpResult<Array<DeploymentResource>>>;
    resource(id: string, resourceId: string): Promise<AxiosHttpResult<DeploymentResource>>;
    binaryResource(id: string, resourceId: string): Promise<AxiosHttpResult<string>>;
    deleteById(id: string, query: DeleteQueryParams): Promise<AxiosHttpResult<string>>;
    registered(): Promise<AxiosHttpResult<Array<string>>>;
}
export { DeploymentService };
