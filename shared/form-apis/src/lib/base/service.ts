import type { AxiosHttpResult, BaseMongoEntity, Pageable, Page, Conditions } from '@/declarations';

import { Service, lodash } from './core';

export abstract class BaseMongoService<E extends BaseMongoEntity> extends Service {
  private getConditionAddress(): string {
    return this.getBaseAddress() + '/condition';
  }

  private getListAddress(): string {
    return this.getBaseAddress() + '/list';
  }

  public fetchByPage(params: Pageable, others = {}): Promise<AxiosHttpResult<Page<E>>> {
    if (lodash.isEmpty(others)) {
      return this.getConfig().getHttp().get<Page<E>, Pageable>(this.getBaseAddress(), params);
    } else {
      const fullParams = Object.assign(params, others);
      return this.getConfig()
        .getHttp()
        .get<Page<E>, Pageable>(this.getConditionAddress(), fullParams);
    }
  }

  public fetchAll(params: Conditions = {}): Promise<AxiosHttpResult<E[]>> {
    return this.getConfig().getHttp().get<E[], Conditions>(this.getListAddress(), params);
  }

  public fetchById(id: string): Promise<AxiosHttpResult<E>> {
    return this.getConfig().getHttp().get<E, string>(this.getIdPath(id));
  }

  public saveOrUpdate(data: E): Promise<AxiosHttpResult<E>> {
    return this.getConfig().getHttp().post<E, E>(this.getBaseAddress(), data);
  }

  public delete(id: string): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().delete<string, string>(this.getIdPath(id));
  }
}
