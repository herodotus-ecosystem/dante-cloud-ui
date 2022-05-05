import { variables } from './variables';
class Endpoint {
	private uaaAddress: string = '';
	private upmsAddress: string = '';
	private bpmnAddress: string = '';

	private static instance = new Endpoint();

	public static getInstance(): Endpoint {
		return this.instance;
	}

	private constructor() {
		this.switch(variables.getProject());
	}

	private switch(type: string) {
		switch (type) {
			case 'eurynome':
				this.uaaAddress = '/eurynome-cloud-uaa';
				this.upmsAddress = '/eurynome-cloud-upms';
				this.bpmnAddress = '/eurynome-cloud-bpmn-ability/engine-rest';
				break;
			case 'herodotus':
				this.uaaAddress = '/herodotus-cloud-uaa';
				this.upmsAddress = '/herodotus-cloud-upms';
				this.bpmnAddress = '/herodotus-cloud-bpmn-ability/engine-rest';
				break;
			default:
				this.uaaAddress = '';
				this.upmsAddress = '';
				this.bpmnAddress = '/engine-rest';
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
}

export const service: Endpoint = Endpoint.getInstance();
