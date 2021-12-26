<template>
    <v-container class="grey lighten-5 pa-0">
        <v-row no-gutters>
            <v-col cols="12" sm="9" md="9">
                <v-toolbar dense>
                    <v-btn-toggle v-model="toggle_multiple" color="primary" dense group multiple>
                        <v-btn :value="1" text>
                            <v-icon>mdi-format-bold</v-icon>
                        </v-btn>

                        <v-btn :value="2" text>
                            <v-icon>mdi-format-italic</v-icon>
                        </v-btn>

                        <v-btn :value="3" text>
                            <v-icon>mdi-format-underline</v-icon>
                        </v-btn>

                        <v-btn :value="4" text>
                            <v-icon>mdi-format-color-fill</v-icon>
                        </v-btn>
                    </v-btn-toggle>

                    <div class="mx-4"></div>

                    <v-btn-toggle v-model="toggle_exclusive" color="primary" dense group>
                        <v-btn :value="1" text>
                            <v-icon>mdi-format-align-left</v-icon>
                        </v-btn>

                        <v-btn :value="2" text>
                            <v-icon>mdi-format-align-center</v-icon>
                        </v-btn>

                        <v-btn :value="3" text>
                            <v-icon>mdi-format-align-right</v-icon>
                        </v-btn>

                        <v-btn :value="4" text>
                            <v-icon>mdi-format-align-justify</v-icon>
                        </v-btn>
                    </v-btn-toggle>
                </v-toolbar>
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
            </v-col>
            <v-col cols="3" md="3">
                <h-property-panel :schema="businessObject"></h-property-panel>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';
import BpmnModeler from 'bpmn-js/lib/Modeler';
// 模拟流转流程
import TokenSimulation from 'bpmn-js-token-simulation';
import {
    TranslateModule,
    CamundaModdleDescriptor,
    ActivitiModdleDescriptor,
    FlowableModdleDescriptor,
    ActivitiModdleExtension,
    CamundaModdleExtension,
    FlowableModdleExtension,
} from './plugins';

import { HPropertyPanel } from './components';

import PropertiesPanelModule from 'bpmn-js-properties-panel'; // 属性面板
import PropertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import diagram from './static/data/diagram.xml';

@Component({
    components: {
        HPropertyPanel,
    },
})
export default class HBpmnModdle extends Vue {
    // 模拟流转
    @Prop({ type: Boolean, default: true }) readonly simulation?: boolean;
    // 键盘操作
    @Prop({ type: Boolean, default: true }) readonly keyboard?: boolean;
    // 支持类型
    @Prop({ type: String, default: 'camunda' }) readonly type?: string;

    private bpmnModeler = {} as InstanceType<typeof BpmnModeler>;
    private element = {};
    public businessObject = {};
    public elementType = '';

    // compute
    get additionalModules() {
        const Modules = [];

        // 翻译模块
        Modules.push(TranslateModule);

        // 模拟流转模块
        if (this.simulation) {
            Modules.push(TokenSimulation);
        }

        // 根据需要的流程类型设置扩展元素构建模块
        // if (this.type === 'camunda') {
        //     Modules.push(CamundaModdleExtension);
        // }
        // if (this.type === 'flowable') {
        //     Modules.push(FlowableModdleExtension);
        // }
        // if (this.type === 'activiti') {
        //     Modules.push(ActivitiModdleExtension);
        // }

        // 左边工具栏以及节点
        Modules.push(PropertiesProviderModule);
        // 右边的工具栏
        Modules.push(PropertiesPanelModule);

        return Modules;
    }

    get moddleExtensions() {
        const Extensions = {};

        // 根据需要的 "流程类型" 设置 对应的解析文件
        if (this.type === 'activiti') {
            Extensions['activiti'] = ActivitiModdleDescriptor;
        }
        if (this.type === 'flowable') {
            Extensions['flowable'] = FlowableModdleDescriptor;
        }
        if (this.type === 'camunda') {
            Extensions['camunda'] = CamundaModdleDescriptor;
        }
        return Extensions;
    }

    private createBpmnModeler(): InstanceType<typeof BpmnModeler> {
        return new BpmnModeler({
            container: '#canvas',
            keyboard: {
                bindTo: document,
            },
            // 添加控制板
            propertiesPanel: {
                parent: '#properties-panel',
            },
            additionalModules: this.additionalModules,
            moddleExtensions: this.moddleExtensions,
        });
    }

    private getCanvas() {
        return this.bpmnModeler.get('canvas');
    }

    private getEventBus() {
        return this.bpmnModeler.get('eventBus');
    }

    private onBusinessObjectChange(businessObject) {
        this.businessObject = businessObject;
    }

    private addEventBusListener(): void {
        const _that = this;
        const EventBus = _that.getEventBus();
        const EventTypes = ['element.click', 'element.changed', 'import.done'];

        EventTypes.forEach((action) => {
            EventBus.on(action, (event) => {
                console.log('[HBM] |- Event Type : ', action);
                console.log('[HBM] |- E : ', event);
                const name = action.replace(/\./g, '-');
                const element = event ? event.element : null;
                this.element = element;
                this.onBusinessObjectChange(element.businessObject);
            });
        });
    }

    private addListeners(): void {
        this.addEventBusListener();
    }

    /**
     * 创建新的图形
     */
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

    private init(): void {
        this.bpmnModeler = this.createBpmnModeler();
        this.createNewDiagram(this.bpmn);
    }

    // Vue 生命周期
    public mounted(): void {
        this.init();
    }

    @Watch('element')
    public onElementChanged(newValue) {
        if (newValue) {
            console.log(newValue);
            console.log(newValue.type);
            this.elementType = newValue.type.split(':')[1] || '';
            this.businessObject = newValue.businessObject;
        }
    }

    public bpmn = diagram;
    public icon = 'justify';
    public toggle_exclusive = 2;
    public toggle_multiple = [1, 2, 3];
    public dropdown_font = [{ text: 'Arial' }, { text: 'Calibri' }, { text: 'Courier' }, { text: 'Verdana' }];
    public dropdown_edit = [{ text: '100%' }, { text: '75%' }, { text: '50%' }, { text: '25%' }, { text: '0%' }];

    public onElementClick(element) {
        console.log('=============== click ==', element);
        this.element = element.businessObject;
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
</style>

