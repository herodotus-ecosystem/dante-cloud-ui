<template>
    <v-container fluid class="pa-0">
        <v-row>
            <v-col>
                <v-card flat outlined tile>
                    <v-card-title>
                        {{ schema.id }}
                    </v-card-title>

                    <v-divider></v-divider>
                    <v-card-text class="pa-2">
                        <v-expansion-panels focusable mandatory class="mb-4">
                            <h-expansion-panel index="general" header="常规">
                                <h-panel-text-field
                                    v-model="schema.id"
                                    label="Id"
                                    tooltip="这映射到流程定义键"
                                ></h-panel-text-field>
                                <h-panel-text-field v-model="schema.name" label="名称"></h-panel-text-field>
                            </h-expansion-panel>
                            <h-expansion-panel index="general2" header="常规">
                                <h-panel-text-field
                                    v-model="schema.id"
                                    label="Id"
                                ></h-panel-text-field> </h-expansion-panel
                        ></v-expansion-panels>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>


<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';

import { HExpansionPanel } from './layouts';
import { HPanelTextField } from './panel';

@Component({
    components: {
        HExpansionPanel,
        HPanelTextField,
    },
})
export default class HPropertyPanel extends Vue {
    // 基础数据
    @Prop({ type: Object, required: true, default: () => {} }) readonly schema;
}
</script>

<style lang="scss">
</style>
