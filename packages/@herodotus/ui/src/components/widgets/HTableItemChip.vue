<template>
    <div>
        <v-chip v-if="status" color="red" dark small>保留数据</v-chip>
        <v-chip v-else color="green" dark small>非保留数据</v-chip>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HTableItemChip extends Vue {
    @Prop({ type: Boolean, default: false }) readonly status?: boolean;
}
</script>
