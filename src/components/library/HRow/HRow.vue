<template>
	<div :class="getClasses()">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';

const constants = {
	base: 'row',
};

export default defineComponent({
	name: 'HRow',

	setup(props) {
		const classes: string[] = reactive([]);

		const appendClass = (value: string): void => {
			if (value) {
				classes.push(value);
			}
		};

		const getClasses = (): string => {
			if (classes.length > 1) {
				return classes.join(' ') as string;
			} else if (classes.length === 1) {
				return classes[0];
			} else {
				return constants.base;
			}
		};

		const initialize = () => {
			appendClass(constants.base);
		};

		onMounted(() => {
			initialize();
		});

		return { getClasses };
	},
});
</script>
