import type { AxiosHttpResult, BpmnDeleteQueryParams, DeploymentQueryParams, Deployment, DeploymentDeploy, DeploymentCreate, DeploymentRedeployBody, DeploymentResource } from '../../declarations';
import { HttpConfig, BaseBpmnService } from '../base';
declare class DeploymentService extends BaseBpmnService<Deployment, DeploymentQueryParams> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): DeploymentService;
    getBaseAddress(): string;
    private getDuplicateFiltering;
    create(data: DeploymentCreate): Promise<AxiosHttpResult<DeploymentDeploy>>;
    redeploy(id: string, data: DeploymentRedeployBody): Promise<AxiosHttpResult<DeploymentDeploy>>;
    resources(id: string): Promise<AxiosHttpResult<Array<DeploymentResource>>>;
    resource(id: string, resourceId: string): Promise<AxiosHttpResult<DeploymentResource>>;
    binaryResource(id: string, resourceId: string): Promise<AxiosHttpResult<string>>;
    deleteById(id: string, query: BpmnDeleteQueryParams): Promise<AxiosHttpResult<string>>;
    registered(): Promise<AxiosHttpResult<Array<string>>>;
}
export { DeploymentService };
