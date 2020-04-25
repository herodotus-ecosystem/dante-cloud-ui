<template>
    <h-table-item-button :color="color" :icon="icon" :tooltip="text"></h-table-item-button>
</template>

<script>
import HTableItemButton from '@/components/widgets/HTableItemButton.vue';

export default {
    name: 'HTableItemStatus',

    props: {
        type: Number
    },

    components: {
        HTableItemButton
    },

    data: () => ({
        upmsConstants: {},
        statusDisplay: [],

        color: '',
        icon: '',
        text: ''
    }),

    mounted () {
        this.initialize();
    },

    methods: {
        initialize () {
            this.$storage.getItem('constants').then((constants) => {
                this.upmsConstants = JSON.parse(constants);
                this.statusDisplay = this.$utils.constants.statusDisplay;
                this.color = this.statusDisplay[this.type].color;
                this.icon = this.statusDisplay[this.type].icon;
                this.text = this.upmsConstants.status[this.type].text;
            });
        },
    }
}
</script>
