<template>
	<q-card>
		<h-row style="height: 85vh">
			<h-column :cols="9">
				<div class="bpmn-container full-height">
					<h-bpmn-designer-toolbar
						v-model:file="opendDiagram"
						@download-xml="onDownloadXml()"
						@download-svg="onDownloadSvg()"
						@download-bpmn="onDownloadBpmn()"
					></h-bpmn-designer-toolbar>
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
import { defineComponent, onMounted, PropType, ref, Ref, watch, onBeforeMount } from 'vue';

import BpmnModeler from 'bpmn-js/lib/Modeler';
import DefaultDiagram from './data/newDiagram.bpmn?raw';

/*左边工具栏以及编辑节点的样式*/
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
/*右边工具栏样式*/
import '@bpmn-io/properties-panel/assets/properties-panel.css';

import { useModelerOperator } from './hooks/';

export default defineComponent({
	name: 'HBpmnDesigner',

	props: {
		diagram: { type: String, default: '' },
		type: { type: String as PropType<'camunda' | 'flowable' | 'activiti'>, default: 'camunda' },
		simulation: { type: Boolean, default: false },
	},

	setup(props) {
		const opendDiagram = ref('');

		const { init, destroy, importDiagram, downloadProcessAsXml, downloadProcessAsBpmn, downloadProcessAsSvg } = useModelerOperator(
			'#bpmn-canvas',
			'#bpmn-properties-panel',
			props.type,
			props.simulation
		);

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

		onBeforeMount(() => {
			destroy();
		});

		onMounted(() => {
			init(DefaultDiagram);
		});

		watch(opendDiagram, (newValue: string) => {
			importDiagram(newValue);
		});

		const onDownloadXml = () => {
			downloadProcessAsXml();
		};

		const onDownloadSvg = () => {
			downloadProcessAsSvg();
		};

		const onDownloadBpmn = () => {
			downloadProcessAsBpmn();
		};

		return {
			opendDiagram,
			onDownloadXml,
			onDownloadSvg,
			onDownloadBpmn,
		};
	},
});
</script>

<style lang="scss">
.bpmn-container {
	border: 1px solid #dedede;
	background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMTBoNDBNMTAgMHY0ME0wIDIwaDQwTTIwIDB2NDBNMCAzMGg0ME0zMCAwdjQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlMGUwZTAiIG9wYWNpdHk9Ii4yIi8+PHBhdGggZD0iTTQwIDBIMHY0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')
		repeat !important;
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
