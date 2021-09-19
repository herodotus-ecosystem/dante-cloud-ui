<template>
    <v-container fluid>
        <v-row>
            <v-col class="pa-0">
                <v-card>
                    <v-card-title>{{ element.id }}</v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
    name: 'HPropertyPanel',
})
export default class HPropertyPanel extends Vue {
    @Prop({ type: Object, default: () => {} }) readonly element;

    @Watch('element')
    private onElementChanged(newValue, oldValue) {
        console.log(newValue.businessObject);
    }
}
</script>
