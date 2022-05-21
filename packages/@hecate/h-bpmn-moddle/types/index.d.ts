declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}

declare module '@hecate/h-bpmn-moddle';

declare module 'camunda-bpmn-moddle/resources/camunda.json' {
    const CamundaModdleDescriptor: any;
    export default CamundaModdleDescriptor;
}

declare module '*.xml' {
    const bpmnValue: any;
    export default bpmnValue;
}
