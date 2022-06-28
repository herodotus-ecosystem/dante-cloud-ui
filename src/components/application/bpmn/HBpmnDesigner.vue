<template>
	<q-card>
		<h-row style="height: 85vh">
			<h-column :cols="9">
			<h-bpmn-designer-toolbar
			v-model:file="opendDiagram"
			:zoom="zoom"
			@download-xml="downloadAsXml()"
			@download-svg="downloadAsSvg()"
			@download-bpmn="downloadAsBpmn()"
			@align-right="alignRight()"
			@align-left="alignLeft()"
			@align-top="alignTop()"
			@align-bottom="alignBottom()"
			@align-horizontal-center="alignHorizontalCenter()"
			@align-vertical-center="alignVerticalCenter()"
			@zoom-plus="zoomPlus()"
			@zoom-minus="zoomMinus()"
			@zoom-reset="zoomReset()"
			@redo="redo()"
			@undo="undo()"
			@refresh="onReset()"
			@simulation="playSimulation()"
		></h-bpmn-designer-toolbar>
				<div class="bpmn-container full-height">
									
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

import DefaultDiagram from './data/newDiagram.bpmn?raw';

import { useModelerOperator } from './hooks/';

export default defineComponent({
	name: 'HBpmnDesigner',

	props: {
		diagram: { type: String, default: '' },
		type: { type: String as PropType<'camunda' | 'flowable' | 'activiti'>, default: 'camunda' },
	},

	setup(props) {
		const opendDiagram = ref('');

		const {
			init,
			destroy,
			importDiagram,
			downloadAsXml,
			downloadAsBpmn,
			downloadAsSvg,
			undo,
			redo,
			zoom,
			zoomPlus,
			zoomMinus,
			zoomReset,
			alignLeft,
			alignRight,
			alignTop,
			alignBottom,
			alignHorizontalCenter,
			alignVerticalCenter,
			playSimulation,
		} = useModelerOperator('#bpmn-canvas', '#bpmn-properties-panel', props.type);

		onBeforeMount(() => {
			destroy();
		});

		onMounted(() => {
			init(DefaultDiagram);
		});

		watch(opendDiagram, (newValue: string) => {
			importDiagram(newValue);
		});

		const onReset = () => {
			importDiagram(DefaultDiagram);
		};

		return {
			opendDiagram,
			onReset,
			importDiagram,
			downloadAsXml,
			downloadAsBpmn,
			downloadAsSvg,
			undo,
			redo,
			zoom,
			zoomPlus,
			zoomMinus,
			zoomReset,
			alignLeft,
			alignRight,
			alignTop,
			alignBottom,
			alignHorizontalCenter,
			alignVerticalCenter,
			playSimulation,
		};
	},
});
</script>
