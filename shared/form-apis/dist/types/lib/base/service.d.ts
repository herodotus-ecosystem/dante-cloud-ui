import { AxiosHttpResult, BaseMongoEntity, Pageable, Page, Conditions } from '../../declarations';
import { Service } from '@herodotus-cloud/core';
export declare abstract class BaseMongoService<E extends BaseMongoEntity> extends Service {
    private getConditionAddress;
    private getListAddress;
    fetchByPage(params: Pageable, others?: {}): Promise<AxiosHttpResult<Page<E>>>;
    fetchAll(params?: Conditions): Promise<AxiosHttpResult<E[]>>;
    fetchById(id: string): Promise<AxiosHttpResult<E>>;
    saveOrUpdate(data: E): Promise<AxiosHttpResult<E>>;
    delete(id: string): Promise<AxiosHttpResult<string>>;
}
