<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-btn :class="btnClass" :color="color" v-on="on" @click="handleClick()">
                <v-icon>{{ icon }}</v-icon>
            </v-btn>
        </template>
        <span>{{ tooltip }}</span>
    </v-tooltip>
</template>

<script>
export default {
    name: 'HTooltipIconBtn',

    props: {
        btnClass: String,
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
