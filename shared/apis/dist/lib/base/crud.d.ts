import type { Entity, Pageable, Page, Conditions, BaseTree, AxiosHttpResult } from '../../declarations';
import { Service } from './core';
export declare abstract class BaseService<R extends Entity> extends Service {
    private getConditionAddress;
    private getListAddress;
    getTreeAddress(): string;
    fetch(params?: {}): Promise<AxiosHttpResult<R>>;
    fetchByPage(params: Pageable, others?: {}): Promise<AxiosHttpResult<Page<R>>>;
    fetchAll(params?: Conditions): Promise<AxiosHttpResult<R[]>>;
    fetchTree(params?: Conditions): Promise<AxiosHttpResult<BaseTree[]>>;
    saveOrUpdate(data: R): Promise<AxiosHttpResult<R>>;
    delete(id: string): Promise<AxiosHttpResult<string>>;
    assign(data: any): Promise<AxiosHttpResult<R>>;
}
