<template>

    <v-row>
        <v-col cols="10">
            <v-toolbar flat dense>
                <h-tooltip-icon-btn icon="mdi-undo-variant" tooltip="撤销(Undo)" @click="handleUndo"></h-tooltip-icon-btn>
                <h-tooltip-icon-btn icon="mdi-redo-variant" tooltip="恢复(Redo)" @click="handleRedo" btn-class="ml-1"></h-tooltip-icon-btn>
                <h-tooltip-icon-btn icon="mdi-magnify-plus-outline" tooltip="放大" @click="handleZoom(0.1)" btn-class="ml-1"></h-tooltip-icon-btn>
                <h-tooltip-icon-btn icon="mdi-magnify-minus-outline" tooltip="缩小" @click="handleZoom(-0.1)" btn-class="ml-1"></h-tooltip-icon-btn>
                <h-tooltip-icon-btn icon="mdi-cloud-upload-outline" tooltip="部署" @click="handleZoom(-0.1)" btn-class="ml-1"></h-tooltip-icon-btn>
            </v-toolbar>
            <div class="containers" ref="content">
                <div class="canvas" ref="canvas"></div>
            </div>
        </v-col>
        <v-col cols="2">
            <v-row justify="start">
                <v-col cols="12" md="6">
                    <div id="js-properties-panel" class="panel"></div>
                </v-col>
            </v-row>
        </v-col>
    </v-row>

</template>

<script>
import BpmnModeler from 'bpmn-js/lib/Modeler';
import PropertiesPanelModule from 'bpmn-js-properties-panel'; // 属性面板
import PropertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import CamundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'; // 扩展属性
import BpmnTranslate from '../../../../locales/bpmn-js'

import HTooltipIconBtn from '@/components/widgets/HTooltipIconBtn.vue';

export default {
    components: {
        HTooltipIconBtn
    },

    data: () => ({
        bpmnModeler: null,
        diagramXML: null,
        diagramSVG: null,
        scale: 1
    }),

    mounted () {
        this.bpmnModeler = this.getModeler();
        const _that = this;
        this.bpmnModeler.on('commandStack.changed', function () {
            _that.saveSVG().then(svg => {
                console.log(svg);
                if (svg) {
                    this.diagramSVG = svg;
                }
            });


            _that.saveXML().then(xml => {
                console.log(xml);
                if (xml) {
                    this.diagramXML = xml;
                }
            });
        });
        this.createDiagram();
    },

    methods: {
        createModeler (canvas, panel) {
            return new BpmnModeler({
                container: canvas,
                // 添加控制板
                propertiesPanel: {
                    parent: panel
                },
                additionalModules: [
                    // 左边工具栏以及节点
                    PropertiesProviderModule,
                    // 右边的工具栏
                    PropertiesPanelModule,
                    //汉化
                    BpmnTranslate
                ],
                moddleExtensions: {
                    camunda: CamundaModdleDescriptor
                }
            });
        },

        getModeler () {
            // 获取到属性ref为“canvas”的dom节点
            const canvas = this.$refs.canvas;
            const panel = '#js-properties-panel';
            return this.createModeler(canvas, panel);
        },

        async transformCanvas (xml) {
            // 将字符串转换成图显示出来
            try {
                const { warnings } = await this.bpmnModeler.importXML(xml);

                let canvas = this.bpmnModeler.get('canvas');
                canvas.zoom('fit-viewport');

                console.log('rendered');
            } catch (err) {
                console.log('error rendering', err);
            }
        },

        async createDiagram () {
            try {
                const result = await this.bpmnModeler.createDiagram();
                const { warnings } = result;
                console.log(warnings);
            } catch (err) {
                console.log(err.message, err.warnings);
            }
        },

        async saveSVG () {
            try {
                const result = await this.bpmnModeler.saveSVG({ format: true });
                const { svg } = result;
                console.log(svg);
            } catch (err) {
                console.error('Error happened saving svg: ', err);
            }
        },
        async saveXML () {
            try {
                const result = await this.bpmnModeler.saveXML({ format: true });
                const { xml } = result;
                console.log(xml);
            } catch (err) {
                console.error('Error happened saving xml: ', err);
            }
        },
        // 前进
        handleRedo () {
            this.bpmnModeler.get('commandStack').redo();
        },
        // 后退
        handleUndo () {
            this.bpmnModeler.get('commandStack').undo();
        },
        // 放大缩小
        handleZoom (radio) {
            let newScale = 1.0;
            if (radio) {
                if (this.scale + radio <= 0.2) {
                    newScale = 0.2;
                } else {
                    newScale = this.scale + radio;
                }
            }
            this.bpmnModeler.get('canvas').zoom(newScale);
            this.scale = newScale;
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
// @import '~bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
@import '../../../../static/bpmn/panel.css';

.bjs-powered-by {
    display: none;
}

.bpp-properties-panel {
    overflow: auto;
    height: calc(100vh - 200px);
    border: 1px solid #dedede;
    background-color: #f8f8f8;
}

.containers {
    background-color: #ffffff;
    width: 100%;
    height: calc(100vh - 200px);
}
.canvas {
    width: 100%;
    height: 100%;
}
.panel {
    width: 250px;
}
</style>
