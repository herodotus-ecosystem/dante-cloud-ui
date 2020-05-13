<template>
    <v-btn color="error" @click="cancel()">取消</v-btn>
</template>

<script>
export default {
    name: 'HDetailCancelButton',

    methods: {
        cancel () {
            this.$utils.navigation.goBack(this.$route);
        },
    }
};
</script>
