<template>
    <v-container class="pa-0" grid-list-xl fluid>
        <v-row align="center" dense>
            <v-col cols="12" md="4">
                <v-card class="d-flex align-center mb-7" flat min-height="56px">
                    <v-card flat>{{ label }}</v-card>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-text-field v-model="amount" outlined label="数值" min="1" max="100" type="number"></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
                <v-select
                    v-model="unit"
                    outlined
                    small-chips
                    :items="items"
                    item-text="text"
                    item-value="value"
                    label="单位"
                ></v-select>
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

@Component
export default class HDuration extends Vue {
    @Prop(String) value!: string;
    @Prop({ type: String, default: '设置时间周期' }) readonly label?: string;

    items = [
        { text: '天', value: 'days' },
        { text: '小时', value: 'hours' },
        { text: '分', value: 'minutes' },
        { text: '秒', value: 'seconds' },
    ];

    amount = 0;
    unit = '';

    @Watch('value', { immediate: true })
    onValueChange(newValue: string) {
        this.durationToData(newValue);
    }

    @Watch('amount')
    onAmountChange(newValue: number) {
        this.dataToDuration(newValue, this.unit);
    }

    @Watch('unit')
    onUnitChange(newValue: string) {
        this.dataToDuration(this.amount, newValue);
    }

    private durationToData(value: string) {
        let duration = this.$lib.moment.duration(value);
        if (duration && duration._data) {
            for (let item in duration._data) {
                let key = item;
                let value = duration._data[key];
                if (value) {
                    this.amount = value;
                    this.unit = key;
                }
            }
        }
    }
    private dataToDuration(amount: number, unit: string): void {
        if (amount && unit) {
            let value = this.$lib.moment.duration(amount, unit).toISOString();
            this.$emit('input', value);
        } else {
            this.$emit('input', this.value);
        }
    }
}
</script>
