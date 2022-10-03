import type {
	SysDepartment,
	SysEmployee,
	SysOrganization,
	SysEmployeeAllocatable,
	AxiosHttpResult,
	Conditions,
	Pageable,
	Page,
	AllocatableRemove,
	AllocatableDeploy,
} from '/@/lib/declarations';

import { ContentTypeEnum } from '/@/lib/enums';

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

	public getAssignedAddress(): string {
		return this.getBaseAddress() + '/assigned';
	}

	public getAllocatableAddress(): string {
		return this.getBaseAddress() + '/allocatable';
	}

	public getEmployeeNamePath(employeeName: string): string {
		return this.getParamPath(this.getBaseAddress(), employeeName);
	}

	public fetchByEmployeeName(employeeName: string): Promise<AxiosHttpResult<SysEmployee>> {
		return http.get<SysEmployee, string>(this.getEmployeeNamePath(employeeName));
	}

	public fetchAssignedByPage(params: Pageable, others: Conditions = {}): Promise<AxiosHttpResult<Page<SysEmployee>>> {
		const fullParams = Object.assign(params, others);
		return http.get<Page<SysEmployee>>(this.getAssignedAddress(), fullParams);
	}

	public deleteAllocatable(data: AllocatableRemove): Promise<AxiosHttpResult<string>> {
		return http.delete(this.getAllocatableAddress(), data);
	}

	public saveAllocatable(data: AllocatableDeploy): Promise<AxiosHttpResult<string>> {
		return http.post(this.getAllocatableAddress(), data);
	}

	public authorizeUser(data: any): Promise<AxiosHttpResult<SysEmployee>> {
		return http.put(this.getBaseAddress(), data, {
			contentType: ContentTypeEnum.URL_ENCODED,
		});
	}
}

/**
 * 为了在人员归属中，尽量使用已有的 hooks，临时定义的无意义service
 */
class SysEmployeeAllocatableService extends BaseService<SysEmployeeAllocatable> {
	private static instance = new SysEmployeeAllocatableService();

	private constructor() {
		super();
	}

	public static getInstance(): SysEmployeeAllocatableService {
		return this.instance;
	}

	public getBaseAddress(): string {
		return service.getUpms() + '/';
	}
}

export function useHrApi() {
	return {
		organization: SysOrganizationService.getInstance(),
		department: SysDepartmentService.getInstance(),
		employee: SysEmployeeService.getInstance(),
		allocatable: SysEmployeeAllocatableService.getInstance(),
	};
}
