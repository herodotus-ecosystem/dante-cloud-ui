import { isEmpty } from 'lodash-es';
import type { Entity, Pageable, Page, Conditions, BaseTree, AxiosHttpResult } from '/@/declarations';
import { ContentTypeEnum } from '/@/enums';
import { ApiConfig } from './config';

export abstract class Service {
  private config: ApiConfig;

  public constructor(config: ApiConfig) {
    this.config = config;
  }

  abstract getBaseAddress(): string;

  protected getConfig(): ApiConfig {
    return this.config;
  }

  protected getParamPath(path: string, param: string): string {
    return path + '/' + param;
  }

  protected getIdPath(id: string): string {
    return this.getParamPath(this.getBaseAddress(), id);
  }
}

export abstract class BaseService<R extends Entity> extends Service {
  private getConditionAddress(): string {
    return this.getBaseAddress() + '/condition';
  }

  private getListAddress(): string {
    return this.getBaseAddress() + '/list';
  }

  public getTreeAddress(): string {
    return this.getBaseAddress() + '/tree';
  }

  public fetch(params = {}): Promise<AxiosHttpResult<R>> {
    return this.getConfig().getHttp().get<R, any>(this.getBaseAddress(), params);
  }

  public fetchByPage(params: Pageable, others = {}): Promise<AxiosHttpResult<Page<R>>> {
    if (isEmpty(others)) {
      return this.getConfig().getHttp().get<Page<R>, Pageable>(this.getBaseAddress(), params);
    } else {
      const fullParams = Object.assign(params, others);
      return this.getConfig().getHttp().get<Page<R>, Pageable>(this.getConditionAddress(), fullParams);
    }
  }

  public fetchAll(params: Conditions = {}): Promise<AxiosHttpResult<R[]>> {
    return this.getConfig().getHttp().get<R[], Conditions>(this.getListAddress(), params);
  }

  public fetchTree(params: Conditions = {}): Promise<AxiosHttpResult<BaseTree[]>> {
    return this.getConfig().getHttp().get<BaseTree[], Conditions>(this.getTreeAddress(), params);
  }

  public saveOrUpdate(data: R): Promise<AxiosHttpResult<R>> {
    return this.getConfig().getHttp().post<R, R>(this.getBaseAddress(), data);
  }

  public delete(id: string): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().delete<string, string>(this.getIdPath(id));
  }

  public assign(data: any): Promise<AxiosHttpResult<R>> {
    return this.getConfig().getHttp().put(this.getBaseAddress(), data, {
      contentType: ContentTypeEnum.URL_ENCODED
    });
  }
}
