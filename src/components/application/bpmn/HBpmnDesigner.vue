<template>
	<q-card>
		<h-row style="height: 85vh">
			<h-column :cols="9">
				<h-row column> </h-row>
				<div class="bpmn-container full-height">
					<q-toolbar class="bg-white q-px-none">
						<q-btn-group class="q-mx-xs">
							<q-btn color="primary" text-color="white" label="打开文件" icon="mdi-folder-open" />
							<q-separator vertical></q-separator>
							<q-btn-dropdown color="primary" text-color="white" label="下载文件" icon="mdi-download-box">
								<q-list>
									<q-item clickable v-close-popup>
										<q-item-section avatar>
											<q-avatar icon="folder" color="primary" text-color="white" />
										</q-item-section>
										<q-item-section>
											<q-item-label>Photos</q-item-label>
											<q-item-label caption>February 22, 2016</q-item-label>
										</q-item-section>
										<q-item-section side>
											<q-icon name="info" color="amber" />
										</q-item-section>
									</q-item>

									<q-item clickable v-close-popup>
										<q-item-section avatar>
											<q-avatar icon="assignment" color="secondary" text-color="white" />
										</q-item-section>
										<q-item-section>
											<q-item-label>Vacation</q-item-label>
											<q-item-label caption>February 22, 2016</q-item-label>
										</q-item-section>
										<q-item-section side>
											<q-icon name="info" color="amber" />
										</q-item-section>
									</q-item>
								</q-list>
							</q-btn-dropdown>
							<q-separator vertical></q-separator>
							<q-btn color="primary" text-color="white" label="Third" />
						</q-btn-group>
						<q-btn-group class="q-ml-xs">
							<q-btn color="" icon="timeline" />
							<q-btn color="accent" icon="visibility" />
							<q-btn color="accent" icon="update" />
						</q-btn-group>
						<q-btn-group class="q-ml-xs">
							<q-btn color="white" text-color="black" icon="mdi-undo-variant" />
							<q-btn color="white" text-color="black" icon="mdi-redo-variant" />
							<q-btn color="white" text-color="black" icon="mdi-refresh" />
						</q-btn-group>
					</q-toolbar>
					<div id="bpmn-canvas" class="bpmn-canvas"></div>
				</div>
			</h-column>
			<h-column :cols="3">
				<div id="bpmn-properties-panel" class="full-height"></div>
			</h-column>
		</h-row>
	</q-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, computed, onBeforeMount } from 'vue';

import BpmnModeler from 'bpmn-js/lib/Modeler';
import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule } from 'bpmn-js-properties-panel'; // 属性面板
import TokenSimulation from 'bpmn-js-token-simulation';
import CamundaBpmnModdle from 'camunda-bpmn-moddle/resources/camunda.json';
import DefaultDiagram from './data/newDiagram.bpmn?raw';

import { TranslateModule } from './plugins';

import { lodash } from '/@/lib/utils';

import { HColumn, HRow } from '../../library';

/*左边工具栏以及编辑节点的样式*/
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
/*右边工具栏样式*/
import '@bpmn-io/properties-panel/assets/properties-panel.css';

interface BpmnError {
	warnings: string;
	message: string;
}

export default defineComponent({
	name: 'HBpmnDesigner',

	components: {
		HColumn,
		HRow,
	},

	props: {
		diagram: { type: String, default: '' },
		type: { type: String as PropType<'camunda' | 'flowable' | 'activiti'>, default: 'camunda' },
		simulation: { type: Boolean, default: false },
	},

	setup(props) {
		/** ---------- 核心变量定义 ---------- */
		let bpmnModeler = {} as InstanceType<typeof BpmnModeler>;

		/** ---------- 常用方法封装 ---------- */
		const getAction = (action: string) => {
			return bpmnModeler.get(action);
		};

		const getCanvas = () => {
			return getAction('canvas');
		};

		const getEventBus = () => {
			return getAction('eventBus');
		};

		const getToggleMode = () => {
			return getAction('toggleMode');
		};

		const getCommandStack = () => {
			return getAction('commandStack');
		};

		const getAlignElements = () => {
			return getAction('alignElements');
		};

		/** ---------- BPMN 初始设置 ---------- */
		const additionalModules = computed(() => {
			const Modules = [];
			// 翻译模块
			Modules.push(TranslateModule);
			// 模拟流转模块
			if (props.simulation) {
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
			Modules.push(BpmnPropertiesPanelModule);
			// 右边的工具栏
			Modules.push(BpmnPropertiesProviderModule);

			return Modules;
		});

		const moddleExtensions = computed(() => {
			const Extensions = {};

			// 根据需要的 "流程类型" 设置 对应的解析文件
			// if (this.type === 'activiti') {
			//     Extensions['activiti'] = ActivitiModdleDescriptor;
			// }
			// if (this.type === 'flowable') {
			//     Extensions['flowable'] = FlowableModdleDescriptor;
			// }
			if (props.type === 'camunda') {
				Extensions['camunda'] = CamundaBpmnModdle;
			}
			return Extensions;
		});

		const createBpmnModeler = (): InstanceType<typeof BpmnModeler> => {
			return new BpmnModeler({
				container: '#bpmn-canvas',
				// 添加控制板
				propertiesPanel: {
					parent: '#bpmn-properties-panel',
				},
				additionalModules: additionalModules,
				moddleExtensions: moddleExtensions,
			});
		};

		const createNewDiagram = async (diagram: string) => {
			try {
				let result = await bpmnModeler.importXML(diagram);
				const { warnings } = result;

				console.log('[HBM] |- Create New Diagram Success !', warnings);
			} catch (err) {
				const { warnings, message } = err as BpmnError;
				console.error('[HBM] |- Could not create BPMN 2.0 diagram!', warnings, message);
			}
		};

		const init = () => {
			bpmnModeler = createBpmnModeler();
			createNewDiagram(props.diagram ? props.diagram : DefaultDiagram);
		};

		onBeforeMount(() => {
			if (!lodash.isEmpty(bpmnModeler)) {
				bpmnModeler.destroy();
				bpmnModeler = {};
			}
		});

		onMounted(() => {
			init();
		});
	},
});
</script>

<style lang="scss">
.bpmn-container {
	border: 1px solid #dedede;
	background: white;
	background-image: linear-gradient(90deg, rgba(220, 220, 220, 0.5) 6%, transparent 0), linear-gradient(rgba(192, 192, 192, 0.5) 6%, transparent 0);
	background-size: 12px 12px;
}

.bpmn-canvas {
	width: 100%;
	height: 100%;
}

// 去掉bpmn-js图标
.bjs-powered-by {
	display: none;
}

.bio-properties-panel {
	border: 1px solid #dedede;
	background: white;
}
</style>
