<template>
    <h-button icon :color="color" :icon-name="icon" :tooltip="text"></h-button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ConstantEnum, ConstantDictionary } from '@/lib/declarations';
import { StatusDisplay } from '@/lib/utils';

@Component
export default class HTableItemStatus extends Vue {
    @Prop(Number) readonly type!: number;

    private color = '';
    private icon = '';
    private text = '';
    private statusDisplay: StatusDisplay[] = [];
    private statusItems: ConstantDictionary[] = [];

    private mounted(): void {
        this.initialize();
    }

    private initialize(): void {
        if (this.$lib.lodash.isEmpty(this.statusDisplay)) {
            this.statusDisplay = this.$constants.STATUS_DISPLAY;
        }
        if (this.$lib.lodash.isEmpty(this.statusItems)) {
            this.$enums.getItem(ConstantEnum.STATUS).then((result) => {
                this.statusItems = result;
                if (!this.$lib.lodash.isEmpty(this.statusItems)) {
                    this.parse(this.type);
                }
            });
        }
    }

    private parse(type: number): void {
        this.color = this.statusDisplay[type].color;
        this.icon = this.statusDisplay[type].icon;
        this.text = this.statusItems[type].text;
    }
}
</script>
