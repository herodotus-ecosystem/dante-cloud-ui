<template>
    <v-list-item-action v-if="content">
        <v-tooltip left max-width="200px">
            <template v-slot:activator="{ on, attrs }">
                <v-icon color="grey lighten-1" dark v-bind="attrs" v-on="on">mdi-information</v-icon>
            </template>
            <span>{{ content }}</span>
        </v-tooltip>
    </v-list-item-action>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HPanelTooltip extends Vue {
    @Prop({ type: String, required: true, default: '' }) readonly content!: string;
}
</script>
