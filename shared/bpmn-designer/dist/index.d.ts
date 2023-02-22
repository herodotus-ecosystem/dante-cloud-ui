declare module 'bpmn-js/lib/Modeler';
declare module 'bpmn-js/lib/Viewer';
declare module 'bpmn-js-properties-panel';
declare module 'bpmn-js-token-simulation';
declare module 'camunda-bpmn-moddle/lib';
declare module 'camunda-bpmn-moddle/resources/camunda';

declare module '*.bpmn?raw' {
  const bpmnValue: any;
  export default bpmnValue;
}
