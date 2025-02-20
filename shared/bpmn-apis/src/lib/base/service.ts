import type {
  AxiosHttpResult,
  Page,
  Pagination,
  BpmnGetListParams,
  BpmnListEntity,
  BpmnListQueryParams,
  BpmnListCountEntity,
  BpmnPagination,
  BpmnSortable,
  BpmnDeleteQueryParams,
  BpmnUnionPathParams,
  BpmnRelationPathParams,
} from '@/declarations';

import { Service, lodash } from './core';

import { UnionPathParamBuilder, RelationPathParamBuilder } from './path';

export abstract class BpmnService<
  D extends BpmnDeleteQueryParams = BpmnDeleteQueryParams,
> extends Service {
  protected getCountAddress(): string {
    return this.getBaseAddress() + '/count';
  }

  protected createAddressByParam(params: BpmnUnionPathParams, action: string = ''): string {
    let builder = new UnionPathParamBuilder(this.getBaseAddress());

    if (action) {
      return builder.withParam(params).setAction(action).build();
    } else {
      return builder.withParam(params).build();
    }
  }

  protected createAddressByRelation(id: string, relationId: string, action: string): string {
    let builder = new RelationPathParamBuilder(this.getBaseAddress());
    return builder.withParam({ id, relationId, action }).build();
  }

  protected createAddressById(id: string, action: string = ''): string {
    return this.createAddressByParam({ id: id }, action);
  }

  public delete(id: string, deleteParams: D = {} as D): Promise<AxiosHttpResult<string>> {
    if (lodash.isEmpty(deleteParams)) {
      return this.getConfig().getHttp().delete<string, string>(this.createAddressById(id));
    } else {
      return this.getConfig()
        .getHttp()
        .deleteWithParams<string, string>(this.createAddressById(id), deleteParams);
    }
  }
}

export abstract class BpmnQueryByGetService<
  E extends BpmnListEntity,
  Q extends BpmnListQueryParams,
  S,
  D extends BpmnDeleteQueryParams = BpmnDeleteQueryParams,
> extends BpmnService<D> {
  public getCount(params: Q = {} as Q): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.getConfig()
        .getHttp()
        .get<BpmnListCountEntity>(this.getCountAddress(), params)
        .then((response) => {
          if (response) {
            const data = response as BpmnListCountEntity;
            resolve(data.count);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public getList(
    pagination: BpmnPagination<S>,
    count: number,
    params: Q = {} as Q,
  ): Promise<Page<E>> {
    const full: BpmnGetListParams<Q, S> = Object.assign(params, {
      sortBy: pagination.sortBy,
      sortOrder: pagination.sortOrder,
      firstResult: (pagination.pageNumber - 1) * pagination.pageSize,
      maxResults: pagination.pageSize,
    });

    return new Promise<Page<E>>((resolve, reject) => {
      this.getConfig()
        .getHttp()
        .get<E[]>(this.getBaseAddress(), full)
        .then((result) => {
          const data: Page<E> = {
            content: result as E[],
            totalPages: count ? (count + pagination.pageSize - 1) / pagination.pageSize : count,
            totalElements: String(count),
          };
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public getByPage(pagination: BpmnPagination<S>, params: Q = {} as Q): Promise<Page<E>> {
    return new Promise<Page<E>>((resolve, reject) => {
      this.getCount(params)
        .then((count) => {
          this.getList(pagination, count, params).then((result) => {
            resolve(result);
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public getAll(sortable: BpmnSortable<S>, params: Q = {} as Q): Promise<Array<E>> {
    return new Promise<Array<E>>((resolve, reject) => {
      this.getCount(params)
        .then((count) => {
          const full: BpmnGetListParams<Q, S> = Object.assign(params, {
            sortBy: sortable.sortBy,
            sortOrder: sortable.sortOrder,
            firstResult: 0,
            maxResults: count,
          });

          this.getConfig()
            .getHttp()
            .get<E[]>(this.getBaseAddress(), full)
            .then((result) => {
              const data = result as E[];
              resolve(data);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export abstract class BpmnQueryService<
  E extends BpmnListEntity,
  Q extends BpmnListQueryParams,
  S,
  D extends BpmnDeleteQueryParams = BpmnDeleteQueryParams,
> extends BpmnQueryByGetService<E, Q, S, D> {
  public get(id: string): Promise<AxiosHttpResult<E>> {
    return this.getConfig().getHttp().get<E>(this.createAddressById(id));
  }
}

export abstract class BpmnQueryByPostService<
  E extends BpmnListEntity,
  Q extends BpmnListQueryParams,
  S,
  D extends BpmnDeleteQueryParams = BpmnDeleteQueryParams,
> extends BpmnQueryService<E, Q, S, D> {
  public getPostCount(params: Q = {} as Q): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.getConfig()
        .getHttp()
        .get<BpmnListCountEntity>(this.getCountAddress(), params)
        .then((response) => {
          if (response) {
            const data = response as BpmnListCountEntity;
            resolve(data.count);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public getPostList(
    pagination: Pagination,
    count: number,
    sorting = [] as Array<BpmnSortable<S>>,
    params: Q = {} as Q,
  ): Promise<Page<E>> {
    const query = {
      firstResult: (pagination.pageNumber - 1) * pagination.pageSize,
      maxResults: pagination.pageSize,
    };

    let body = {};
    if (!lodash.isEmpty(sorting)) {
      body = Object.assign(params, {
        sorting: sorting,
      });
    }

    return new Promise<Page<E>>((resolve, reject) => {
      this.getConfig()
        .getHttp()
        .postWithParams<E[]>(this.getBaseAddress(), query, body)
        .then((result) => {
          const data: Page<E> = {
            content: result as E[],
            totalPages: count ? (count + pagination.pageSize - 1) / pagination.pageSize : count,
            totalElements: String(count),
          };
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public getPostByPage(
    pagination: Pagination,
    sorting = [] as Array<BpmnSortable<S>>,
    params: Q = {} as Q,
  ): Promise<Page<E>> {
    return new Promise<Page<E>>((resolve, reject) => {
      this.getPostCount(params)
        .then((count) => {
          this.getPostList(pagination, count, sorting, params).then((result) => {
            resolve(result);
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export abstract class BaseBpmnService<
  E extends BpmnListEntity,
  Q extends BpmnListQueryParams,
  S,
  D extends BpmnDeleteQueryParams = BpmnDeleteQueryParams,
> extends BpmnQueryByPostService<E, Q, S, D> {}
