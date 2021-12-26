import { Vue } from 'vue-property-decorator';
export default class HBpmnModdle extends Vue {
    readonly simulation?: boolean;
    readonly keyboard?: boolean;
    readonly type?: string;
    private bpmnModeler;
    private element;
    businessObject: {};
    elementType: string;
    get additionalModules(): any[];
    get moddleExtensions(): {};
    private createBpmnModeler;
    private getCanvas;
    private getEventBus;
    private onBusinessObjectChange;
    private addEventBusListener;
    private addListeners;
    /**
     * 创建新的图形
     */
    private createNewDiagram;
    private init;
    mounted(): void;
    onElementChanged(newValue: any): void;
    bpmn: any;
    icon: string;
    toggle_exclusive: number;
    toggle_multiple: number[];
    dropdown_font: {
        text: string;
    }[];
    dropdown_edit: {
        text: string;
    }[];
    onElementClick(element: any): void;
}
//# sourceMappingURL=HBpmnModdle.vue?rollup-plugin-vue=script.d.ts.map