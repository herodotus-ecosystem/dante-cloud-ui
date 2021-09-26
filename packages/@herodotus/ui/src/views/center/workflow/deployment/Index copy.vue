<template>
    <h-bpmn-moddle v-model="bpmn"></h-bpmn-moddle>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import diagram from '../../../../../static/data/bpmn/diagram.bpmn';

@Component
export default class Index extends Vue {
    private bpmn = diagram;

    private mounted(): void {
        console.log(this.bpmn);
    }
}
</script>
