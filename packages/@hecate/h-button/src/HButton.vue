<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-btn
                v-if="icon"
                :color="color"
                :icon="icon"
                :href="href"
                :disabled="disabled"
                v-on="on"
                @click="handleClick()"
            >
                <v-icon>{{ iconName }}</v-icon>
            </v-btn>
            <v-btn v-else :color="color" :href="href" :disabled="disabled" v-on="on" @click="handleClick()">
                {{ text }}
            </v-btn>
        </template>
        <span>{{ tooltip }}</span>
    </v-tooltip>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HButton extends Vue {
    @Prop({ type: Boolean, default: false }) readonly icon!: boolean;
    @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
    @Prop(String) readonly color?: string;
    @Prop(String) readonly iconName?: string;
    @Prop(String) readonly tooltip?: string;
    @Prop(String) readonly text?: string;
    @Prop(String) readonly href?: string;

    @Emit('click')
    private handleClick(): void {}
}
</script>
