declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}
declare module 'particles.vue' {
    import Particles from 'particles.vue';
    export default Particles;
}

declare module 'nprogress';

declare module '*.json' {
    const jsonValue: any;
    export default jsonValue;
}

declare module '*.bpmn' {
    const bpmnValue: any;
    export default bpmnValue;
}

declare module 'vue-chartist';
