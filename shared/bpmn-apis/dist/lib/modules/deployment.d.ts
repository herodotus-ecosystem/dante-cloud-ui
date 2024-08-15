import { AxiosHttpResult, DeploymentEntity, DeploymentQueryParams, DeploymentSortBy, DeploymentDeleteQueryParams, DeploymentCreateRequestBody, DeploymentRedeployRequestBody, DeploymentWithDefinitionsEntity, ResourceEntity } from '../../declarations';
import { HttpConfig, BpmnQueryService } from '../base';
declare class DeploymentService extends BpmnQueryService<DeploymentEntity, DeploymentQueryParams, DeploymentSortBy, DeploymentDeleteQueryParams> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): DeploymentService;
    getBaseAddress(): string;
    getCreateAddress(): string;
    private getDuplicateFiltering;
    /**
     * Creates a deployment.
     *
     * @param data {@link DeploymentCreateRequestBody}
     * @returns A JSON object corresponding to the DeploymentWithDefinitions interface in the engine
     */
    create(data: DeploymentCreateRequestBody): Promise<AxiosHttpResult<DeploymentWithDefinitionsEntity>>;
    /**
     * Re-deploys an existing deployment.
     *
     * The deployment resources to re-deploy can be restricted by using the properties resourceIds or resourceNames.
     * If no deployment resources to re-deploy are passed then all existing resources of the given deployment are re-deployed.
     *
     * @param id The id of the deployment to re-deploy.
     * @param data {@link DeploymentRedeployRequestBody}
     * @returns A JSON object corresponding to the DeploymentWithDefinitions interface in the engine
     */
    redeploy(id: string, data: DeploymentRedeployRequestBody): Promise<AxiosHttpResult<DeploymentWithDefinitionsEntity>>;
    /**
     * Retrieves all deployment resources of a given deployment.
     *
     * @param id The id of the deployment to retrieve the deployment resources for.
     * @returns A JSON array containing all deployment resources of the given deployment
     */
    getResources(id: string): Promise<AxiosHttpResult<Array<ResourceEntity>>>;
    /**
     * Retrieves a deployment resource by resource id for the given deployment.
     *
     * @param id The id of the deployment.
     * @param resourceId The id of the deployment resource.
     * @returns A JSON object corresponding to the Resource interface in the engine.
     */
    getResource(id: string, resourceId: string): Promise<AxiosHttpResult<ResourceEntity>>;
    /**
     * Retrieves the binary content of a deployment resource for the given deployment by id.
     *
     * @param id The id of the deployment.
     * @param resourceId The id of the deployment resource.
     * @returns Byte Stream.
     */
    getBinaryResource(id: string, resourceId: string): Promise<AxiosHttpResult<string>>;
    /**
     * Retrieves list of registered deployment IDs.
     * @returns A JSON array of strings containing the IDs of registered deployments for the application.
     */
    getRegisteredDeployments(): Promise<AxiosHttpResult<Array<string>>>;
}
export { DeploymentService };
