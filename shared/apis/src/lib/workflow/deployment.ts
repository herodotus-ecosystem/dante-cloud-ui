import type {
  AxiosHttpResult,
  DeleteQueryParams,
  Deployment,
  DeploymentDeploy,
  DeploymentCreateBody,
  DeploymentParams,
  DeploymentRedeployBody,
  DeploymentResource
} from '/@/declarations';
import { ApiConfig, BaseBpmnService } from '../base';
import { ContentTypeEnum } from '@herodotus/utils';

class DeploymentService extends BaseBpmnService<Deployment, DeploymentParams> {
  private static instance: DeploymentService;

  private constructor(config: ApiConfig) {
    super(config);
  }

  public static getInstance(config: ApiConfig): DeploymentService {
    if (this.instance == null) {
      this.instance = new DeploymentService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getBpmn() + '/deployment';
  }

  public create(data: DeploymentCreateBody): Promise<AxiosHttpResult<DeploymentDeploy>> {
    const address = this.getBaseAddress() + '/create';
    return this.getConfig()
      .getHttp()
      .post<DeploymentDeploy, DeploymentCreateBody>(address, data, { contentType: ContentTypeEnum.MULTI_PART });
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

  public deleteById(id: string, query: DeleteQueryParams): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .deleteWithParams<string, string>(this.createAddressWithParam({ id: id }), query);
  }

  public registered(): Promise<AxiosHttpResult<Array<string>>> {
    const address = this.getBaseAddress() + '/registered' ;
    return this.getConfig().getHttp().get<Array<string>, string>(address);
  }
}

export { DeploymentService };
