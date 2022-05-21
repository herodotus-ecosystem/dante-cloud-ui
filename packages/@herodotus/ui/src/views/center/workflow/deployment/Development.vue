<template>
    <h-bpmn-moddle v-model="bpmn"></h-bpmn-moddle>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { HContentPanel } from '@/components';
import diagram from '../../../../static/data/bpmn/diagram.bpmn';

@Component({
    components: {
        HContentPanel,
    },
})
export default class ModelerDevelopment extends Vue {
    public bpmn = diagram;
    private name = '';
    private id = '';
}
</script>
