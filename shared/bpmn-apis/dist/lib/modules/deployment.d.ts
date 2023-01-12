import type { AxiosHttpResult, BpmnDeleteQueryParams, DeploymentQueryParams, DeploymentEntity, DeploymentDeployEntity, DeploymentCreateRequestBody, DeploymentRedeployRequestBody, DeploymentResourceEntity, DeploymentSortBy } from '../../declarations';
import { HttpConfig, BpmnQueryService } from '../base';
declare class DeploymentService extends BpmnQueryService<DeploymentEntity, DeploymentQueryParams, DeploymentSortBy> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): DeploymentService;
    getBaseAddress(): string;
    getCreateAddress(): string;
    private getDuplicateFiltering;
    create(data: DeploymentCreateRequestBody): Promise<AxiosHttpResult<DeploymentDeployEntity>>;
    redeploy(id: string, data: DeploymentRedeployRequestBody): Promise<AxiosHttpResult<DeploymentDeployEntity>>;
    resources(id: string): Promise<AxiosHttpResult<Array<DeploymentResourceEntity>>>;
    resource(id: string, resourceId: string): Promise<AxiosHttpResult<DeploymentResourceEntity>>;
    binaryResource(id: string, resourceId: string): Promise<AxiosHttpResult<string>>;
    deleteById(id: string, query: BpmnDeleteQueryParams): Promise<AxiosHttpResult<string>>;
    registered(): Promise<AxiosHttpResult<Array<string>>>;
}
export { DeploymentService };
