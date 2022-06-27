import BpmnModeler from 'bpmn-js/lib/Modeler';

import { lodash } from '/@/lib/utils';

import useModelerCreator from './useModelerCreator';
import { log, exception, download, downloadEncode } from '../utils';

export default function useModelerOperator(containerHtmlId: string, panelHtmlId: string, type = 'camunda', simulation = false) {
	let bpmnModeler: InstanceType<typeof BpmnModeler> = {};

	const { createBpmnModeler } = useModelerCreator(containerHtmlId, panelHtmlId, type, simulation);

	const importDiagram = async (diagram: string) => {
		try {
			const result = await bpmnModeler.importXML(diagram);
			const { warnings } = result;
			log('Import Diagram Success !', warnings);
		} catch (error) {
			exception('Could not create BPMN 2.0 diagram!', error);
		}
	};

	const init = (diagram: string) => {
		bpmnModeler = createBpmnModeler();
		importDiagram(diagram);
	};

	const destroy = () => {
		if (!lodash.isEmpty(bpmnModeler)) {
			bpmnModeler.destroy();
			bpmnModeler = {};
		}
	};

	const downloadProcess = async (type: string, name = 'diagram') => {
		try {
			if (type === 'xml' || type === 'bpmn') {
				const { xml } = await bpmnModeler.saveXML();
				const { href, filename } = downloadEncode(type, name, xml);
				download(href, filename);
			} else {
				const { svg } = await bpmnModeler.saveSVG();
				const { href, filename } = downloadEncode('svg', name, svg);
				download(href, filename);
			}
		} catch (error: any) {
			exception('Could not download diagram!', error);
		}
	};

	const downloadProcessAsXml = (name = 'diagram') => {
		downloadProcess('xml', name);
	};

	const downloadProcessAsBpmn = (name = 'diagram') => {
		downloadProcess('bpmn', name);
	};

	const downloadProcessAsSvg = (name = 'diagram') => {
		downloadProcess('svg', name);
	};

	return {
		init,
		destroy,
		importDiagram,
		downloadProcessAsXml,
		downloadProcessAsBpmn,
		downloadProcessAsSvg,
	};
}
