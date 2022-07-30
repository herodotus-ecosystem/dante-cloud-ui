import { variables } from './variables';
class Endpoint {
	private uaaAddress: string = '';
	private upmsAddress: string = '';
	private bpmnAddress: string = '';
	private cmdbAddress: string = '';

	private static instance = new Endpoint();

	public static getInstance(): Endpoint {
		return this.instance;
	}

	private constructor() {
		this.switch(variables.getProject());
	}

	private switch(type: string) {
		switch (type) {
			case 'dante':
				this.uaaAddress = '/dante-cloud-uaa';
				this.upmsAddress = '/dante-cloud-upms';
				this.bpmnAddress = '/dante-cloud-bpmn-ability/engine-rest';
				this.cmdbAddress = '/dante-cloud-cmdb-ability';
				break;
			case 'herodotus':
				this.uaaAddress = '/herodotus-cloud-uaa';
				this.upmsAddress = '/herodotus-cloud-upms';
				this.bpmnAddress = '/herodotus-cloud-bpmn-ability/engine-rest';
				this.cmdbAddress = '/herodotus-cloud-cmdb-ability';
				break;
			default:
				this.uaaAddress = '';
				this.upmsAddress = '';
				this.bpmnAddress = '/engine-rest';
				this.cmdbAddress = '';
		}
	}

	public getUaa(): string {
		return this.uaaAddress;
	}

	public getUpms(): string {
		return this.upmsAddress;
	}

	public getBpmn(): string {
		return this.bpmnAddress;
	}

	public getCmdb(): string {
		return this.cmdbAddress;
	}
}

export const service: Endpoint = Endpoint.getInstance();
