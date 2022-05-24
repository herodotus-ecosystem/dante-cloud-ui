import type { Entity, AxiosHttpResult, Pageable, Page } from '/@/lib/declarations';

import { http, lodash, variables } from '/@/lib/utils';
import { ContentType } from '/@/lib/enums';

export abstract class Service {
	abstract getBaseAddress(): string;

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

	public fetch(params = {}): Promise<AxiosHttpResult<R>> {
		return http.get(this.getBaseAddress(), params);
	}

	public fetchByPage(params: Pageable, others = {}): Promise<AxiosHttpResult<Page<R>>> {
		if (lodash.isEmpty(others)) {
			return http.get<Page<R>, Pageable>(this.getBaseAddress(), params);
		} else {
			const fullParams = Object.assign(params, others);
			return http.get<Page<R>, Pageable>(this.getConditionAddress(), fullParams);
		}
	}

	public fetchAll(params: Dictionary<string> = {}): Promise<AxiosHttpResult<R[]>> {
		return http.get<R[], Dictionary<string>>(this.getListAddress(), params);
	}

	public saveOrUpdate(data: R): Promise<AxiosHttpResult<R>> {
		return http.post<R, R>(this.getBaseAddress(), data);
	}

	public delete(id: string): Promise<AxiosHttpResult<string>> {
		return http.delete<string, string>(this.getIdPath(id));
	}

	public assign(data: any): Promise<AxiosHttpResult<R>> {
		return http.put(this.getBaseAddress(), data, {
			contentType: ContentType.URL_ENCODED,
		});
	}
}
