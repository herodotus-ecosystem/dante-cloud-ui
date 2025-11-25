import type {
  AxiosHttpResult,
  DeploymentEntity,
  DeploymentQueryParams,
  DeploymentSortBy,
  DeploymentDeleteQueryParams,
  DeploymentCreateRequestBody,
  DeploymentRedeployRequestBody,
  DeploymentWithDefinitionsEntity,
  ResourceEntity,
} from '@/declarations';
import { moment } from '../utils';
import { HttpConfig, BpmnQueryService } from '../base';
import { ContentTypeEnum } from '@/enums';

class DeploymentService extends BpmnQueryService<
  DeploymentEntity,
  DeploymentQueryParams,
  DeploymentSortBy,
  DeploymentDeleteQueryParams
> {
  private static instance: DeploymentService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): DeploymentService {
    if (this.instance == null) {
      this.instance = new DeploymentService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getBpmn() + '/deployment';
  }

  public getCreateAddress(): string {
    return this.getBaseAddress() + '/create';
  }

  private getDuplicateFiltering(data: DeploymentCreateRequestBody): string {
    if (data.deployChangedOnly) {
      return 'true';
    } else {
      if (data.enableDuplicateFiltering) {
        return String(data.enableDuplicateFiltering);
      } else {
        return 'false';
      }
    }
  }

  /**
   * Creates a deployment.
   *
   * @param data {@link DeploymentCreateRequestBody}
   * @returns A JSON object corresponding to the DeploymentWithDefinitions interface in the engine
   */
  public create(
    data: DeploymentCreateRequestBody,
  ): Promise<AxiosHttpResult<DeploymentWithDefinitionsEntity>> {
    let formData = new FormData();
    formData.append('deployment-name', data.deploymentName);
    formData.append('deploy-changed-only', data.deployChangedOnly ? 'true' : 'false');
    formData.append('enable-duplicate-filtering', this.getDuplicateFiltering(data));
    formData.append(
      'deployment-source',
      data.deploymentSource ? data.deploymentSource : 'Dante Cloud UI',
    );
    const activationTime = data.deploymentActivationTime
      ? data.deploymentActivationTime
      : new Date();
    formData.append('deployment-activation-time', moment(activationTime).utc().format());
    if (data.tenantId) {
      formData.append('tenant-id', data.tenantId);
    }

    let blob = new Blob([data.resource], { type: 'application/octet-stream' });
    formData.append('data', blob, new Date().getTime() + '.bpmn');

    return this.getConfig()
      .getHttp()
      .post<DeploymentWithDefinitionsEntity, FormData>(this.getCreateAddress(), formData, {
        contentType: ContentTypeEnum.MULTI_PART,
      });
  }

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
  public redeploy(
    id: string,
    data: DeploymentRedeployRequestBody,
  ): Promise<AxiosHttpResult<DeploymentWithDefinitionsEntity>> {
    return this.getConfig()
      .getHttp()
      .post<
        DeploymentWithDefinitionsEntity,
        DeploymentRedeployRequestBody
      >(this.createAddressById(id, 'redeploy'), data);
  }

  /**
   * Retrieves all deployment resources of a given deployment.
   *
   * @param id The id of the deployment to retrieve the deployment resources for.
   * @returns A JSON array containing all deployment resources of the given deployment
   */
  public getResources(id: string): Promise<AxiosHttpResult<Array<ResourceEntity>>> {
    return this.getConfig()
      .getHttp()
      .get<Array<ResourceEntity>, string>(this.createAddressById(id, 'resources'));
  }

  /**
   * Retrieves a deployment resource by resource id for the given deployment.
   *
   * @param id The id of the deployment.
   * @param resourceId The id of the deployment resource.
   * @returns A JSON object corresponding to the Resource interface in the engine.
   */
  public getResource(id: string, resourceId: string): Promise<AxiosHttpResult<ResourceEntity>> {
    return this.getConfig()
      .getHttp()
      .get<ResourceEntity, string>(this.createAddressByRelation(id, resourceId, 'resources'));
  }

  /**
   * Retrieves the binary content of a deployment resource for the given deployment by id.
   *
   * @param id The id of the deployment.
   * @param resourceId The id of the deployment resource.
   * @returns Byte Stream.
   */
  public getBinaryResource(id: string, resourceId: string): Promise<AxiosHttpResult<string>> {
    const address = this.createAddressByRelation(id, resourceId, 'resources') + '/data';
    return this.getConfig().getHttp().get<string, string>(address);
  }

  /**
   * Retrieves list of registered deployment IDs.
   * @returns A JSON array of strings containing the IDs of registered deployments for the application.
   */
  public getRegisteredDeployments(): Promise<AxiosHttpResult<Array<string>>> {
    const address = this.getBaseAddress() + '/registered';
    return this.getConfig().getHttp().get<Array<string>, string>(address);
  }
}

export { DeploymentService };
