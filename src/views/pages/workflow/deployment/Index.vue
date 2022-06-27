<template>
	<h-bpmn-moddle></h-bpmn-moddle>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HBpmnModdle } from '/@/components';

export default defineComponent({
	name: 'WorkflowDeployment',

	components: {
		HBpmnModdle,
	},
});
</script>
