<template>
    <v-btn :color="color" :class="buttonClass" @click="cancel()">
        <slot></slot>
    </v-btn>
</template>

<script>
export default {
    name: 'HDetailCancelButton',

    props: {
        color: {
            type: String,
            default: 'error'
        },
        buttonClass: {
            type: String,
            default: ''
        }
    },

    methods: {
        cancel () {
            this.$utils.navigation.goBack(this.$route);
        },
    }
};
</script>
