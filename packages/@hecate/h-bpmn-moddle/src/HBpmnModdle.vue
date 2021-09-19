<template>
    <v-app id="generator">
        <v-app-bar dense clipped-left clipped-right>
            <h-button icon icon-name="mdi-undo-variant" tooltip="撤销(Undo)" @click="handleUndo"></h-button>
            <h-button
                icon
                icon-name="mdi-redo-variant"
                tooltip="恢复(Redo)"
                @click="handleRedo"
                class="ml-1"
            ></h-button>
            <h-button
                icon
                icon-name="mdi-magnify-plus-outline"
                tooltip="放大"
                @click="handleZoom(0.1)"
                class="ml-1"
            ></h-button>
            <h-button
                icon
                icon-name="mdi-magnify-minus-outline"
                tooltip="缩小"
                @click="handleZoom(-0.1)"
                class="ml-1"
            ></h-button>
            <h-button
                icon
                icon-name="mdi-cloud-upload-outline"
                tooltip="部署"
                @click="handleUpload()"
                class="ml-1"
            ></h-button>
            <h-button
                icon
                icon-name="mdi-folder-open-outline"
                tooltip="打开"
                @click="$refs.loadXml.click()"
                class="ml-1"
            ></h-button>
            <input
                type="file"
                ref="loadXml"
                class="file-input"
                @change="loadLocalDiagram()"
                accept=".bpmn, .bpmn20.xml"
            />
            <h-button icon icon-name="mdi-xml" tooltip="保存XML" @click="saveXML()" class="ml-1"></h-button>
            <h-button icon icon-name="mdi-svg" tooltip="保存SVG" @click="saveSVG()" class="ml-1"></h-button>
            <v-spacer></v-spacer>
            <!-- <v-toolbar-title>Bpmn Modeler</v-toolbar-title> -->
            <v-btn large icon>
                <v-icon>mdi-volleyball</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main class="pa-0">
            <v-container grid-list-xl fluid>
                <v-row>
                    <v-col cols="10" class="pa-0">
                        <div class="containers">
                            <div id="canvas" class="canvas"></div>
                        </div>
                    </v-col>
                    <v-col cols="2" class="pa-0">
                        <div id="properties-panel" class="properties-panel"></div>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>

        <!-- <v-navigation-drawer clipped app hide-overlay right width="360px">
            <h-property-panel :element="element"></h-property-panel>
        </v-navigation-drawer> -->
    </v-app>
</template>


<script lang="ts">
import { Component, Prop, VModel, Vue, Watch } from 'vue-property-decorator';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import PropertiesPanelModule from 'bpmn-js-properties-panel'; // 属性面板
import PropertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import CamundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import HButton from '@hecate/h-button';
import { library } from '@hecate/utils';
import { HPropertyPanel } from './components/';
import { BpmnTranslate } from './lib';

@Component({
    name: 'HBpmnModdle',
    components: {
        HButton,
        HPropertyPanel,
    },
})
export default class HBpmnModdle extends Vue {
    @Prop(String) value!: string;

    private diagram = '';
    private bpmnModeler = {} as InstanceType<typeof BpmnModeler>;
    private scale = 1;
    private element = {};
    private fileName = '';

    private mounted(): void {
        this.init();
    }

    private beforeDestroy(): void {
        this.bpmnModeler.destroy();
    }

    @Watch('value', { immediate: true })
    private onValueChange(newValue: string, oldValue: string) {
        this.diagram = newValue;
    }
    @Watch('diagram')
    private onModelChange(newValue: string, oldValue: string) {
        this.$emit('input', newValue);
    }

    // Bpmn-js 相关代码
    private init(): void {
        this.bpmnModeler = this.createBpmnModeler();
        this.createNewDiagram(this.diagram);
    }

    private createBpmnModeler(): InstanceType<typeof BpmnModeler> {
        return new BpmnModeler({
            container: '#canvas',
            keyboard: {
                bindTo: window,
            },
            // 添加控制板
            propertiesPanel: {
                parent: '#properties-panel',
            },
            additionalModules: [
                // 左边工具栏以及节点
                PropertiesProviderModule,
                // 右边的工具栏
                PropertiesPanelModule,
                // 汉化
                BpmnTranslate,
            ],
            moddleExtensions: {
                camunda: CamundaModdleDescriptor,
            },
        });
    }

