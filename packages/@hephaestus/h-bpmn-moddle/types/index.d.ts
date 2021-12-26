declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}

declare module '@hepheastus/h-bpmn-moddle';

declare module '*.json' {
    const json: any;
    export default json;
}

declare module '*.xml' {
    const bpmnValue: any;
    export default bpmnValue;
}
