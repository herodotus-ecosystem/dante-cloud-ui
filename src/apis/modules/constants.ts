import type { ConstantDictionary } from '/@/lib/declarations';

import { BaseService } from '../base';
import { service } from '/@/lib/utils';

class UaaConstantService extends BaseService<Dictionary<ConstantDictionary[]>> {
	private static instance = new UaaConstantService();

	private constructor() {
		super();
	}

	public static getInstance(): UaaConstantService {
		return this.instance;
	}

	public getBaseAddress(): string {
		return service.getUaa() + '/authorize/constant/enums';
	}
}

class UpmsConstantService extends BaseService<Dictionary<ConstantDictionary[]>> {
	private static instance = new UpmsConstantService();

	private constructor() {
		super();
	}

	public static getInstance(): UpmsConstantService {
		return this.instance;
	}

	public getBaseAddress(): string {
		return service.getUpms() + '/constants/enums';
	}
}

export function useContantsApi() {
	return {
		uaa: UaaConstantService.getInstance(),
		upms: UpmsConstantService.getInstance(),
	};
}
