const { rollups } = require('../../../scripts');

/**
 * globals配置写法与import配置写法正好相反
 * 例如：
 * Main.js:
 *
 * import React from 'react';
 * import ReactDOM from 'react-dom';
 *
 * config.js
 *
 * export default {
 *   external: ['react', 'react-dom'],
 *   globals: {
 *     'react': 'React',
 *     'react-dom': 'ReactDOM'
 *   },
 * };
 */

const configs = {
    types: ['umd', 'esm', 'iife'],
    globals: {
        '@hecate/utils': 'utils',
        '@hecate/h-button': 'HButton',
        'bpmn-js/lib/Modeler': 'BpmnModeler',
        'bpmn-js-properties-panel': 'PropertiesPanelModule',
        'bpmn-js-token-simulation': 'TokenSimulation',
        'bpmn-js-properties-panel/lib/provider/camunda': 'PropertiesProviderModule',
        './src/plugins/descriptor/camunda.json': 'CamundaModdleDescriptor',
        './src/plugins/descriptor/flowable.json': 'FlowableModdleDescriptor',
        './src/plugins/descriptor/activiti.json': 'ActivitiModdleDescriptor',
    },
    external: [
        // 不被打包的库，比如在项目中会被引入
        '@hecate/utils',
        '@hecate/h-button',
        'bpmn-js/lib/Modeler',
        'bpmn-js-properties-panel',
        'bpmn-js-token-simulation',
        'bpmn-js-properties-panel/lib/provider/camunda',
        './camunda.json',
        './flowable.json',
        './activiti.json',
    ],
};

const entries = (() => {
    let entries = {};
    entries['main'] = './src/index.ts';

    let result = rollups.establish(entries, configs);
    return result;
})();

export default entries;
