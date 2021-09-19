<template>
    <v-alert dense text :type="colorSwitcher" class="mb-0">
        <template v-slot:prepend>
            <v-btn x-small width="70" :color="colorSwitcher" dark class="mr-4">
                {{ method }}
            </v-btn>
        </template>
        <span class="ml-2">{{ url }}</span>

        <template v-slot:append>
            <span>{{ description }}</span>
        </template>
    </v-alert>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { HTTP } from '@/components/display';

@Component
export default class HSwaggerItem extends Vue {
    @Prop({ type: String, required: true, default: 'GET' }) method!: string;
    @Prop({ type: String, required: true, default: '' }) url!: string;
    @Prop({ type: String, required: true, default: '' }) description!: string;

    get colorSwitcher(): string {
        return HTTP.colorSwitcher(this.method);
    }
}
</script>
