<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-icon :class="iconClass" :color="color" v-on="on" @click="handleClick()">
                {{ icon }}
            </v-icon>
        </template>
        <span>{{ tooltip }}</span>
    </v-tooltip>
</template>

<script>
export default {
    name: 'HTableItemBtn',

    props: {
        iconClass: String,
        color: String,
        icon: String,
        tooltip: String
    },

    methods: {
        handleClick () {
            this.$emit('click');
        }
    }
}
</script>
