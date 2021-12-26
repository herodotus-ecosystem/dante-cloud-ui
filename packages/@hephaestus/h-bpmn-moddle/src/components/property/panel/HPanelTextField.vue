<template>
    <v-list-item dense class="pa-0">
        <v-list-item-content>
            <v-text-field
                v-model="inputValue"
                :label="label"
                :disabled="disabled"
                outlined
                dense
                hide-details
                clearable
                class="ml-1 pr-2"
            ></v-text-field>
        </v-list-item-content>
        <h-panel-tooltip :content="tooltip"></h-panel-tooltip>
    </v-list-item>
</template>

<script lang="ts">
import { Component, VModel, Prop, Vue } from 'vue-property-decorator';
import HPanelTooltip from './HPanelTooltip.vue';

@Component({
    components: {
        HPanelTooltip,
    },
})
export default class HPanelTextField extends Vue {
    @VModel({ type: String }) inputValue!: string;

    @Prop({ type: String, default: '' }) readonly label?: string;
    @Prop({ type: String, default: '' }) readonly tooltip?: string;
    @Prop({ type: Boolean, default: false }) readonly disabled?: boolean;
}
</script>
