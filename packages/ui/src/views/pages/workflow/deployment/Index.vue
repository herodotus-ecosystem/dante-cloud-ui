<template>
	<h-bpmn-designer></h-bpmn-designer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HBpmnDesigner } from '/@/components';

export default defineComponent({
	name: 'WorkflowDeployment',

	components: {
		HBpmnDesigner,
	},

	setup() {},
});
</script>
