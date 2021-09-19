declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}

declare module 'camunda-bpmn-moddle/resources/camunda';

declare module '@hecate/h-bpmn-moddle';

declare module '*.xml' {
    const bpmnValue: any;
    export default bpmnValue;
}
