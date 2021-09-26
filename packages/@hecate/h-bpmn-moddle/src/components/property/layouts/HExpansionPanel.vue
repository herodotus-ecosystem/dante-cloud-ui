<template>
    <v-expansion-panel :key="index">
        <v-expansion-panel-header>{{ header }}</v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-list class="ml-1 mr-1">
                <slot></slot>
            </v-list>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    name: 'HExpansionPanel',
})
export default class HExpansionPanel extends Vue {
    @Prop({ type: String, required: true }) readonly index!: string;
    @Prop({ type: String, required: true }) readonly header!: string;
}
</script>
