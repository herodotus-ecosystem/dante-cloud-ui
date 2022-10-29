import type { Page, Pagination, AxiosHttpResult, BpmnPathParams, BpmnListParams, BpmnListEntity, BpmnDeleteQueryParams } from '../../declarations';
import { Service } from './core';
export declare abstract class BaseBpmnService<R extends BpmnListEntity, P extends BpmnListParams> extends Service {
    private getCountAddress;
    private getListAddress;
    protected createAddressWithParam(params: BpmnPathParams, operation?: string): string;
    private getCount;
    private getPostCount;
    private getList;
    private getPostList;
    getByPage(pagination: Pagination, params?: P): Promise<Page<R>>;
    getByPageOnPost(pagination: Pagination, params?: P): Promise<Page<R>>;
    getById(id: string): Promise<AxiosHttpResult<R>>;
    abstract deleteById(id: string, query: BpmnDeleteQueryParams): Promise<AxiosHttpResult<string>>;
}
