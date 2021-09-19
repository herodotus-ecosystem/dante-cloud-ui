<template>
    <v-container :class="containerClass" grid-list-xl fluid>
        <v-row>
            <v-col v-for="(option, index) in settings" :cols="option.cols" :key="index" :class="option.class">
                <slot v-if="option.slot === 'default'"></slot>
                <slot v-else :name="option.slot"></slot>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ContainerOption } from '@/lib/declarations';

type Layout = 'one' | 'two' | 'left-right' | 'right-left' | 'three';

@Component({
    name: 'HContainer',
})
export default class HContainer extends Vue {
    @Prop({ type: Array, default: () => [] })
    readonly options!: ContainerOption[];
    @Prop({ type: String, default: 'pt-0' }) readonly containerClass?: string;
    @Prop({ type: String, default: 'one' }) readonly type!: Layout;

    get settings(): ContainerOption[] {
        if (this.$lib.lodash.isEmpty(this.options)) {
            return this.switchDefaultLayout(this.type);
        } else {
            return this.options;
        }
    }

    private switchDefaultLayout(type: Layout): ContainerOption[] {
        let currentOption: ContainerOption[] = new Array<ContainerOption>();
        switch (type) {
            case 'two':
                currentOption = [
                    { cols: 6, slot: 'default', class: 'pl-10 pr-10' },
                    { cols: 6, slot: 'other', class: 'pl-10 pr-10' },
                ];
                break;
            case 'left-right':
                currentOption = [
                    { cols: 8, slot: 'default', class: 'pl-5 pr-5' },
                    { cols: 4, slot: 'other', class: 'pl-5 pr-5' },
                ];
                break;
            default:
                currentOption = [{ cols: 12, slot: 'default', class: 'pt-0' }];
                break;
        }
        return currentOption;
    }
}
</script>