    private async createNewDiagram(diagram: string): Promise<void> {
        try {
            let result = await this.bpmnModeler.importXML(diagram);
            const { warnings } = result;

            this.addListeners();

            console.log('[HBM] |- Create New Diagram Success !', warnings);

            let canvas = this.getCanvas();
            canvas.zoom('fit-viewport', 'auto');

            this.element = canvas.getRootElement();
        } catch (err) {
            const { warnings, message } = err;
            console.error('[HBM] |- Could not create BPMN 2.0 diagram!', warnings, message);
        }
    }

    private addListeners(): void {
        this.addModelerListener();
        this.addEventBusListener();
    }
    // 监听 modeler
    private addModelerListener(): void {
        // const _that = this;
        // // 这里我是用了一个forEach给modeler上添加要绑定的事件
        // const events = ['shape.added', 'shape.move.end', 'shape.removed'];
        // events.forEach((event) => {
        //     _that.bpmnModeler.on(event, (e) => {
        //         console.log('[HBM] |- (1) Event is: ', event);
        //         console.log('[HBM] |- (2) Param is: ', e);
        //         let shape = e.element ? _that.getShape(e.element.id) : e.shape;
        //         console.log('[HBM] |- (3) Shape is: ', shape);
        //         if (event === 'shape.added') {
        //             console.log('[HBM] |- Add shape.');
        //         } else if (event === 'shape.move.end') {
        //             console.log('[HBM] |- Move shape');
        //         } else if (event === 'shape.removed') {
        //             console.log('[HBM] |- Remove shape');
        //         }
        //     });
        // });
    }

    private addEventBusListener(): void {
        const _that = this;
        const eventBus = _that.getEventBus();
        const eventTypes = ['element.click', 'element.changed'];

        eventTypes.forEach((eventType) => {
            eventBus.on(eventType, (e) => {
                console.log('[HBM] |- Event Type : ', eventType);
                console.log('[HBM] |- E : ', e);
                if (!e || e.element.type == 'bpmn:Process') return;
                if (eventType === 'element.changed') {
                    _that.elementChanged(e);
                } else if (eventType === 'element.click') {
                    _that.element = e.element;
                    console.log(e.element.id);
                }
            });
        });
    }

    private elementChanged(e): void {
        const _that = this;
        let shape = _that.getShape(e.element.id);
        this.element = shape;
        if (!shape) {
            // 若是shape为null则表示删除, 无论是shape还是connect删除都调用此处
            console.log('[HBM] |- Invalid shape.');
        } else if (shape.type && !_that.isInvalid(shape.type)) {
            // 由于上面已经用 shape.removed 检测了shape的删除, 因此这里只判断是否是线
            if (_that.isSequenceFlow(shape.type)) {
                console.log('[HBM] |- Changing line.');
            }
        }
    }

    // 自定义相关代码
    private loadLocalDiagram(): void {
        const _that = this;
        const file = (_that.$refs.loadXml as HTMLInputElement).files[0];
        let reader = new FileReader();
        reader.onload = () => {
            _that.diagram = reader.result as string;
            _that.createNewDiagram(_that.diagram);
        };
        reader.readAsText(file);
    }

    private showInputFileNameDialog() {
        return library.Swal.fire({
            title: '请输入文件名',
            input: 'text',
            inputLabel: '保存的文件名',
            inputValue: '',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            inputValidator: (value) => {
                if (!value) {
                    return '请输入文件名!';
                }
            },
        });
    }

    private handleUpload(): void {}

    private createFormData(name, xml, source = '', fileName = '') {
        let formData = new FormData();
        formData.append('deployment-name', name);
        formData.append('enable-duplicate-filtering', 'false');
        formData.append('deploy-changed-only', 'false');
        let deploymentSource = source ? source : 'Middle stage';
        formData.append('deployment-source', deploymentSource);
        let blob = new Blob([xml], { type: 'application/octet-stream' });
        let bpmnFileName = this.checkFileName(fileName, name);
        formData.append('data', blob, bpmnFileName);
        return formData;
    }

    private checkFileName(fileName, defaultName): string {
        let bpmnFileName = fileName ? fileName : defaultName;
        if (bpmnFileName.endWith('.bpmn') || bpmnFileName.endWith('.bpmn20.xml')) {
            return bpmnFileName;
        } else {
            return bpmnFileName + '.bpmn';
        }
    }

