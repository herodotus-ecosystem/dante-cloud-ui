<template>
    <v-list-item-avatar>
        <v-icon :class="colorSwitcher + ' white--text'">{{ iconSwitcher }}</v-icon>
    </v-list-item-avatar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { HTTP } from '@/components/display';

@Component
export default class HAuthorizeAvatar extends Vue {
    @Prop({ type: String, required: true, default: 'GET' }) type!: string;

    get colorSwitcher(): string {
        return HTTP.colorSwitcher(this.type);
    }

    get iconSwitcher(): string {
        return HTTP.iconSwitcher(this.type);
    }
}
</script>
