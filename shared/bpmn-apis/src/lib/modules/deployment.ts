import type {
  AxiosHttpResult,
  BpmnDeleteQueryParams,
  DeploymentQueryParams,
  DeploymentEntity,
  DeploymentDeployEntity,
  DeploymentCreateRequestBody,
  DeploymentRedeployRequestBody,
  DeploymentResourceEntity,
  DeploymentSortBy
} from '/@/declarations';
import { moment } from '../utils';
import { HttpConfig, BpmnQueryService } from '../base';
import { ContentTypeEnum } from '/@/enums';

class DeploymentService extends BpmnQueryService<DeploymentEntity, DeploymentQueryParams, DeploymentSortBy> {
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

  public create(data: DeploymentCreateRequestBody): Promise<AxiosHttpResult<DeploymentDeployEntity>> {
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
      .post<DeploymentDeployEntity, FormData>(this.getCreateAddress(), formData, {
        contentType: ContentTypeEnum.MULTI_PART
      });
  }

  public redeploy(id: string, data: DeploymentRedeployRequestBody): Promise<AxiosHttpResult<DeploymentDeployEntity>> {
    return this.getConfig()
      .getHttp()
      .post<DeploymentDeployEntity, DeploymentRedeployRequestBody>(
        this.createAddressWithParam({ id: id }, 'redeploy'),
        data
      );
  }

  public resources(id: string): Promise<AxiosHttpResult<Array<DeploymentResourceEntity>>> {
    return this.getConfig()
      .getHttp()
      .get<Array<DeploymentResourceEntity>, string>(this.createAddressWithParam({ id: id }, 'resources'));
  }

  public resource(id: string, resourceId: string): Promise<AxiosHttpResult<DeploymentResourceEntity>> {
    const address = this.getBaseAddress() + '/' + id + '/resources' + resourceId;
    return this.getConfig().getHttp().get<DeploymentResourceEntity, string>(address);
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
