import type { Page, Pageable, AxiosHttpResult, BpmnPathParams, BpmnListParams, BpmnListEntity } from '../../declarations';
import { Service } from './core';
export declare abstract class BaseBpmnService<R extends BpmnListEntity, P extends BpmnListParams> extends Service {
    private getCountAddress;
    private getListAddress;
    protected createAddressWithParam(params: BpmnPathParams, operation?: string): string;
    private getCount;
    private getPostCount;
    private getList;
    private getPostList;
    getByPage(pageable: Pageable, params?: P): Promise<Page<R>>;
    getByPageOnPost(pageable: Pageable, params?: P): Promise<Page<R>>;
    getById(id: string): Promise<AxiosHttpResult<R>>;
}
