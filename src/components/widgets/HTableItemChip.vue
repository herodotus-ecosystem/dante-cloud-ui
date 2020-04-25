<template>
    <div>
        <v-chip v-if="status" color="red" dark small>保留数据</v-chip>
        <v-chip v-else color="green" dark small>非保留数据</v-chip>
    </div>
</template>

<script>
export default {
    name: 'HTableItemChip',

    props: {
        status: {
            type: Boolean,
            default: false
        },
    }
}
</script>
