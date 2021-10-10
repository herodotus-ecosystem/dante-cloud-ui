import { Entity } from './base';
import { BaseBpmnEntity, BaseBpmnParam, BpmnPageableParam } from './entity';
import { RestResponse, Result } from './rest';
import { _http, _constants, HttpContentType, _lib } from '@/lib/utils';

export type Page<T extends Entity> = {
    content: T[];
    totalElements: string;
    totalPages: number;
};

export type Pageable = {
    pageNumber: number;
    pageSize: number;
};

export abstract class Service {
    abstract getBaseAddress(): string;

    protected getParamPath(path: string, param: string): string {
        return path + '/' + param;
    }

    protected getIdPath(id: string): string {
        return this.getParamPath(this.getBaseAddress(), id);
    }
}

export abstract class BaseService<T extends Entity> extends Service {
    private getConditionAddress(): string {
        return this.getBaseAddress() + '/condition';
    }

    private getListAddress(): string {
        return this.getBaseAddress() + '/list';
    }

    public fetch(params = {}): Promise<RestResponse<T>> {
        return _http.get<T>(this.getBaseAddress(), params);
    }

    public fetchByPage(params: Pageable, others = {}): Promise<RestResponse<Page<T>>> {
        if (_lib.lodash.isEmpty(others)) {
            return _http.get<Page<T>>(this.getBaseAddress(), params);
        } else {
            const fullParams = Object.assign(params, others);
            return _http.get<Page<T>>(this.getConditionAddress(), fullParams);
        }
    }

    public fetchAll(params: Dictionary<string> = {}): Promise<RestResponse<T[]>> {
        return _http.get<T[]>(this.getListAddress(), params);
    }

    public saveOrUpdate(data: T): Promise<Result<T>> {
        return _http.post(this.getBaseAddress(), data);
    }

    public delete(id: string): Promise<RestResponse<T>> {
        return _http.delete(this.getIdPath(id));
    }

    public assign(data: any): Promise<RestResponse<T>> {
        return _http.put(this.getBaseAddress(), data, HttpContentType.URL_ENCODED);
    }
}

export abstract class BaseBpmnService<T extends BaseBpmnEntity, Q extends BaseBpmnParam> extends Service {
    private getCountAddress(): string {
        return this.getBaseAddress() + '/count';
    }

    private getListAddress(): string {
        return this.getBaseAddress() + '/list';
    }

    public count(params: Q = {} as Q): Promise<RestResponse> {
        return _http.get(this.getCountAddress(), params);
    }

    public fetchById(id: string, params: Q = {} as Q): Promise<RestResponse<T>> {
        return _http.get<T>(this.getIdPath(id), params);
    }

    public delete(id: string): Promise<RestResponse<T>> {
        return _http.delete(this.getIdPath(id));
    }

    public list(params: BpmnPageableParam<Q> = {} as BpmnPageableParam<Q>): Promise<RestResponse<T>> {
        return _http.get(this.getBaseAddress(), params);
    }

    public fetchByPage(params: Pageable, others = {}): Promise<RestResponse<Page<T>>> {
        if (_lib.lodash.isEmpty(others)) {
            return _http.get<Page<T>>(this.getBaseAddress(), params);
        } else {
            const fullParams = Object.assign(params, others);
            return _http.get<Page<T>>(this.getListAddress(), fullParams);
        }
    }

    public fetchAll(params: Dictionary<string> = {}): Promise<RestResponse<T[]>> {
        return _http.get<T[]>(this.getListAddress(), params);
    }

    public saveOrUpdate(data: T): Promise<Result<T>> {
        return _http.post(this.getBaseAddress(), data);
    }

    public assign(data: any): Promise<RestResponse<T>> {
        return _http.put(this.getBaseAddress(), data, HttpContentType.URL_ENCODED);
    }
}

export { _constants };
