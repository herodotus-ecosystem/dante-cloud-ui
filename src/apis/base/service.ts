import type { Entity, AxiosHttpResult, Pageable, Page } from '/@/lib/declarations';

import { http, lodash, variables } from '/@/lib/utils';

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
}
