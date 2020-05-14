<template>
    <v-select outlined :value="status" :items="items" label="数据状态" @change="change($event)"></v-select>
</template>

<script>
export default {
    name: 'HSeleteStatus',

    props: {
        status: Number
    },

    model: {
        prop: 'status',
        event: 'change'
    },

    data: () => ({
        items: [],
    }),

    mounted () {
        this.initialize();
    },

    methods: {
        initialize () {
            this.$storage.getItem('constants').then((result) => {
                let constants = JSON.parse(result);
                this.items = constants.status;
            });
        },

        change ($event) {
            this.$emit("change", $event);
        }
    }
}
</script>
