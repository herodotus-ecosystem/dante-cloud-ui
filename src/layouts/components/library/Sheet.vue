<template>
	<v-sheet class="overflow-hidden" border rounded>
		<slot></slot>
	</v-sheet>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'HAppSheet',
});
</script>
