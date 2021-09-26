import { Vue } from 'vue-property-decorator';
export default class HBpmnModdle extends Vue {
    value: string;
    private diagram;
    private bpmnModeler;
    private scale;
    private element;
    private fileName;
    private mounted;
    private beforeDestroy;
    private onValueChange;
    private onModelChange;
    private init;
    private createBpmnModeler;
    private createNewDiagram;
    private addListeners;
    private addModelerListener;
    private addEventBusListener;
    private elementChanged;
    private loadLocalDiagram;
    private showInputFileNameDialog;
    private handleUpload;
    private createFormData;
    private checkFileName;
    getCanvas(): any;
    getCommandStack(): any;
    getElementRegistry(): any;
    getEventBus(): any;
    getShape(id: string): any;
    /**
     * 判断是否是无效的值
     */
    isInvalid(param: string): boolean;
    /**
     * // 判断是否是线
     */
    isSequenceFlow(type: string): boolean;
    saveSVG(): Promise<void>;
    saveXML(): Promise<void>;
    handleRedo(): void;
    handleUndo(): void;
    handleZoom(radio: number): void;
    private createDownloadLink;
    private download;
}
//# sourceMappingURL=HBpmnModdle.vue?rollup-plugin-vue=script.d.ts.map