import type {
  AxiosHttpResult,
  Page,
  Pagination,
  BpmnGetListParams,
  BpmnListEntity,
  BpmnListQueryParams,
  BpmnListCountEntity,
  BpmnPathParams,
  BpmnBaseDeleteQueryParams,
  BpmnPagination,
  BpmnSortable
} from '/@/declarations';

import { Service, lodash } from './core';

import { PathParamBuilder } from './path';

export abstract class BpmnService extends Service {
  protected getCountAddress(): string {
    return this.getBaseAddress() + '/count';
  }

  protected createAddressWithParam(params: BpmnPathParams, operation: string = ''): string {
    let builder = new PathParamBuilder(this.getBaseAddress());

    if (operation) {
      return builder.withParam(params).setOperation(operation).build();
    } else {
      return builder.withParam(params).build();
    }
  }
}

export abstract class BpmnQueryByGetService<
  R extends BpmnListEntity,
  P extends BpmnListQueryParams,
  B
> extends BpmnService {
  public getCount(params: P = {} as P): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.getConfig()
        .getHttp()
        .get<BpmnListCountEntity>(this.getCountAddress(), params)
        .then(response => {
          if (response) {
            const data = response as BpmnListCountEntity;
            resolve(data.count);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public getList(pagination: BpmnPagination<B>, count: number, params: P = {} as P): Promise<Page<R>> {
    const full: BpmnGetListParams<P, B> = Object.assign(params, {
      sortBy: pagination.sortBy,
      sortOrder: pagination.sortOrder,
      firstResult: (pagination.pageNumber - 1) * pagination.pageSize,
      maxResults: pagination.pageSize
    });

    return new Promise<Page<R>>((resolve, reject) => {
      this.getConfig()
        .getHttp()
        .get<R[]>(this.getBaseAddress(), full)
        .then(result => {
          const data: Page<R> = {
            content: result as R[],
            totalPages: count ? (count + pagination.pageSize - 1) / pagination.pageSize : count,
            totalElements: String(count)
          };
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public getByPage(pagination: BpmnPagination<B>, params: P = {} as P): Promise<Page<R>> {
    return new Promise<Page<R>>((resolve, reject) => {
      this.getCount(params)
        .then(count => {
          this.getList(pagination, count, params).then(result => {
            resolve(result);
          });
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export abstract class BpmnQueryService<
  R extends BpmnListEntity,
  P extends BpmnListQueryParams,
  B
> extends BpmnQueryByGetService<R, P, B> {
  public get(id: string): Promise<AxiosHttpResult<R>> {
    return this.getConfig()
      .getHttp()
      .get<R>(this.createAddressWithParam({ id: id }));
  }
}

export abstract class BpmnQueryByPostService<
  R extends BpmnListEntity,
  P extends BpmnListQueryParams,
  B
> extends BpmnQueryService<R, P, B> {
  public getPostCount(params: P = {} as P): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.getConfig()
        .getHttp()
        .get<BpmnListCountEntity>(this.getCountAddress(), params)
        .then(response => {
          if (response) {
            const data = response as BpmnListCountEntity;
            resolve(data.count);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public getPostList(
    pagination: Pagination,
    count: number,
    sorting = [] as Array<BpmnSortable<B>>,
    params: P = {} as P
  ): Promise<Page<R>> {
    const query = {
      firstResult: (pagination.pageNumber - 1) * pagination.pageSize,
      maxResults: pagination.pageSize
    };

    let body = {};
    if (!lodash.isEmpty(sorting)) {
      body = Object.assign(params, {
        sorting: sorting
      });
    }

    return new Promise<Page<R>>((resolve, reject) => {
      this.getConfig()
        .getHttp()
        .postWithParams<R[]>(this.getBaseAddress(), query, body)
        .then(result => {
          const data: Page<R> = {
            content: result as R[],
            totalPages: count ? (count + pagination.pageSize - 1) / pagination.pageSize : count,
            totalElements: String(count)
          };
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public getPostByPage(
    pagination: Pagination,
    sorting = [] as Array<BpmnSortable<B>>,
    params: P = {} as P
  ): Promise<Page<R>> {
    return new Promise<Page<R>>((resolve, reject) => {
      this.getPostCount(params)
        .then(count => {
          this.getPostList(pagination, count, sorting, params).then(result => {
            resolve(result);
          });
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export abstract class BaseBpmnService<
  R extends BpmnListEntity,
  P extends BpmnListQueryParams,
  B
> extends BpmnQueryByPostService<R, P, B> {
  public abstract deleteById(id: string, query: BpmnBaseDeleteQueryParams): Promise<AxiosHttpResult<string>>;
}
