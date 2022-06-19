import type { SysDepartment, SysEmployee, SysOrganization, AxiosHttpResult } from '/@/lib/declarations';

import { BaseService } from '../base';
import { service, http } from '/@/lib/utils';

class SysOrganizationService extends BaseService<SysOrganization> {
	private static instance = new SysOrganizationService();

	private constructor() {
		super();
	}

	public static getInstance(): SysOrganizationService {
		return this.instance;
	}

	public getBaseAddress(): string {
		return service.getUpms() + '/organization';
	}
}

class SysDepartmentService extends BaseService<SysDepartment> {
	private static instance = new SysDepartmentService();

	private constructor() {
		super();
	}

	public static getInstance(): SysDepartmentService {
		return this.instance;
	}

	public getBaseAddress(): string {
		return service.getUpms() + '/department';
	}
}

class SysEmployeeService extends BaseService<SysEmployee> {
	private static instance = new SysEmployeeService();

	private constructor() {
		super();
	}

	public static getInstance(): SysEmployeeService {
		return this.instance;
	}

	public getBaseAddress(): string {
		return service.getUpms() + '/employee';
	}

	public getEmployeeNamePath(employeeName: string): string {
		return this.getParamPath(this.getBaseAddress(), employeeName);
	}

	public fetchByEmployeeName(employeeName: string): Promise<AxiosHttpResult<SysEmployee>> {
		return http.get<SysEmployee, string>(this.getEmployeeNamePath(employeeName));
	}
}

export function useHrApi() {
	return {
		organization: SysOrganizationService.getInstance(),
		department: SysDepartmentService.getInstance(),
		employee: SysEmployeeService.getInstance(),
	};
}