    public getCanvas(): any {
        return this.bpmnModeler.get('canvas');
    }

    public getCommandStack(): any {
        return this.bpmnModeler.get('commandStack');
    }

    public getElementRegistry(): any {
        return this.bpmnModeler.get('elementRegistry');
    }

    public getEventBus(): any {
        return this.bpmnModeler.get('eventBus');
    }

    public getShape(id: string): any {
        const elementRegistry = this.getElementRegistry();
        return elementRegistry.get(id);
    }

    /**
     * 判断是否是无效的值
     */
    public isInvalid(param: string): boolean {
        return param === null || param === undefined || param === '';
    }

    /**
     * // 判断是否是线
     */
    public isSequenceFlow(type: string): boolean {
        return type === 'bpmn:SequenceFlow';
    }

    public async saveSVG(): Promise<void> {
        try {
            const result = await this.bpmnModeler.saveSVG({ format: true });
            const { svg } = result;

            this.download(svg, 'svg');
        } catch (err) {
            const { warnings, message } = err;
            console.error('[HBM] |- Error happened saving svg: ', warnings, message);
        }
    }
    public async saveXML(): Promise<void> {
        try {
            const result = await this.bpmnModeler.saveXML({ format: true });
            const { xml } = result;

            this.download(xml, 'xml');
        } catch (err) {
            const { warnings, message } = err;
            console.error('[HBM] |- Error happened saving xml: ', warnings, message);
        }
    }

    // 前进
    public handleRedo(): void {
        this.getCommandStack().redo();
    }
    // 后退
    public handleUndo(): void {
        this.getCommandStack().undo();
    }

    // 放大缩小
    public handleZoom(radio: number): void {
        let newScale = 1.0;
        if (radio) {
            if (this.scale + radio <= 0.2) {
                newScale = 0.2;
            } else {
                newScale = this.scale + radio;
            }
        }
        this.getCanvas().zoom(newScale);
        this.scale = newScale;
    }

    private createDownloadLink(name: string, data: Blob, type = 'xml'): void {
        let downloadLink = document.createElement('a');
        downloadLink.download = name + '.' + type.toLowerCase();
        downloadLink.innerHTML = 'Save BPMN ' + type.toUpperCase;
        downloadLink.href = window.URL.createObjectURL(data);
        downloadLink.onclick = function (event) {
            document.body.removeChild(event.target as HTMLElement);
        };
        downloadLink.style.visibility = 'hidden';
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }

    private async download(data, type = 'xml') {
        let dataType = type.toLowerCase();

        let dataBlob = new Blob([data], {
            type: 'application/bpmn20-xml;charset=UTF-8,',
        });

        if (dataType === 'svg') {
            dataBlob = new Blob([data], {
                type: 'image/svg+xml',
            });
        }

        if (this.fileName) {
            this.createDownloadLink(this.fileName, dataBlob, dataType);
        } else {
            const { value: savedFileName } = await this.showInputFileNameDialog();
            if (savedFileName) {
                this.fileName = savedFileName;
                this.createDownloadLink(savedFileName, dataBlob, dataType);
            }
        }
    }
}
</script>

<style lang="scss">
/*左边工具栏以及编辑节点的样式*/
@import '~bpmn-js/dist/assets/diagram-js.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
/*右边工具栏样式*/
@import '~bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';

.containers {
    background: white;
    overflow: auto;
    background-image: linear-gradient(90deg, rgba(220, 220, 220, 0.5) 6%, transparent 0),
        linear-gradient(rgba(192, 192, 192, 0.5) 6%, transparent 0);
    background-size: 12px 12px;
    width: 100%;
    height: calc(100vh - 50px);
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}
.canvas {
    width: 100%;
    height: 100%;
}

.properties-panel {
    position: absolute;
    width: 100%;
}

.file-input {
    height: 0;
    width: 0;
    visibility: hidden;
}

// 去掉bpmn-js图标
.bjs-powered-by {
    display: none;
}

.bpp-properties-panel {
    overflow: auto;
    height: calc(100vh);
    border: 1px solid #dedede;
    background-color: #f8f8f8;
}
</style>
