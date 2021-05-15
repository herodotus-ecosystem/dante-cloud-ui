<template>
    <v-select outlined small-chips clearable :multiple="multiple" :value="value" :items="items" :label="label" :placeholder="placeholder" :errorMessages="errorMessages" @change="change($event)"></v-select>
</template>

<script>
export default {
    name: 'HDictionarySelect',

    props: {
        value: [Number, String, Array],
        errorMessages: [String, Array],
        multiple: {
            type: Boolean,
            default: false
        },
        dictionary: {
            type: String,
            require: true
        },
        label: {
            type: String,
            require: true
        },
        placeholder: String
    },

    model: {
        prop: 'value',
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
                this.items = constants[this.dictionary];
            });
        },

        change ($event) {
            this.$emit("change", $event);
        }
    }
}
</script>
