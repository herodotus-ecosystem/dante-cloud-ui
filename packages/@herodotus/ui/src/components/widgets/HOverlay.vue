<template>
    <v-overlay :value="overlay">
        <v-progress-circular indeterminate :color="color" :size="size"></v-progress-circular>
    </v-overlay>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HOverlay extends Vue {
    @Prop({ type: Number, default: 64 }) readonly size?: number;
    @Prop({ type: String, default: 'primary' }) readonly color?: string;
    @Prop({ type: Boolean, required: true, default: false }) readonly overlay!: boolean;
}
</script>
