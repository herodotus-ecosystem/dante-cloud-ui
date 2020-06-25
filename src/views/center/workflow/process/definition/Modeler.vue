<template>
    <v-row>
        <v-col cols="10">
            <v-overlay :value="overlay">
                <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
            </v-overlay>
            <v-toolbar flat dense>
                <h-tooltip-icon-btn icon="mdi-undo-variant" tooltip="撤销(Undo)" @click="handleUndo"></h-tooltip-icon-btn>
                <h-tooltip-icon-btn icon="mdi-redo-variant" tooltip="恢复(Redo)" @click="handleRedo" btn-class="ml-1"></h-tooltip-icon-btn>
                <h-tooltip-icon-btn icon="mdi-magnify-plus-outline" tooltip="放大" @click="handleZoom(0.1)" btn-class="ml-1"></h-tooltip-icon-btn>
                <h-tooltip-icon-btn icon="mdi-magnify-minus-outline" tooltip="缩小" @click="handleZoom(-0.1)" btn-class="ml-1"></h-tooltip-icon-btn>
                <h-tooltip-icon-btn icon="mdi-cloud-upload-outline" tooltip="部署" @click="handleUpload" btn-class="ml-1"></h-tooltip-icon-btn>
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
import BpmnTranslate from '../../../../../locales/bpmn-js'

import HTooltipIconBtn from '@/components/widgets/HTooltipIconBtn.vue';

export default {
    components: {
        HTooltipIconBtn
    },

    data: () => ({
        bpmnModeler: null,
        diagramXML: null,
        diagramSVG: null,
        scale: 1,
        overlay: false,
        editedItem: {}
    }),

    created () {
        this.editedItem = this.$route.params;
    },

    mounted () {
        const _that = this;
        const canvas = _that.$refs.canvas;
        const panel = '#js-properties-panel';
        _that.bpmnModeler = _that.createModeler(canvas, panel);

        _that.bpmnModeler.on('commandStack.changed', function () {
            _that.saveSVG().then(svg => {
                if (svg) {
                    _that.diagramSVG = svg;
                }
            });

            _that.saveXML().then(xml => {
                if (xml) {
                    _that.diagramXML = xml;
                }
            });
        });
        _that.initDiagram();
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

        async initDiagram () {
            if (this.editedItem && this.editedItem.id) {
                let bpmn = await this.$api.bpmn.processDefinition.fetchXml(this.editedItem.id);
                if (bpmn && bpmn.bpmn20Xml) {
                    this.importXML(bpmn.bpmn20Xml);
                }
            } else {
                this.createDiagram();
            }
        },

        async importXML (xml) {
            // 将字符串转换成图显示出来
            try {
                const result = await this.bpmnModeler.importXML(xml);
                let canvas = this.bpmnModeler.get('canvas');
                canvas.zoom('fit-viewport');
            } catch (err) {
                console.log('error rendering', err);
            }
        },

        async importDefinitions (definitions) {
            try {
                const result = await this.bpmnModeler.importDefinitions(definitions);
                const { warnings } = result;
                console.log(warnings);
            } catch (err) {
                console.log(err.message, err.warnings);
            }
        },

        async createDiagram () {
            try {
                const result = await this.bpmnModeler.createDiagram();
                const { warnings } = result;
                console.log(warnings);
            } catch (err) {
                console.error(err.message, err.warnings);
            }
        },

        async saveSVG () {
            try {
                const result = await this.bpmnModeler.saveSVG({ format: true });
                const { svg } = result;
                return svg;
            } catch (err) {
                console.error('Error happened saving svg: ', err);
            }
        },
        async saveXML () {
            try {
                const result = await this.bpmnModeler.saveXML({ format: true });
                const { xml } = result;
                return xml;
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
        },
        handleUpload () {
            this.overlay = true;
            if (this.diagramXML) {
                let formData = this.createFormData('leave', this.diagramXML);
                this.$api.bpmn.deployment
                    .create(formData)
                    .then((result) => {
                        this.overlay = false;
                        this.$swal.fire({
                            position: "top",
                            title: '模型保存成功！',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false,
                        }).then((result) => {
                            this.$utils.navigation.goBack(this.$route);
                        })
                    }).catch((error) => {
                        this.overlay = false;
                    });
            } else {
                this.$notify.error('无法获取模型数据，请稍后再试！');
            }
        },

        createFormData (name, xml, source = '', fileName = '') {
            let formData = new FormData()
            formData.append('deployment-name', name);
            formData.append('enable-duplicate-filtering', false);
            formData.append('deploy-changed-only', false);
            let deploymentSource = source ? source : 'Middle stage';
            formData.append('deployment-source', deploymentSource);
            let blob = new Blob([xml], { type: 'application/octet-stream' });
            let bpmnFileName = this.checkFileName(fileName, name);
            formData.append('data', blob, bpmnFileName);
            return formData
        },

        checkFileName (fileName, defaultName) {
            let bpmnFileName = fileName ? fileName : defaultName;
            if (bpmnFileName.endWith('.bpmn') || bpmnFileName.endWith('.bpmn20.xml')) {
                return bpmnFileName;
            } else {
                return bpmnFileName + '.bpmn';
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
// @import '~bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
@import '../../../../../static/bpmn/panel.css';

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
