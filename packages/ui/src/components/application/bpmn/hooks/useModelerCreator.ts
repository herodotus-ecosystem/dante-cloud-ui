import BpmnModeler from 'bpmn-js/lib/Modeler';
import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule, CamundaPlatformPropertiesProviderModule } from 'bpmn-js-properties-panel'; // 属性面板
import TokenSimulation from 'bpmn-js-token-simulation';
import camundaModdleDescriptors from 'camunda-bpmn-moddle/resources/camunda';

import { Translator } from '../plugins';

/*左边工具栏以及编辑节点的样式*/
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
/*右边工具栏样式*/
import 'bpmn-js-properties-panel/dist/assets/properties-panel.css';
import 'bpmn-js-properties-panel/dist/assets/element-templates.css';

export default function useModelerCreator(containerHtmlId: string, panelHtmlId: string, type = 'camunda') {
	const additionalModules = () => {
		const Modules = [];
		// 翻译模块
		const TranslateModule = {
			translate: ['value', Translator],
		};
		Modules.push(TranslateModule);
		// 模拟流转模块
		Modules.push(TokenSimulation);

		// 根据需要的流程类型设置扩展元素构建模块
		// if (this.type === 'camunda') {
		//     Modules.push(CamundaModdleExtension);
		// }
		// if (this.type === 'flowable') {
		//     Modules.push(FlowableModdleExtension);
		// }
		// if (this.type === 'activiti') {
		//     Modules.push(ActivitiModdleExtension);
		// }
		// 左边工具栏以及节点
		Modules.push(BpmnPropertiesPanelModule);
		// 右边的工具栏
		Modules.push(BpmnPropertiesProviderModule);
		Modules.push(CamundaPlatformPropertiesProviderModule);

		return Modules;
	};

	const moddleExtensions = () => {
		const Extensions = {};

		// 根据需要的 "流程类型" 设置 对应的解析文件
		// if (this.type === 'activiti') {
		//     Extensions['activiti'] = ActivitiModdleDescriptor;
		// }
		// if (this.type === 'flowable') {
		//     Extensions['flowable'] = FlowableModdleDescriptor;
		// }
		if (type === 'camunda') {
			Extensions['camunda'] = camundaModdleDescriptors;
		}
		return Extensions;
	};

	const createBpmnModeler = (): InstanceType<typeof BpmnModeler> => {
		return new BpmnModeler({
			container: containerHtmlId,
			// 添加控制板
			propertiesPanel: {
				parent: panelHtmlId,
			},
			keyboard: { bindTo: document },
			additionalModules: additionalModules(),
			moddleExtensions: moddleExtensions(),
		});
	};

	return {
		createBpmnModeler,
	};
}
