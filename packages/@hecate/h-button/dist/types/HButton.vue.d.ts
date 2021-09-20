import { Vue } from 'vue-property-decorator';
export default class HButton extends Vue {
    readonly icon: boolean;
    readonly disabled: boolean;
    readonly color?: string;
    readonly iconName?: string;
    readonly tooltip?: string;
    readonly text?: string;
    readonly href?: string;
    private handleClick;
}
//# sourceMappingURL=HButton.vue?rollup-plugin-vue=script.d.ts.map