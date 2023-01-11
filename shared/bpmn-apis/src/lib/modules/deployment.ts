import type {
  AxiosHttpResult,
  BpmnDeleteQueryParams,
  DeploymentQueryParams,
  Deployment,
  DeploymentDeploy,
  DeploymentCreateBody,
  DeploymentRedeployBody,
  DeploymentResource,
  DeploymentSortBy
} from '/@/declarations';
import { moment } from '../utils';
import { HttpConfig, BaseBpmnService } from '../base';
import { ContentTypeEnum } from '/@/enums';

class DeploymentService extends BaseBpmnService<Deployment, DeploymentQueryParams, DeploymentSortBy> {
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

  private getDuplicateFiltering(data: DeploymentCreateBody): string {
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

  public create(data: DeploymentCreateBody): Promise<AxiosHttpResult<DeploymentDeploy>> {
    let formData = new FormData();
    formData.append('deployment-name', data.deploymentName);
    formData.append('deploy-changed-only', data.deployChangedOnly ? 'true' : 'false');
    formData.append('enable-duplicate-filtering', this.getDuplicateFiltering(data));
    formData.append('deployment-source', data.deploymentSource ? data.deploymentSource : 'Dante Cloud UI');
    const activationTime = data.deploymentActivationTime ? data.deploymentActivationTime : new Date();
    formData.append('deployment-activation-time', moment(activationTime).utc().format());
    if (data.tenantId) {
      formData.append('tenant-id', data.tenantId);
    }

    let blob = new Blob([data.resource], { type: 'application/octet-stream' });
    formData.append('data', blob, data.deploymentName);

    return this.getConfig()
      .getHttp()
      .post<DeploymentDeploy, FormData>(this.getCreateAddress(), formData, { contentType: ContentTypeEnum.MULTI_PART });
  }

  public redeploy(id: string, data: DeploymentRedeployBody): Promise<AxiosHttpResult<DeploymentDeploy>> {
    return this.getConfig()
      .getHttp()
      .post<DeploymentDeploy, DeploymentRedeployBody>(this.createAddressWithParam({ id: id }, 'redeploy'), data);
  }

  public resources(id: string): Promise<AxiosHttpResult<Array<DeploymentResource>>> {
    return this.getConfig()
      .getHttp()
      .get<Array<DeploymentResource>, string>(this.createAddressWithParam({ id: id }, 'resources'));
  }

  public resource(id: string, resourceId: string): Promise<AxiosHttpResult<DeploymentResource>> {
    const address = this.getBaseAddress() + '/' + id + '/resources' + resourceId;
    return this.getConfig().getHttp().get<DeploymentResource, string>(address);
  }

  public binaryResource(id: string, resourceId: string): Promise<AxiosHttpResult<string>> {
    const address = this.getBaseAddress() + '/' + id + '/resources' + resourceId + '/data';
    return this.getConfig().getHttp().get<string, string>(address);
  }

  public deleteById(id: string, query: BpmnDeleteQueryParams): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .deleteWithParams<string, string>(this.createAddressWithParam({ id: id }), query);
  }

  public registered(): Promise<AxiosHttpResult<Array<string>>> {
    const address = this.getBaseAddress() + '/registered';
    return this.getConfig().getHttp().get<Array<string>, string>(address);
  }
}

export { DeploymentService };
