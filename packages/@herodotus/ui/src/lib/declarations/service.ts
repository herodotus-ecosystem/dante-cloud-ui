import { Entity } from './base';
import { BaseBpmnEntity, BaseBpmnQueryParam, BpmnPageableParam } from './entity';
import { RestResponse, Result } from './rest';
import { _http, _constants, HttpContentType, _lib } from '@/lib/utils';

type Page<T extends Entity> = {
    content: T[];
    totalElements: string;
    totalPages: number;
};

type Pageable = {
    pageNumber: number;
    pageSize: number;
};

export abstract class Service {
    abstract getBaseAddress(): string;
}

export abstract class BaseService<T extends Entity> extends Service {
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
            return _http.get<Page<T>>(this.getListAddress(), fullParams);
        }
    }

    public fetchAll(params: Dictionary<string> = {}): Promise<RestResponse<T[]>> {
        return _http.get<T[]>(this.getListAddress(), params);
    }

    public saveOrUpdate(data: T): Promise<Result<T>> {
        return _http.post(this.getBaseAddress(), data);
    }

    public delete(data: any): Promise<RestResponse<T>> {
        return _http.delete(this.getBaseAddress(), data);
    }

    public assign(data: any): Promise<RestResponse<T>> {
        return _http.put(this.getBaseAddress(), data, HttpContentType.URL_ENCODED);
    }
}

export abstract class BaseBpmnService<T extends BaseBpmnEntity, Q extends BaseBpmnQueryParam> extends Service {
    private getCountAddress(): string {
        return this.getBaseAddress() + '/count';
    }

    public count(params: Q = {} as Q): Promise<RestResponse> {
        return _http.get(this.getCountAddress(), params);
    }

    public list(params: BpmnPageableParam<Q> = {} as BpmnPageableParam<Q>): Promise<RestResponse<T>> {
        return _http.get(this.getBaseAddress(), params);
    }

    private getListAddress(): string {
        return this.getBaseAddress() + '/list';
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

    public delete(data: any): Promise<RestResponse<T>> {
        return _http.delete(this.getBaseAddress(), data);
    }

    public assign(data: any): Promise<RestResponse<T>> {
        return _http.put(this.getBaseAddress(), data, HttpContentType.URL_ENCODED);
    }
}

export { _constants };
