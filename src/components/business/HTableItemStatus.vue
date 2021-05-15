<template>
    <h-table-item-btn :color="color" :icon="icon" :tooltip="text"></h-table-item-btn>
</template>

<script>
import HTableItemBtn from '@/components/widgets/HTableItemBtn.vue';

export default {
    name: 'HTableItemStatus',

    props: {
        type: Number
    },

    components: {
        HTableItemBtn
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
