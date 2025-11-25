import { App } from 'vue';
import { HBpmnDesigner, HBpmnDiagramViewer, HBpmnCodePreviewer } from './components';
export { HBpmnDesigner, HBpmnDiagramViewer, HBpmnCodePreviewer };
export * from './declarations';
export * from './lib/core';
export * from './lib/logic';
export * from './lib/utils';
declare const _default: {
    install: (app: App) => void;
};
export default _default;
